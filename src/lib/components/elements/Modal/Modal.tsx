"use client";

import { ComponentProps, useRef } from "react";
import { createPortal } from "react-dom";

import { Overlay } from "@/components/common/containers";
import { Positions } from "@/lib/constants/position";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
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
}

const Modal = ({
    pos, overlay, onClose, unmountOnClose, children, className,
    ...props
}: ModalProps) => {
    // set aria-hidden and inert to true for .page element
    const ref = useRef<HTMLDivElement>(null);

    const isMounted = useMounted();

    useFocusTrap(ref, true);

    useKey(onClose as any, ["Escape"], "keydown", { capture: true });

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

export default Modal;
