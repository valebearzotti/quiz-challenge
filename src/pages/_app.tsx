import { NotificationProvider } from "@/context/notificationContext";
import "@/styles/globals.css";
import { type AppType } from "next/dist/shared/lib/utils";

const App: AppType = ({ Component, pageProps }) => {
	return (
		<NotificationProvider>
			<Component {...pageProps} />
			<div id="notification-root"></div>
		</NotificationProvider>
	)
};

export default App