import { useNotification } from '@/context/notificationContext';
import { useWeb3Context } from '@/context/web3Context';
import Abi from "@/sc/abi.json";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

// Declaring the contract interface eliminates unsafe call errors
interface IContract {
    balanceOf(address: string): Promise<ethers.BigNumber>;
    submit(surveyId: number, answerIds: number[]): Promise<ethers.ContractTransaction>;
}

// Define a type for the answerIds array that can contain null values
type answerIds = (number | null)[];

export const useContract = () => {
    const { account, provider, signer, connectWallet } = useWeb3Context();
    const [balance, setBalance] = useState<string | null>(null);

    const { showNotification } = useNotification();

    const address = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'

    const submit = async (surveyId: number, answerIds: answerIds): Promise<void> => {
        if (!account) {
            await connectWallet();
        }
        if (account && provider && signer) {
            const contract = new ethers.Contract(address, Abi, provider) as ethers.Contract & IContract;
            const contractWithSigner = contract.connect(signer);
            const cooldown = await contractWithSigner.cooldownSeconds()
            const lastSubmittalTimestap = await contractWithSigner.lastSubmittal(account);
            // convert timestamp to date
            const date = new Date(lastSubmittalTimestap.toNumber() * 1000);
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            // It can only be submitted once every hour
            if (diff < cooldown.toNumber() * 1000) {
                showNotification('You can only submit your answers once every hour', 'error');
                return;
            }
            try {
                const tx = await contractWithSigner.submit(surveyId, answerIds);
                await tx.wait();
                showNotification('Answers submitted successfuly!', 'success');
                // Update balance
                const balance = await contract.balanceOf(account);
                setBalance(ethers.utils.formatEther(balance));
            } catch (error: any) {
                if (error.code === 4001) {
                    showNotification('Transaction rejected', 'error');
                } else {
                    showNotification('Error submitting answers', 'error');
                }
            }
        }
    }

    useEffect(() => {
        if (account && provider) {
            const contract = new ethers.Contract(address, Abi, provider) as ethers.Contract & IContract;
            contract.balanceOf(account).then((balance) => {
                setBalance(ethers.utils.formatEther(balance));
            }).catch(() => {
                showNotification('Error getting balance', 'error');
            });
        }
    }, [account, provider, showNotification]);

    // Listen to potential balance changes
    useEffect(() => {
        if (account && provider) {
            const contract = new ethers.Contract(address, Abi, provider) as ethers.Contract & IContract;

            // update balance after transfer
            const updateBalanceOnTransfer = async (from: string, to: string, _: any) => {
                if (from === account || to === account) {
                    try {
                        const newBalance = await contract.balanceOf(account);
                        setBalance(ethers.utils.formatEther(newBalance));
                    } catch (error) {
                        console.error("Error updating balance on transfer:", error);
                    }
                }
            };

            contract.on('Transfer', updateBalanceOnTransfer)

            return () => {
                contract.off('Transfer', updateBalanceOnTransfer)
            };
        }
    }, [account, provider]);

    return {
        balance,
        submit
    };
}