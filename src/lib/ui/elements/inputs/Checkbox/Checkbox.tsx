import { ComponentProps } from "react";

import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends ComponentProps<"input"> {
    invisible?: boolean;
}

const Checkbox = ({
    invisible, className, type,
    ...props
}: CheckboxProps) => {
    return (
        <input
            type="checkbox" className={`${styles.input} ${className}`} data-invisible={invisible}
            {...props}
        />
    );
};

export default Checkbox;
