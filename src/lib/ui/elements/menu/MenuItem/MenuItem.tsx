import Link, { LinkProps } from "next/link";
import React, { ComponentProps, ElementType, ReactNode } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Collapsible } from "@/lib/ui/elements/Collapsible";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./MenuItem.module.scss";

export type Item<T extends ElementType> = {
  id: string;
  as?: T;
  icon?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  badge?: ReactNode;
  menu?: Array<Item<T>>;
  group?: ReactNode;

  custom?: boolean;
  activeItem?: string | number;
  disabled?: boolean;
  minimized?: boolean;
  openItems?: (string | number)[];
  collapsible?: boolean;

  onMenuToggle?: (id: string | number) => void;
} & (T extends "a" ? LinkProps : ComponentProps<T>);

export type MenuItemProps<T extends ElementType> = Item<T>;

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
      <div
        className={classes(styles.group_header, styles.sticky, "group_header", className)}
        role="presentation"
      >
        {group}
      </div>
    ) : (
      <Element
        className={classes(styles.item, className, collapsible && styles.sticky, "menu_item")}
        aria-label={typeof primary === "string" ? primary : ""}
        {...props}
        onClick={onClick ? () => onClick(id) : undefined}
        data-active={activeItem === id}
        {...((as === "a" && activeItem === id) ? { "aria-current": "page" } : {})}
        disabled={disabled}
        aria-disabled={disabled}
        data-minimized={minimized}
        {...((as === "a" && disabled) ? { tabIndex: -1 } : {})}
      >
        {!custom ? (
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
              onClick={() => onMenuToggle?.(id)}
              aria-pressed={isOpen}
              aria-label={isOpen ? "Close Sub-Menu" : "Open Sub-Menu"}
              title={isOpen ? "Close Sub-Menu" : "Open Sub-Menu"}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        }
        className={styles.container}
        data-minimized={minimized}
      >
        <div className={styles.details_wrapper}>
          {renderSubMenu()}
        </div>
      </Collapsible>
    ) : (
      <div
        className={classes(styles.container, group && styles.group_container)}
        data-minimized={minimized}
        role="group"
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
