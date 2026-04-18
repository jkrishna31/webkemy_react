import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Overlay.module.scss";

export interface OverlayProps extends ComponentProps<"div"> {
    open?: boolean
}

export const Overlay = ({ open, onClick, className, ...props }: OverlayProps) => {
    return (
        <div
            className={classes(styles.overlay, open ? styles.open : "", className)}
            onClick={onClick}
            role="presentation"
            {...props}
        ></div>
    );
};
