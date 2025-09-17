"use client";

import { useNotificationActions, useNotifications } from "@/data/stores";

import styles from "./NotificationManager.module.scss";

const NotificationManager = () => {
    const notificActions = useNotificationActions();
    const notifications = useNotifications();

    return (
        null
    );
};

export default NotificationManager;
