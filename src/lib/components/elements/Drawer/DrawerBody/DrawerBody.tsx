import { classes } from "@/lib/utils/style";

import styles from "./DrawerBody.module.scss";

const DrawerBody = ({ children, className, ...props }: any) => {
    return (
        <div className={classes(styles.body, className, "scroll_thin")} {...props}>
            {children}
        </div>
    );
};

export default DrawerBody;
