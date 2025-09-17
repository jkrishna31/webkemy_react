import { ComponentProps } from "react";

import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends ComponentProps<"input"> {

}

const Checkbox = ({ className, type, ...props }: CheckboxProps) => {
    return (
        <input type="checkbox" className={`${styles.input} ${className}`} {...props} />
    );
};

export default Checkbox;
