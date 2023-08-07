import { Button } from "@/components/button";
import survey from "@/data/sample.json";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {

	const router = useRouter()

	return (
		<>
			<Head>
				<title>Quiz App</title>
				<meta name="description" content="Tech challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-5xl font-bold text-center">
				Surveys!
			</h1>
			<h3 className="text-center">
				Choose a survey to get started. Answer the questions and earn $QUIZ tokens!
			</h3>
			<div className="flex flex-col gap-4 max-w-[500px] w-full">
				{survey && (
					<div className="flex flex-col rounded-lg border border-neutral-600 border-opacity-50 bg-gradient-to-bl from-black via-neutral-900 to-neutral-900 p-4 gap-6">
						<div className="flex flex-row gap-4">
							<img src={survey.image} className="object-cover rounded-lg w-[100px] h-[100px]" />
							<div className="flex flex-col gap-2">
								<h2 className="text-2xl font-bold">
									{survey.title}
								</h2>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
								</p>
							</div>
						</div>
						<Button
							onClick={() => router.push(`/survey`)}
						>
							Get started
						</Button>
					</div>
				)}
			</div>
		</>
	);
}