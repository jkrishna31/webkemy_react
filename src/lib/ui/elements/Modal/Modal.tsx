"use client";

import { ComponentProps, useRef } from "react";
import { createPortal } from "react-dom";

import { Overlay } from "@/components/common/containers";
import { positions } from "@/constants/general.const";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Modal.module.scss";

const getClass = (pos?: (typeof positions)[keyof typeof positions]) => {
    switch (pos) {
        case positions.BOTTOM_CENTER:
            return styles.bc;
        case positions.TOP_CENTER:
            return styles.tc;
        default:
            return styles.center;
    }
};

export interface ModalProps extends ComponentProps<"div"> {
    pos?: (typeof positions)[keyof typeof positions];
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
