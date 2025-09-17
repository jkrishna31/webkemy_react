import { ComponentProps } from "react";

import styles from "./GeneralInput.module.scss";

export interface GeneralInputProps extends ComponentProps<"input"> {

}

const GeneralInput = ({ className, ...props }: GeneralInputProps) => {
    return (
        <input className={`${styles.input} ${className}`}  {...props} />
    );
};

export default GeneralInput;
