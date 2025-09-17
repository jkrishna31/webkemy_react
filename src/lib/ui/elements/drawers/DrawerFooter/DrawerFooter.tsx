import { CrossIcon } from "@/lib/ui/svgs/icons";

import styles from "./DrawerFooter.module.scss";

const DrawerFooter = ({ onClose, ...props }: any) => {
    return (
        <div className={styles.footer} {...props}>
            <button className={styles.close_btn} onClick={onClose}>
                <CrossIcon className={styles.close_icon} />
            </button>
        </div>
    );
};

export default DrawerFooter;
