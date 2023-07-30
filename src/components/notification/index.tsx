// Using index to avoid duplicate names on import

import NotificationPortal from "@/components/notification/portal";

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'hint';
}

const Notification = ({ message, type }: NotificationProps) => {
    let style
    switch (type) {
        case 'success':
            style = 'bg-[#11A33A]';
            break;
        case 'error':
            style = 'bg-[#CD2929]';
            break;
        case 'warning':
            style = 'bg-[#F2994A]';
            break;
        case 'hint':
            style = 'bg-[#6E6FFA]';
            break;
    }

    return (
        <NotificationPortal>
            <div className={`fixed top-0 right-0 m-6 p-4 ${style} text-white font-normal rounded-md slide-down`}>
                {/* To do: Add a custom icon */}
                {message}
            </div>
        </NotificationPortal>
    );
};

export default Notification;