import Notification from '@/components/notification';
import { createContext, useContext, useState } from 'react';

// Some notification types for styling purposes
type NotificationType = 'success' | 'error' | 'warning' | 'hint';

interface NotificationContextProps {
    showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps>({} as NotificationContextProps);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);

    const showNotification = (message: string, type: NotificationType) => {
        setNotification({ message, type });
        // Display notification for 4 seconds
        setTimeout(() => {
            setNotification(null);
        }, 4000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && <Notification message={notification.message} type={notification.type} />}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        // This just helps debugging in case there's no NotificationProvider wrapping the app components (-> prevent TS errors)
        throw new Error('Context is undefined: useNotification must be used within a NotificationProvider.');
    }
    return context;
};
