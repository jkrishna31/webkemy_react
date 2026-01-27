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
    overlayClass?: string;
}

const Drawer = ({
    open, onClose, hasOverlay = true, unmountOnClose, children, className, overlayClass,
    ...props
}: DrawerProps) => {
    // set aria-hidden and inert to true for .page element
    const ref = useRef<HTMLDivElement>(null);

    const isMounted = useMounted();

    useFocusTrap(ref, open);

    useKey(() => {
        onClose?.();
    }, ["Escape"]);

    if (!open || !isMounted) return null;

    return createPortal((
        <>
            {hasOverlay ? (
                <Overlay open={open} onClick={onClose} className={classes(styles.overlay, overlayClass)} />
            ) : null}
            <div
                ref={ref}
                className={classes(styles.container, open && styles.open, className)}
                role="dialog"
                aria-modal
                {...props}
            >
                {children}
            </div>
        </>
    ), document?.body);
};

export default Drawer;
