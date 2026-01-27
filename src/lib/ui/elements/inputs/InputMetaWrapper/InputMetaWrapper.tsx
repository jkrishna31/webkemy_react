import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./InputMetaWrapper.module.scss";

export interface InputMetaWrapperProps extends ComponentProps<"div"> {

}

const InputMetaWrapper = ({ children, className, ...restProps }: InputMetaWrapperProps) => {
    return (
        <div className={classes(styles.wrapper, className)} {...restProps}>
            {children}
        </div>
    );
};

export default InputMetaWrapper;
