import { Button } from "@/components/button";
import { useWeb3Context } from "@/context/web3Context";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";

const Header = () => {
    const { connectWallet, account, loading } = useWeb3Context();
    const { balance: contractBalance } = useContract();

    const [balance, setBalance] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (account) {
            setIsConnected(true);
            setBalance(contractBalance);
        } else {
            setIsConnected(false);
        }
    }, [account, contractBalance]);

    return (
        <div className="flex flex-row justify-center items-center w-full px-4 py-2">
            <div className="flex flex-row items-center gap-4 justify-between w-full max-w-[1100px]">
                <div className="flex flex-row items-center gap-4">
                    {isConnected && <h4 className="text-white">Balance: {balance ?? 0} $QUIZ</h4>}
                </div>
                <Button onClick={() => { void connectWallet() }} intent="primary" disabled={loading || isConnected}>
                    {loading ? "Connecting..." : isConnected ? "Connected" : "Connect"}
                </Button>
            </div>
        </div>
    )
}

export default Header;