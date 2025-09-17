import styles from "./DropdownItemBtn.module.scss";

const DropdownItemBtn = ({ text, data, icon, className, children, ...props }: any) => {
    return (
        <button className={`${styles.btn} ${className}`} {...props}>
            {icon}
            <span>{data}</span>
            {data ? <span>{data}</span> : null}
            {children}
        </button>
    );
};

export default DropdownItemBtn;
