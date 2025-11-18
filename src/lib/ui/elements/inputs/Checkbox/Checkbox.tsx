import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

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
            type="checkbox" className={classes(styles.input, className)} data-invisible={invisible}
            {...props}
        />
    );
};

export default Checkbox;
