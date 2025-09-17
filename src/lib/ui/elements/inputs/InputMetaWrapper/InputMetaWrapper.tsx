import styles from "./InputMetaWrapper.module.scss";

const InputMetaWrapper = ({ children, ...props }: any) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};

export default InputMetaWrapper;
