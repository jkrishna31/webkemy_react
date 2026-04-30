import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Input.module.scss";

export interface InputProps extends ComponentProps<"input"> {
}

export const Input = ({ className, ...props }: InputProps) => {
    return (
        <input
            className={classes(styles.input, className)}
            {...props}
        />
    );
};
