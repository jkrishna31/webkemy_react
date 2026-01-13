import Link, { LinkProps } from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Item.module.scss";

export type TItem<T extends ElementType> = {
  as?: T;
  icon?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  badge?: ReactNode;

  collapsible?: boolean;
  selected?: boolean;
  open?: boolean;
  minimized?: boolean;
  disabled?: boolean;
} & (T extends "a" ? LinkProps : ComponentProps<T>);

export type ItemProps<T extends ElementType> = TItem<T>;

const Item = <T extends ElementType = "div">({
  as = "button",
  icon, primary, secondary, badge,
  collapsible = true, open, minimized, selected,
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
      className={classes(styles.item, className, "menu_item")}
      aria-selected={selected}
      {...restProps}
    >
      {!children ? (
        <>
          {icon}
          <div className={styles.content}>
            <div className={styles.details}>
              <p className={classes(styles.primary, "primary")}>{primary}</p>
              {
                secondary ? (
                  <p className={styles.secondary}>{secondary}</p>
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

export default Item;
