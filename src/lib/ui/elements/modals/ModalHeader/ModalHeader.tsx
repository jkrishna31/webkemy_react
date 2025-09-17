import styles from "./ModalHeader.module.scss";

const ModalHeader = ({ titleText, className, children, ...props }: any) => {
    return (
        <div className={`${styles.header} ${className}`} {...props}>
            <h3 className={styles.title}>{titleText}</h3>
            {children}
        </div>
    );
};

export default ModalHeader;
