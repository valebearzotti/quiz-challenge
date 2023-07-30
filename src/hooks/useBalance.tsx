import { useNotification } from '@/context/notificationContext';
import { useWeb3 } from '@/hooks/useWeb3';
import Abi from "@/sc/abi.json";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

// Declaring the contract interface eliminates unsafe call errors
interface IContract {
    balanceOf(address: string): Promise<ethers.BigNumber>;
}

export const useBalance = () => {
    const { account, provider } = useWeb3();
    const [balance, setBalance] = useState<string | null>(null);

    const { showNotification } = useNotification();

    const address = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'

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

    return { balance };
}