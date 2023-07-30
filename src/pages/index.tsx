import { useBalance } from "@/hooks/useBalance";
import { useWeb3 } from "@/hooks/useWeb3";
import Head from "next/head";

export default function Home() {

	const { connectWallet, account, loading } = useWeb3();
	const { balance } = useBalance()

	return (
		<>
			<Head>
				<title>Quiz App</title>
				<meta name="description" content="Tech challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-black">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<button
						className="bg-white text-black px-4 py-2 rounded-md"
						onClick={() => { void connectWallet() }}
					>
						{loading ? "Establishing connection..." : account ? "Connected" : "Connect to Metamask"}
					</button>
					{account && <p className="text-white">Your balance is: {balance}</p>}
				</div>
			</main>
		</>
	);
}
