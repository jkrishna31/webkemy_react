import Link, { LinkProps } from "next/link";
import React, { ComponentProps, ElementType, ReactNode } from "react";

import { Collapsible } from "@/lib/ui/elements/collapsible";

import styles from "./MenuItem.module.scss";

export type MenuItemProps<T extends ElementType> = {
  as?: T
  icon?: ReactNode
  primary?: ReactNode
  secondary?: ReactNode
  badge?: ReactNode
  custom?: boolean
  parent?: boolean
  active?: boolean
  disabled?: boolean
  minimized?: boolean
  // subItems?: Array<MenuItemProps<K>>
} & (T extends "a" ? LinkProps : ComponentProps<T>);

const MenuItem = <T extends ElementType = "button">({
  as = "button",
  icon, primary, secondary, badge, minimized,
  custom, parent, active,
  // subItems,
  className, children, disabled,
  ...props
}: MenuItemProps<T>) => {
  const Element = as === "a" ? Link : as;

  const renderElement = () => {
    return (
      <Element
        className={`${styles.item} ${className}`}
        {...props}
        data-active={active}
        disabled={disabled}
        aria-disabled={disabled}
        data-minimized={minimized}
      >
        {!custom ? (
          <>
            {icon}
            <div className={styles.content}>
              <div className={styles.details}>
                <p className={`${styles.primary} primary`}>{primary}</p>
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

  if (parent) {
    return (
      <Collapsible
        open={false}
        summary={renderElement()}
      >
        {children}
      </Collapsible>
    );
  }

  return (
    renderElement()
  );
};

export default MenuItem;
