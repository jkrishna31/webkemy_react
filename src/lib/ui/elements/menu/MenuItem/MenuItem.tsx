import Link, { LinkProps } from "next/link";
import React, { ComponentProps, ElementType, ReactNode } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Collapsible } from "@/lib/ui/elements/collapsible";
import { ChevronRightIcon } from "@/lib/ui/svgs/icons";

import styles from "./MenuItem.module.scss";

export type MenuItemProps<T extends ElementType> = {
  id: string
  as?: T
  icon?: ReactNode
  primary?: ReactNode
  secondary?: ReactNode
  badge?: ReactNode
  custom?: boolean
  activeItem?: string | number
  disabled?: boolean
  minimized?: boolean
  open?: boolean
  menu?: Array<MenuItemProps<T>>
  onMenuToggle?: (id: string) => void;
} & (T extends "a" ? LinkProps : ComponentProps<T>);

const MenuItem = <T extends ElementType = "button">({
  as = "button", id,
  icon, primary, secondary, badge,
  minimized, custom, activeItem, disabled,
  menu, onMenuToggle, open,
  className, children, onClick,
  ...props
}: MenuItemProps<T>) => {
  const Element = as === "a" ? Link : as;

  const renderElement = () => {
    return (
      <Element
        className={`${styles.item} ${className}`}
        {...props}
        onClick={onClick ? () => onClick(id) : undefined}
        data-active={activeItem === id}
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

  if (menu?.length) {
    return (
      <Collapsible
        open={open}
        summary={
          <div className={styles.root_item}>
            {renderElement()}
            <Button variant="tertiary" className={styles.toggle_btn} onClick={() => onMenuToggle(id)}>
              <ChevronRightIcon />
            </Button>
          </div>
        }
        className={styles.collapsible}
        data-minimized={minimized}
      >
        <div className={styles.sub_menu_wrapper}>
          <div>
            {
              menu.map((item: MenuItemProps<T>) => {
                return (
                  <MenuItem<T>
                    {...item}
                    {...props}
                    key={item.key}
                    id={item.key}
                    minimized={minimized}
                    activeItem={activeItem}
                    open={open}
                    onMenuToggle={onMenuToggle}
                    onClick={onClick}
                  />
                );
              })
            }
          </div>
        </div>
      </Collapsible>
    );
  }

  return (
    renderElement()
  );
};

export default MenuItem;
