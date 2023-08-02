import { useNotification } from '@/context/notificationContext';
import { useWeb3 } from '@/hooks/useWeb3';
import Abi from "@/sc/abi.json";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

// Declaring the contract interface eliminates unsafe call errors
interface IContract {
    balanceOf(address: string): Promise<ethers.BigNumber>;
    submit(surveyId: number, answerIds: number[]): Promise<ethers.ContractTransaction>;
}

export const useContract = () => {
    const { account, provider, signer } = useWeb3();
    const [balance, setBalance] = useState<string | null>(null);

    const { showNotification } = useNotification();

    const address = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'

    const submit = async (surveyId: number, answerIds: number[]): Promise<void> => {
        if (account && provider && signer) {
            const contract = new ethers.Contract(address, Abi, provider) as ethers.Contract & IContract;
            const contractWithSigner = contract.connect(signer);
            try {
                const tx = await contractWithSigner.submit(surveyId, answerIds);
                await tx.wait();
                showNotification('Answers submitted successfuly!', 'success');
                // Update balance
                const balance = await contract.balanceOf(account);
                setBalance(ethers.utils.formatEther(balance));
            } catch (error: any) {
                showNotification(error.message, 'error');
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

    return {
        balance,
        submit
    };
}