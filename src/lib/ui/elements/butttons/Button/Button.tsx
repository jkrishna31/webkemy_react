import Link from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

import { Color } from "@/lib/types/general.types";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Button.module.scss";

export type Variant = "primary" | "secondary" | "tertiary" | "quaternary" | "text" | "link";

export type ButtonProps<T extends ElementType> = {
    as?: T
    variant?: Variant
    color?: Color
    icon?: ReactNode
    data?: ReactNode
    dataClass?: string
} & ComponentProps<T>;

const getVariantClass = (variant: Variant) => {
    switch (variant) {
        case "primary":
            return styles.btn_primary;
        case "secondary":
            return styles.btn_secondary;
        case "tertiary":
            return styles.btn_tertiary;
        case "quaternary":
            return styles.btn_quaternary;
        case "text":
        default:
            return styles.btn_text;
    }
};

const Button = <T extends ElementType = "button">({
    as = "button", variant = "text", color, icon, data, dataClass,
    className, children,
    ...props
}: ButtonProps<T>) => {
    const isLink = "href" in props && typeof props.href === "string";
    const Tag = isLink ? Link : as;

    const renderChildren = () => {
        return (
            <>
                {icon}
                {data ? (<span className={classes(styles.btn_data, dataClass)}>{data}</span>) : (null)}
                {children}
            </>
        );
    };

    return (
        <Tag
            className={classes(styles.btn, getVariantClass(variant), className)}
            // data-variant={variant}
            data-color={color}
            {...(!isLink ? { type: "button" } : {})}
            {...props}
        >
            {renderChildren()}
        </Tag>
    );
};

export default Button;
