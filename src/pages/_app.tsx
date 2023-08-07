import Layout from "@/components/layout";
import { NotificationProvider } from "@/context/notificationContext";
import { SurveyProvider } from "@/context/surveyContex";
import { Web3Provider } from "@/context/web3Context";
import "@/styles/globals.css";
import { type AppType } from "next/dist/shared/lib/utils";

const App: AppType = ({ Component, pageProps }) => {
	return (
		<NotificationProvider>
			<Web3Provider>
				<SurveyProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
					<div className="flex justify-center items-center fixed top-0 left-0 w-full" id="notification-root" />
				</SurveyProvider>
			</Web3Provider>
		</NotificationProvider>
	)
};

export default App