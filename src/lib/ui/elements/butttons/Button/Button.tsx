import Link from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

import { Color } from "@/types/general.types";

import styles from "./Button.module.scss";

export type Variant = "primary" | "secondary" | "tertiary" | "text" | "link";

export type ButtonProps<T extends ElementType> = {
    as?: T
    variant?: Variant
    color?: Color
    icon?: ReactNode
    data?: ReactNode
    dataClass?: string
} & ComponentProps<T>;

const getColorClass = (color: Color) => {
    switch (color) {
        case "blue":
            return styles.blue;
        case "green":
            return styles.green;
        case "orange":
            return styles.orange;
        case "red":
            return styles.red;
        case "yellow":
            return styles.yellow;
        default:
            return "";
    }
};

const getVariantClass = (variant: Variant) => {
    switch (variant) {
        case "primary":
            return styles.primary;
        case "secondary":
            return styles.secondary;
        case "tertiary":
            return styles.tertiary;
        case "text":
        default:
            return styles.text;
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
                {data ? (<span className={`${styles.data} ${dataClass}`}>{data}</span>) : (null)}
                {children}
            </>
        );
    };

    return (
        <Tag
            className={`${styles.btn} ${getVariantClass(variant)} ${className}`}
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
