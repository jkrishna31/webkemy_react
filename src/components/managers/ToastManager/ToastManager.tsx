"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useToastActions, useToasts } from "@/data/stores";
import { useSwipe } from "@/lib/hooks";
import { ToastCard } from "@/lib/ui/elements/toast";

import styles from "./ToastManager.module.scss";

const ToastManager = () => {
    const toasts = useToasts();
    const toastActions = useToastActions();

    const [showAll, setShowAll] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleRemoveToast = useCallback((id: string) => {
        toastActions.removeToast(id);
    }, [toastActions]);

    useEffect(() => {
        if (toasts.length === 0) {
            setShowAll(false);
        }
    }, [toasts.length]);

    useSwipe(ref || null, (a, b, e) => {
        const toastId = (e.target as HTMLElement)?.closest("[data-toast]")?.getAttribute("data-id");
        if (toastId) {
            toastActions.removeToast(toastId);
        }
    }, [60, 0], "HOZ");

    return toasts.length ? (
        <div className={styles.container} ref={ref}>
            {
                toasts.slice(0, showAll ? undefined : 1).map((toast) => {
                    return (
                        <ToastCard
                            key={toast.id}
                            toastId={toast.id}
                            className={styles.toast}
                            message={toast.message}
                            timeout={toast.timeout}
                            onClose={handleRemoveToast}
                            type={toast.type}
                        />
                    );
                })
            }
            {
                (!showAll && toasts.length > 1) ? (
                    <button className={styles.all_btn} onClick={() => setShowAll(true)}>
                        {"+"}{toasts.length - 1}
                    </button>
                ) : null
            }
        </div>
    ) : null;
};

export default ToastManager;
