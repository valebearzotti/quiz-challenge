import { useWeb3 } from "@/hooks/useWeb3";
import { providers } from "ethers";
import { createContext, useContext } from 'react';

interface Web3ContextProps {
    provider: providers.Web3Provider | null;
    account: string | null;
    signer: providers.JsonRpcSigner | null;
    loading: boolean;
    disconnectWallet: () => void;
    connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextProps>({} as Web3ContextProps);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {

    // Decided to mantain the web3 logic in a custom hook (useWeb3) instead of here for better readability and maybe further reuse
    const { provider, account, signer, loading, disconnectWallet, connectWallet } = useWeb3();

    return (
        <Web3Context.Provider value={{ provider, account, signer, loading, disconnectWallet, connectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3Context = () => {
    const context = useContext(Web3Context);
    if (context === undefined) {
        // This just helps debugging in case there's no Web3Provider wrapping the app components (-> prevent TS errors)
        throw new Error('Context is undefined: useWeb3Context must be used within a Web3Provider.');
    }
    return context;
}