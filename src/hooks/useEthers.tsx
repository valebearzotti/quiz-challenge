import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskSDK } from '@metamask/sdk';
import { providers } from "ethers";
import { useState } from 'react';

const useWeb3 = async () => {
    const [provider, setProvider] = useState<any>(null);
    const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    // This just solves any kind of error on window.ethereum object declaration on TypeScript and I still get to access all the methods
    const MMSDK = new MetaMaskSDK();
    const ethereum = MMSDK.getProvider();

    const switchNetwork = async (): Promise<void> => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }], // Switch to Goerli's Network
            });
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0x5' }], // Switch to Goerli's Network
                    });
                } catch (addError) {
                    return Promise.reject(addError);
                }
            }
        }
    }

    const connect = async () => {
        try {
            // Request account access
            await ethereum.request({ method: 'eth_requestAccounts' });
            // Set provider
            let provider = detectEthereumProvider();

            // Check if network is Goerli, else trigger switch
            const network = await provider.getNetwork();
            if (network.chainId !== 5) {
                await switchNetwork();
            }
        } catch (error) {
            // User denied account access...
            alert('Please connect to Metamask');
        }
    }
};

return { provider, signer, connect };