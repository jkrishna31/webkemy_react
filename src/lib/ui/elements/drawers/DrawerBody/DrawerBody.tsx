import styles from "./DrawerBody.module.scss";

const DrawerBody = ({ children, className, ...props }: any) => {
    return (
        <div className={`${styles.body} ${className} scroll_thin`} {...props}>
            {children}
        </div>
    );
};

export default DrawerBody;
