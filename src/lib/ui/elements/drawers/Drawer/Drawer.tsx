"use client";

import { ComponentProps, useRef } from "react";
import { createPortal } from "react-dom";

import { Overlay } from "@/components/common/containers";
import { useFocusTrap, useKey } from "@/lib/hooks";

import styles from "./Drawer.module.scss";

export interface DrawerProps extends ComponentProps<"div"> {
    open: boolean
    onClose?: () => void
    hasOverlay?: boolean
}

const Drawer = ({
    open, onClose, hasOverlay = true, children, className,
    ...props
}: DrawerProps) => {
    // set aria-hidden and inert to true for .page element
    const ref = useRef<HTMLDivElement>(null);

    useFocusTrap(ref, open);

    useKey(() => {
        onClose?.();
    }, ["Escape"]);

    if (!open) return null;

    return createPortal((
        <>
            {hasOverlay ? (
                <Overlay open={open} onClick={onClose} className={styles.overlay} />
            ) : null}
            <div
                ref={ref}
                className={`${styles.container} ${className} ${open ? styles.open : null}`}
                role="dialog"
                aria-modal
                {...props}
            >
                {children}
            </div>
        </>
    ), document.body);
};

export default Drawer;
