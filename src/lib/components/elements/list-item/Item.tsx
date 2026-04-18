import Link, { LinkProps } from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

import { TColor } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./Item.module.scss";

export type TItem<T extends ElementType> = {
  as?: T;
  icon?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  collapsible?: boolean;
  selected?: boolean;
  open?: boolean;
  minimized?: boolean;
  disabled?: boolean;
  color?: TColor;
} & (T extends "a" ? LinkProps : {}) & ComponentProps<T>;

export type ItemProps<T extends ElementType> = TItem<T>;

export const Item = <T extends ElementType = "button">({
  as = "button",
  icon, label, description, badge,
  collapsible = true, open, minimized, selected, color,
  className, children, disabled,
  ...restProps
}: TItem<T>) => {
  const Element = (as === "a" || restProps.href) ? Link : as;

  return (
    <Element
      disabled={disabled}
      aria-disabled={disabled}
      data-minimized={minimized}
      {...(disabled ? { tabIndex: -1 } : {})}
      className={classes(styles.item, className, styles[color], "menu_item")}
      aria-selected={selected}
      {...restProps}
    >
      {!children ? (
        <>
          {icon}
          <div className={styles.content}>
            <div className={styles.details}>
              <p className={classes(styles.label, "primary")}>{label}</p>
              {
                description ? (
                  <p className={styles.description}>{description}</p>
                ) : null
              }
            </div>
            {typeof badge === "function" ? badge?.() : badge}
          </div>
          {
            minimized
              ? typeof badge === "function"
                ? badge(minimized)
                : badge
              : null
          }
        </>
      ) : null}
      {children}
    </Element>
  );
};
