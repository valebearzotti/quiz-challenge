import { Button } from "@/components/button";
import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";

const Header = () => {

    const { connectWallet, account, loading } = useWeb3();
    const { balance } = useContract();

    return (
        <div className="flex flex-row justify-between items-center w-full px-4 py-2">
            <div className="flex flex-row items-center gap-4">
                {account && <h4 className="text-white">Balance: {balance || 0} $QUIZ</h4>}
            </div>
            <Button
                onClick={() => { void connectWallet() }}
            >
                {loading ? "Connecting..." : account ? "Connected" : "Connect"}
            </Button>
        </div>
    )
}

export default Header;