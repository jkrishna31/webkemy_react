import { ComponentProps } from "react";

import styles from "./InputFieldWrapper.module.scss";

export interface InputFieldWrapperProps extends ComponentProps<"div"> {
    isInvalid?: boolean
}

const InputFieldWrapper = ({ children, className, isInvalid, ...props }: InputFieldWrapperProps) => {
    return (
        <div
            className={`${styles.wrapper} ${className}`}
            data-invalid={isInvalid}
            {...props}
        >
            {children}
        </div>
    );
};

export default InputFieldWrapper;
