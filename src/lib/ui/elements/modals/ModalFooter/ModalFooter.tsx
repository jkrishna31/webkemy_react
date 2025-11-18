import { classes } from "@/lib/utils/style.utils";

import styles from "./ModalFooter.module.scss";

const ModalFooter = ({ children, className, ...props }: any) => {
    return (
        <div className={classes(styles.footer, className)}>
            {children}
        </div>
    );
};

export default ModalFooter;
