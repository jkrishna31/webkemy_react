"use client";

import React, { ComponentProps, useEffect, useRef, useState } from "react";

import { Popover } from "@/lib/ui/elements/popper";

import styles from "./Menu.module.scss";

export interface MenuProps extends ComponentProps<"div"> {
  minimized?: boolean;
}

const Menu = ({
  minimized,
  children, className,
  ...props
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [anchor, setAnchor] = useState<HTMLElement>();
  const [tooltip, setTooltip] = useState<string>();

  useEffect(() => {
    const menuElem = menuRef.current;
    if (menuElem && minimized) {
      const handlePointerMove = (e: PointerEvent) => {
        const menuItem = (e.target as HTMLElement).closest(".menu_item") as HTMLElement;
        setAnchor(menuItem || undefined);
        setTooltip(menuItem?.getAttribute("aria-label") ?? "");
      };

      const handlePointerLeave = () => {
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
        menuElem.removeEventListener("pointerleave", handlePointerLeave);
        menuElem.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [minimized]);

  return (
    <div
      ref={menuRef}
      className={`${styles.wrapper} ${className}`}
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
        // delayCloseOnEsc
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
