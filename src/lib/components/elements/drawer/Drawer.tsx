"use client";

import { ComponentProps, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/lib/components/elements/buttton";
import { Overlay } from "@/lib/components/elements/overlay";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import { classes } from "@/lib/utils/style";

import styles from "./Drawer.module.scss";

export interface DrawerProps extends ComponentProps<"div"> {
    open: boolean;
    onClose?: () => void;
    overlay?: boolean;
    unmountOnClose?: boolean;
    overlayClass?: string;
    closeonEsc?: boolean | "capture";
}

export const Drawer = ({
    open, onClose, overlay = true, unmountOnClose, overlayClass, closeonEsc = "capture",
    className, children,
    ...props
}: DrawerProps) => {
    // set aria-hidden and inert to true for .page element
    const ref = useRef<HTMLDivElement>(null);

    const isMounted = useMounted();

    useFocusTrap(ref, open);

    useKey(onClose, ["Escape"]);

    if (!open || !isMounted) return null;

    return createPortal((
        <>
            {!!overlay && <Overlay open={open} onClick={onClose} className={classes(styles.overlay, overlayClass)} />}
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

const Header = ({
    icon,
    title,
    onClose,
    className, children,
    ...restProps
}: {
    title?: string;
    onClose?: any;
    icon?: ReactNode;
} & ComponentProps<"div">) => {
    return (
        <div className={classes(styles.header, className)} {...restProps}>
            <div className={styles.header_left}>
                {icon}
                <h3 className={styles.title}>{title}</h3>
            </div>
            {children}
            <div className={styles.header_right}>
                <Button
                    variant="muted"
                    className={styles.close_btn}
                    onClick={onClose}
                    title="Close"
                    aria-label="Close"
                >
                    <CrossIcon className={styles.close_icon} />
                </Button>
            </div>
        </div>
    );
};

const Body = ({ children, className, ...restProps }: ComponentProps<"div">) => {
    return (
        <div className={classes(styles.body, className, "scroll_thin")} {...restProps}>
            {children}
        </div>
    );
};

const Footer = ({
    className, children,
    ...restProps
}: {
} & ComponentProps<"div">) => {
    return (
        <div className={classes(styles.footer, className)} {...restProps}>
            {children}
        </div>
    );
};

Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;
