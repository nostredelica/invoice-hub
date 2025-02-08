export type NotificationType = {
  message: string;
  timestamp: string;
};

const NOTIFICATION_KEY = "notifications";
const NOTIFICATION_READ_KEY = "notifications_read";

export const addNotification = (message: string) => {
  const storedData: NotificationType[] = JSON.parse(
    localStorage.getItem(NOTIFICATION_KEY) || "[]"
  );

  const newNotification: NotificationType = {
    message,
    timestamp: new Date().toISOString(),
  };

  const updatedData = [newNotification, ...storedData];

  localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updatedData));

  localStorage.setItem(NOTIFICATION_READ_KEY, "false");

  window.dispatchEvent(new Event("storage"));
};

export const getNotifications = (): NotificationType[] => {
  return JSON.parse(localStorage.getItem(NOTIFICATION_KEY) || "[]");
};

export const hasUnreadNotifications = (): boolean => {
  return localStorage.getItem(NOTIFICATION_READ_KEY) !== "true";
};

export const markNotificationsAsRead = () => {
  localStorage.setItem(NOTIFICATION_READ_KEY, "true");

  window.dispatchEvent(new Event("storage"));
};
