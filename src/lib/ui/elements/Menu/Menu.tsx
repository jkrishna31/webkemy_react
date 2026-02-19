"use client";

import { ComponentProps, ElementType, ReactNode, useEffect, useRef, useState } from "react";

import { TItem } from "@/lib/ui/elements/Item";
import { Popover } from "@/lib/ui/elements/Popover";
import { isMobileDevice } from "@/lib/utils/client.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Menu.module.scss";

export type TMenuItem<T extends ElementType> = TItem<T> & { menu?: TMenuItem<T>[]; group?: ReactNode; };

export interface MenuProps<T extends ElementType = "a"> extends ComponentProps<"div"> {
  minimized?: boolean;
  as?: T;
  items?: TMenuItem<T>[];
}

const Menu = <T extends ElementType>({
  minimized, items, as,
  children, className,
  ...props
}: MenuProps<T>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const [anchor, setAnchor] = useState<HTMLElement>();
  const [tooltip, setTooltip] = useState<string>();

  useEffect(() => {
    const menuElem = menuRef.current;
    if (!menuElem || !minimized || isMobileDevice()) return;

    const handlePointerMove = (e: PointerEvent) => {
      requestAnimationFrame(() => {
        const menuItem = (e.target as HTMLElement).closest(".menu_item") as HTMLElement;
        const tooltipContent = menuItem?.getAttribute("data-tooltip") ?? "";
        clearTimeout(timeoutRef.current ?? undefined);
        if (!menuItem || !tooltipContent) {
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
      if (!minimized) {
        setAnchor(undefined);
      }
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
          role="tooltip"
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
