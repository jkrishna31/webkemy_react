import Link from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

import { TColor } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./Button.module.scss";

export type Variant = "solid" | "outlined" | "muted" | "text";

export type ButtonProps<T extends ElementType> = {
    as?: T;
    variant?: Variant;
    color?: TColor;
    icon?: ReactNode;
    data?: ReactNode;
} & ComponentProps<T>;

export const Button = <T extends ElementType = "button">({
    as = "button", variant = "text", color, icon, data,
    className, children,
    ...props
}: ButtonProps<T>) => {
    const isLink = "href" in props && typeof props.href === "string";
    const Tag = isLink ? Link : as;

    return (
        <Tag
            className={classes(styles.btn, styles[variant], styles[color], className)}
            data-variant={variant}
            data-color={color}
            {...(!isLink ? { type: "button" } : {})}
            {...props}
        >
            {icon}
            {data ? (<span>{data}</span>) : null}
            {children}
        </Tag>
    );
};
