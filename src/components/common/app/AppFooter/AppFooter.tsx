import { ComponentProps } from "react";

import styles from "./AppFooter.module.scss";

export interface AppFooterProps extends ComponentProps<"div"> {

}

const AppFooter = ({
    ...props
}: AppFooterProps) => {
    return (
        <footer className={styles.footer}>

        </footer>
    );
};

export default AppFooter;
