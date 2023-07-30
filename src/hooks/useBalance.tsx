import { useWeb3 } from '@/hooks/useWeb3';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import Abi from "@/sc/abi.json";

export const useBalance = () => {
    const { account, provider } = useWeb3();
    const [balance, setBalance] = useState<string | null>(null);

    let address = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'

    useEffect(() => {
        if (account && provider) {
            const contract = new ethers.Contract(address, Abi, provider);
            contract.balanceOf(account).then((balance: ethers.BigNumber) => {
                setBalance(balance.toString());
            });
        }
    }, [account, provider]);

    return { balance };
}