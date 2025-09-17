import styles from "./BarsLoader.module.scss";

const BarsLoader = ({ active = true, className, ...props }: any) => {
    return (
        <div className={`${styles.loader} ${className} ${active ? styles.active : ""}`} {...props}>
            <div className={styles.bars_wrapper}>
                <div className={`${styles.bar} ${styles.corner}`}></div>
                <div className={`${styles.bar} ${styles.center}`}></div>
                <div className={`${styles.bar} ${styles.corner}`}></div>
            </div>
        </div>
    );
};

export default BarsLoader;
