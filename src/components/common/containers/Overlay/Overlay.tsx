import { ComponentProps } from "react";

import styles from "./Overlay.module.scss";

export interface OverlayProps extends ComponentProps<"div"> {
    open?: boolean
}

const Overlay = ({ open, onClick, className, ...props }: OverlayProps) => {
    return (
        <div className={`${styles.overlay} ${open ? styles.open : ""} ${className}`} onClick={onClick} {...props} role="presentation"></div>
    );
};

export default Overlay;
