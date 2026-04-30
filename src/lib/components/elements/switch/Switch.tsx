import { ComponentProps } from "react";

import { InputItem } from "@/lib/components/elements/input-item";
import { classes } from "@/lib/utils/style";

import styles from "./Switch.module.scss";

export interface SwitchProps extends ComponentProps<"input"> {
    switchSize?: "lg" | "sm" | "md"
    color?: "red" | "blue" | "green" | "yellow" | "orange"
}

export const Switch = ({
    className,
    switchSize = "md", color,
    ...props
}: SwitchProps) => {
    return (
        <InputItem.FieldWrapper
            className={classes(styles.wrapper, className)}
            data-size={switchSize}
        >
            <input type="checkbox" className={styles.input} {...props} />
            <div className={styles.switch}></div>
        </InputItem.FieldWrapper>
    );
};
