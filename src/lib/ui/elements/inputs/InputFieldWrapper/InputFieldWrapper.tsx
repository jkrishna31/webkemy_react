import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./InputFieldWrapper.module.scss";

export interface InputFieldWrapperProps extends ComponentProps<"div"> {
    isInvalid?: boolean
}

const InputFieldWrapper = ({ children, className, isInvalid, ...props }: InputFieldWrapperProps) => {
    return (
        <div
            className={classes(styles.wrapper, className)}
            data-invalid={isInvalid}
            {...props}
        >
            {children}
        </div>
    );
};

export default InputFieldWrapper;
