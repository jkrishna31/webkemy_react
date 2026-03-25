import styles from "./Radio.module.scss";

const Radio = ({ id, textLabel, ...props }: any) => {
    return (
        <input type="radio" id={id} className={styles.input} {...props} />
    );
};

export default Radio;
