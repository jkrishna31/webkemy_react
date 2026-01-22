"use client";

import { ComponentProps, useRef } from "react";
import { createPortal } from "react-dom";

import { Overlay } from "@/components/common/containers";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Drawer.module.scss";

export interface DrawerProps extends ComponentProps<"div"> {
    open: boolean;
    onClose?: () => void;
    hasOverlay?: boolean;
    unmountOnClose?: boolean;
}

const Drawer = ({
    open, onClose, hasOverlay = true, unmountOnClose, children, className,
    ...props
}: DrawerProps) => {
    // set aria-hidden and inert to true for .page element
    const ref = useRef<HTMLDivElement>(null);

    const isMounted = useMounted();

    useFocusTrap(ref, open);

    useKey(() => {
        onClose?.();
    }, ["Escape"]);

    if (!open) return null;

    return isMounted ? createPortal((
        <>
            {hasOverlay ? (
                <Overlay open={open} onClick={onClose} className={styles.overlay} />
            ) : null}
            <div
                ref={ref}
                className={classes(styles.container, className, open && styles.open)}
                role="dialog"
                aria-modal
                {...props}
            >
                {children}
            </div>
        </>
    ), document?.body) : null;
};

export default Drawer;
