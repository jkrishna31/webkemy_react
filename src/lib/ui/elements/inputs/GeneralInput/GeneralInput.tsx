import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./GeneralInput.module.scss";

export interface GeneralInputProps extends ComponentProps<"input"> {

}

const GeneralInput = ({ className, ...props }: GeneralInputProps) => {
    return (
        <input className={classes(styles.input, className)}  {...props} />
    );
};

export default GeneralInput;
