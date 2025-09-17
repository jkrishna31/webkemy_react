import { ComponentProps } from "react";

import { InputFieldWrapper } from "..";
import styles from "./Switch.module.scss";

export interface SwitchProps extends ComponentProps<"input"> {
    switchSize?: "lg" | "sm" | "md"
    color?: "red" | "blue" | "green" | "yellow" | "orange"
}

const Switch = ({
    className,
    switchSize = "md", color,
    ...props
}: SwitchProps) => {
    return (
        <InputFieldWrapper
            className={`${styles.wrapper} ${className}`}
            data-size={switchSize}
        >
            <input type="checkbox" className={styles.input} {...props} />
            <div className={styles.switch}></div>
        </InputFieldWrapper>
    );
};

export default Switch;
