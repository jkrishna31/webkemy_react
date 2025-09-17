import styles from "./ModalFooter.module.scss";

const ModalFooter = ({ children, className, ...props }: any) => {
    return (
        <div className={`${styles.footer} ${className}`}>
            {children}
        </div>
    );
};

export default ModalFooter;
