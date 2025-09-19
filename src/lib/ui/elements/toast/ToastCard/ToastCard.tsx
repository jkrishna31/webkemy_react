"use client";

import { ComponentProps, memo, useCallback, useEffect, useRef } from "react";

import { ToastType } from "@/data/stores";
import { CircleCheckIcon, CircleCrossIcon, CircleInfoIcon, CrossIcon, TriangleWarningIcon } from "@/lib/ui/svgs/icons";

import styles from "./ToastCard.module.scss";

export interface ToastCardProps extends ComponentProps<"div"> {
    message: string
    toastId: string
    type?: ToastType
    timeout?: number
    onClose?: any
}

const ToastCard = ({
    message, toastId, type, className, timeout, onClose,
}: ToastCardProps) => {
    // verify --> timer does not reset on rerender; if manually closed then clear timeout as well
    const timeoutId = useRef<NodeJS.Timeout>(undefined);

    const handleClose = useCallback(() => {
        if (timeout && timeoutId.current !== undefined) {
            clearTimeout(timeoutId.current);
        }
        onClose(toastId);
    }, [onClose, timeout, toastId]);

    const getToastColorClass = () => {
        switch (type) {
            case "info":
                return styles.blue_bg;
            case "success":
                return styles.green_bg;
            case "warn":
                return styles.yellow_bg;
            case "error":
                return styles.red_bg;
            case "critical":
                return styles.orange_bg;
            default:
                return "";
        }
    };

    useEffect(() => {
        if (timeout && timeoutId.current === undefined) {
            timeoutId.current = setTimeout(() => {
                onClose(toastId);
            }, timeout);
        }
    }, [onClose, timeout, toastId]);

    return (
        <div
            className={`${styles.card_wrapper} ${getToastColorClass()} ${className}`}
            data-toast
            data-id={toastId}
            role="alert"
        >
            <div className={styles.content_wrapper}>
                {/* {renderIcon(type)} */}
                <p className={styles.res_message_wrapper}>{message}</p>
            </div>
            <div className={styles.controls_wrapper}>
                <button
                    className={`${styles.close_btn} ${styles.icon_wrapper}`}
                    onClick={handleClose}
                    aria-label="Close"
                >
                    <CrossIcon className={styles.close_icon} />
                </button>
            </div>
        </div>
    );
};

const renderIcon = (type?: ToastType) => {
    switch (type) {
        case "success":
            return (
                <CircleCheckIcon className={`${styles.icon} ${styles.green}`} />
            );
        case "error":
            return (
                <CircleCrossIcon className={`${styles.icon} ${styles.red}`} />
            );
        case "warn":
            return (
                <TriangleWarningIcon className={`${styles.icon} ${styles.yellow}`} />
            );
        case "info":
            return (
                <CircleInfoIcon className={`${styles.icon} ${styles.blue}`} />
            );
        default:
            return null;
    }
};

export default memo(ToastCard);
