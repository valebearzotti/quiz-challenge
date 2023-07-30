import { createPortal } from 'react-dom';

const NotificationPortal = ({ children }: { children: React.ReactNode }) => {
    // Type of notificationRoot is inferred here
    const notificationRoot = document.getElementById('notification-root');

    // Make sure notificationRoot is not null before using the portal (-> prevent TS errors)
    if (notificationRoot === null) {
        console.error('Notification root was not found and therefore the portal could not be rendered.');
        return null;
    }

    return createPortal(children, notificationRoot);
}

export default NotificationPortal;