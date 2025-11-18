import { classes } from "@/lib/utils/style.utils";

import styles from "./BarsLoader.module.scss";

const BarsLoader = ({ active = true, className, ...props }: any) => {
    return (
        <div className={classes(styles.loader, className, active && styles.active)} {...props}>
            <div className={styles.bars_wrapper}>
                <div className={classes(styles.bar, styles.corner)}></div>
                <div className={classes(styles.bar, styles.center)}></div>
                <div className={classes(styles.bar, styles.corner)}></div>
            </div>
        </div>
    );
};

export default BarsLoader;
