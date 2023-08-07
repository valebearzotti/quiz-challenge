import { useNotification } from '@/context/notificationContext';
import { providers } from 'ethers';
import { useEffect, useState } from 'react';

import type { MetaMaskInpageProvider } from '@metamask/providers';

interface EthereumWindow extends Window {
    ethereum: MetaMaskInpageProvider & {
        request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
        on: (event: string, callback: (accounts: string[]) => void) => void;
        removeAllListeners: (event: string) => void;
    };
}

declare let window: EthereumWindow;

export const useWeb3 = () => {
    const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const { showNotification } = useNotification();

    const disconnectWallet = () => {
        setProvider(null);
        setAccount(null);
    }

    const switchNetwork = async (): Promise<void> => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }], // Switch to Goerli's Network
            });
        } catch (error: any) {
            // There was an error switching network
            // Handle "4001" error (userRejectedRequest error)
            if (error.code === 4001) {
                showNotification('Please allow Metamask to switch networks', 'error');
                return Promise.reject(error);
            }
            // Maybe the user doesn't have the network added to Metamask
            if (error.code === 4902 || error.code === -32603) {
                try {
                    // Add Goerli's Network
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x5',
                                chainName: 'Goerli Test Network',
                                nativeCurrency: {
                                    name: 'Goerli Ether',
                                    symbol: 'GoerliETH',
                                    decimals: 18
                                },
                                rpcUrls: ['https://goerli.infura.io/v3/'],
                                blockExplorerUrls: ['https://goerli.etherscan.io/']
                            }
                        ],
                    });
                } catch (addError) {
                    // Error adding network
                    showNotification('Error adding Goerli network to Metamask', 'error');
                    return Promise.reject(addError);
                }
            }

            // Other error
            showNotification('Error switching network', 'error');
            return Promise.reject(error);

        }
    }

    const addToken = async (): Promise<void> => {
        try {
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: '0x437eF217203452317C3C955Cf282b1eE5F6aaF72',
                        symbol: 'QUIZ',
                        decimals: 18,
                    },
                },
            });

            showNotification('Token added to Metamask', 'success');
        } catch (error: any) {
            if (error.code === 4001) {
                // User rejected the request
                showNotification('User rejected adding token', 'warning');
                return Promise.reject(error);
            } else {
                // Other error
                showNotification('Error adding token', 'error');
                return Promise.reject(error);
            }
        }
    }

    async function connectWallet(): Promise<void> {
        setLoading(true);

        if (window.ethereum) {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Set provider
                const provider = new providers.Web3Provider(window.ethereum as unknown as providers.ExternalProvider);
                setProvider(provider);
                // Set signer
                const signer = provider.getSigner();
                setSigner(signer);
                // Set account
                const account = await signer.getAddress();
                setAccount(account);
                // Check if network is Goerli, else trigger switch
                const network = await provider.getNetwork();
                if (network.chainId !== 5) {
                    switchNetwork()
                        .catch(() => {
                            disconnectWallet();
                        });
                }

                // Add token to Metamask. I implemented it first but then I decided to remove it since the UX is not great, and cannot check if the token is already added.
                //await addToken()
                // I'm not catching any errors here intentionally, as I want the user to be able to use the app even if they don't add the token. Maybe they already added it before.

                showNotification('Wallet connection successful!', 'success');
            } catch (error: any) {
                if (error.code === 4001) {
                    // User rejected the request.
                    showNotification('User rejected connection', 'error');
                } else {
                    // Other error
                    showNotification('Error connecting wallet', 'error');
                }
            }
        } else {
            // Warn user if no wallet is detected
            showNotification('Metamask is not installed', 'warning');
        }
        setLoading(false);
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                    showNotification('Your wallet has been disconnected', 'warning');
                }
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        }
    }, [showNotification]);

    return {
        connectWallet,
        disconnectWallet,
        account,
        provider,
        signer,
        loading,
    };
};
