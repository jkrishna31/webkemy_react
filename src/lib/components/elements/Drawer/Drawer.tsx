"use client";

import { ComponentProps, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import { Overlay } from "@/lib/components/elements/Overlay";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import { classes } from "@/lib/utils/style";

import styles from "./Drawer.module.scss";

export interface DrawerProps extends ComponentProps<"div"> {
    open: boolean;
    onClose?: () => void;
    hasOverlay?: boolean;
    unmountOnClose?: boolean;
    overlayClass?: string;
    closeonEsc?: boolean | "capture";
}

const Drawer = ({
    open, onClose, hasOverlay = true, unmountOnClose, overlayClass, closeonEsc = "capture",
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

const Header = ({
    icon, titleText, onClose,
    className, children,
    ...restProps
}: {
    titleText?: string;
    onClose?: any;
    icon?: ReactNode;
} & ComponentProps<"div">) => {
    return (
        <div className={classes(styles.header, className)} {...restProps}>
            <div className={styles.header_left}>
                {icon}
                <b className={styles.title_text}>
                    {titleText}
                </b>
            </div>
            {children}
            <div className={styles.header_right}>
                <button
                    className={styles.close_btn} onClick={onClose} title="Close"
                    data-autofocus={true}
                    autoFocus
                >
                    <CrossIcon className={styles.close_icon} />
                </button>
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
    onClose,
    className,
    ...restProps
}: {
    onClose?: () => void;
} & ComponentProps<"div">) => {
    return (
        <div className={classes(styles.footer, className)} {...restProps}>
            <button className={styles.close_btn} onClick={onClose}>
                <CrossIcon className={styles.close_icon} />
            </button>
        </div>
    );
};

Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;

export default Drawer;
