export const filterTypeSelected = state => state.filterType;

export const getNotifications = state => state.notifications;

export const getUnreadNotifications = state => {
    const notifications = state.notifications;
    const unreadNotifications = new Map();

    notifications.forEach(notification => {
        if (!notification.isRead) {
            unreadNotifications.set(notification.id, notification);
        }
    });

    return unreadNotifications;
};
