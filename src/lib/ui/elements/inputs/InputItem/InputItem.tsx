import { ComponentProps, ElementType } from "react";

import styles from "./InputItem.module.scss";

export type InputItemProps<T extends ElementType> = {
    inline?: boolean
    as?: T
} & ComponentProps<T>;

const InputItem = <T extends ElementType>({
    inline = false, as = "div",
    children, className,
    ...props
}: InputItemProps<T>) => {
    const Tag = as;

    return (
        <Tag
            className={`${styles.wrapper} ${inline ? styles.inline : null} ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default InputItem;
