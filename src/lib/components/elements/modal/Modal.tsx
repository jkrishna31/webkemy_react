"use client";

import { ComponentProps, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/lib/components/elements/buttton";
import { Overlay } from "@/lib/components/elements/overlay";
import { Positions } from "@/lib/constants/position";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import { classes } from "@/lib/utils/style";

import styles from "./Modal.module.scss";

const getClass = (pos?: (typeof Positions)[keyof typeof Positions]) => {
    switch (pos) {
        case Positions.BOTTOM_CENTER:
            return styles.bc;
        case Positions.TOP_CENTER:
            return styles.tc;
        default:
            return styles.center;
    }
};

export interface ModalProps extends ComponentProps<"div"> {
    pos?: (typeof Positions)[keyof typeof Positions];
    overlay?: boolean;
    onClose?: () => void;
    unmountOnClose?: boolean;
    closeonEsc?: boolean | "capture";
}

export const Modal = ({
    pos, overlay, onClose, unmountOnClose, closeonEsc = "capture",
    children, className,
    ...props
}: ModalProps) => {
    // set aria-hidden and inert to true for .page element
    const ref = useRef<HTMLDivElement>(null);

    const isMounted = useMounted();

    useFocusTrap(ref, true);

    useKey(closeonEsc ? onClose : undefined, ["Escape"], "keydown", { capture: closeonEsc === "capture" });

    if (!isMounted) return;

    return createPortal((
        <>
            {overlay && <Overlay className={styles.overlay} open={true} onClick={onClose} />}
            <div
                className={classes(styles.wrapper, getClass(pos), className, "scroll_thin")}
                role="dialog"
                ref={ref}
                {...props}
            >
                {children}
            </div>
        </>
    ), document.body);
};

const Header = ({
    title, onClose,
    className, children,
    ...restProps
}: {
    title?: ReactNode;
    onClose?: () => void;
} & ComponentProps<"div">) => {
    return (
        <div className={classes(styles.header, className)} {...restProps}>
            {!!title && <h3 className={styles.title}>{title}</h3>}
            {children}
            {!!onClose && (
                <Button variant="muted" className={styles.close_btn} onClick={onClose} title="Close" aria-label="Close">
                    <CrossIcon />
                </Button>
            )}
        </div>
    );
};

const Body = ({ className, children, ...restProps }: ComponentProps<"div">) => {
    return (
        <div className={classes(styles.body, className)} {...restProps}>
            {children}
        </div>
    );
};

const Footer = ({ className, children, ...restProps }: ComponentProps<"div">) => {
    return (
        <div className={classes(styles.footer, className)} {...restProps}>
            {children}
        </div>
    );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
