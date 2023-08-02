import Layout from "@/components/layout";
import { useContract } from "@/hooks/useContract";
import Head from "next/head";

export default function Home() {

	const { balance, submit } = useContract();

	return (
		<>
			<Head>
				<title>Quiz App</title>
				<meta name="description" content="Tech challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>

			</Layout>
		</>
	);
}
