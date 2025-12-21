import { ComponentProps, ReactNode } from "react";

import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";

import styles from "./DrawerHeader.module.scss";

export interface DrawerHeaderProps extends ComponentProps<"div"> {
    titleText?: string
    onClose?: any
    icon?: ReactNode
}

const DrawerHeader = ({
    icon, titleText, onClose, children, ...props
}: DrawerHeaderProps) => {
    return (
        <div className={styles.header} {...props}>
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

export default DrawerHeader;
