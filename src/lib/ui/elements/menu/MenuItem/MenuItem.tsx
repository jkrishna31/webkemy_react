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
  openItems?: string[]
  menu?: Array<MenuItemProps<T>>
  onMenuToggle?: (id: string) => void;
  group?: ReactNode;
  collapsible?: boolean;
} & (T extends "a" ? LinkProps : ComponentProps<T>);

const MenuItem = <T extends ElementType = "button">({
  as = "button", id,
  icon, primary, secondary, badge,
  minimized, custom, activeItem, disabled,
  menu, onMenuToggle, openItems, group,
  className, children, onClick, collapsible = true,
  ...props
}: MenuItemProps<T>) => {
  const Element = as === "a" ? Link : as;

  const renderSubMenu = () => {
    return (
      <div className={styles.sub_menu_wrapper}>
        {
          menu.map((item: MenuItemProps<T>) => {
            return (
              <MenuItem
                {...props}
                {...item}
                key={item.key}
                id={item.key}
                as={item.href ? "a" : "button"}
                minimized={minimized}
                activeItem={activeItem}
                openItems={openItems}
                onMenuToggle={onMenuToggle}
                onClick={onClick}
              />
            );
          })
        }
      </div>
    );
  };

  const renderElement = () => {
    return group ? (
      <div className={`${styles.group_header} ${styles.sticky} group_header`}>{group}</div>
    ) : (
      <Element
        className={`${styles.item} ${className} ${collapsible ? styles.sticky : ""} menu_item`}
        aria-label={typeof primary === "string" ? primary : ""}
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
    const isOpen = openItems?.includes(id);
    return collapsible ? (
      <Collapsible
        open={isOpen}
        summary={
          <div className={styles.root_item}>
            {renderElement()}
            <Button
              variant="tertiary"
              className={styles.toggle_btn}
              onClick={() => onMenuToggle(id)}
              aria-pressed={isOpen}
              aria-label={isOpen ? "Close Sub-Menu" : "Open Sub-Menu"}
              title={isOpen ? "Close Sub-Menu" : "Open Sub-Menu"}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        }
        adjustOverflow
        className={styles.container}
        data-minimized={minimized}
      >
        {renderSubMenu()}
      </Collapsible>
    ) : (
      <div
        className={`${styles.container} ${group ? styles.group_container : ""}`}
        data-minimized={minimized}
      >
        {renderElement()}
        {renderSubMenu()}
      </div>
    );
  }

  return (
    renderElement()
  );
};

export default MenuItem;
