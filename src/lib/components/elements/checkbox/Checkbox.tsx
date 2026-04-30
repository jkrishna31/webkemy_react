import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends ComponentProps<"input"> {
    invisible?: boolean;
}

export const Checkbox = ({
    invisible, className, type,
    ...props
}: CheckboxProps) => {
    return (
        <input
            type="checkbox" className={classes(styles.input, className)} data-invisible={invisible}
            {...props}
        />
    );
};
