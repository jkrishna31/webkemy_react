"use client";

import React, { ComponentProps, ElementType, useEffect, useRef, useState } from "react";

import { Item } from "@/lib/ui/elements/menu";
import { Popover } from "@/lib/ui/elements/Popover";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Menu.module.scss";

export interface MenuProps<T extends ElementType> extends ComponentProps<"div"> {
  minimized?: boolean;
  items?: Item<T>;
}

const Menu = <T extends ElementType>({
  minimized, items,
  children, className,
  ...props
}: MenuProps<T>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const [anchor, setAnchor] = useState<HTMLElement>();
  const [tooltip, setTooltip] = useState<string>();

  useEffect(() => {
    const menuElem = menuRef.current;
    if (!menuElem || !minimized) return;

    const handlePointerMove = (e: PointerEvent) => {
      requestAnimationFrame(() => {
        const menuItem = (e.target as HTMLElement).closest(".menu_item") as HTMLElement;
        const tooltipContent = menuItem?.getAttribute("aria-label") ?? "";
        clearTimeout(timeoutRef.current ?? undefined);
        if (!menuItem) {
          timeoutRef.current = setTimeout(() => {
            setAnchor(undefined);
            setTooltip("");
          }, 100);
        } else {
          setAnchor(menuItem);
          setTooltip(tooltipContent);
        }
      });
    };

    const handlePointerLeave = () => {
      setAnchor(undefined);
      setTooltip("");
      menuElem.removeEventListener("pointermove", handlePointerMove);
      menuElem.removeEventListener("pointerleave", handlePointerLeave);
    };

    const handlePointerEnter = () => {
      menuElem.addEventListener("pointermove", handlePointerMove, { passive: true });
      menuElem.addEventListener("pointerleave", handlePointerLeave);
    };

    menuElem.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      menuElem.removeEventListener("pointerenter", handlePointerEnter);
      handlePointerLeave();
    };
  }, [minimized]);

  return (
    <div
      ref={menuRef}
      className={classes(styles.wrapper, className)}
      data-minimized={minimized}
      {...props}
    >
      {children}
      {anchor ? (
        <Popover
          anchor={anchor}
          onClose={() => setAnchor(undefined)}
          isTooltip
          placement="right"
          alignment="center"
        >
          <div className={styles.popover}>
            {tooltip}
          </div>
        </Popover>
      ) : null}
    </div>
  );
};

export default Menu;
