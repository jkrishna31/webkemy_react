"use client";

import React, { ComponentProps, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { hasDOM } from "@/lib/utils/client.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Dropdown.module.scss";

export interface DropdownProps extends ComponentProps<"div"> {
  dropdown: ReactNode;
  onClose?: () => void;
  onOpen?: () => any;
  open?: boolean;
  yPos?: "bottom" | "top";
  xPos?: "left" | "right";
  dropdownClass?: string;
  btnClass?: string;
  isCustomSelector?: boolean;
  noOverlap?: boolean;
  autoSize?: boolean;
}

const Dropdown = ({
  dropdown, children, className, dropdownClass, btnClass,
  onClose, open, onOpen, isCustomSelector, noOverlap,
  yPos = "bottom", xPos = "right", autoSize = true,
  ...props
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [y, setY] = useState<"bottom" | "top">("bottom");

  const getClasses = () => {
    const classes: string[] = [];
    if (yPos) {

      classes.push(styles[y]);
    }
    if (xPos) {
      classes.push(styles[xPos]);
    }
    return classes.join(" ");
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!(ref.current as HTMLDivElement).contains(e.target as HTMLElement)) {
      window.removeEventListener("click", handleOutsideClick);
      onClose?.();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === "Escape") {
      // e.preventDefault();
      // e.stopPropagation();
      e.stopImmediatePropagation();
      onClose?.();
    }
  }, [onClose]);

  const removeKeyDownListener = useCallback(() => {
    window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown, true);

      return removeKeyDownListener;
    }
  }, [handleKeyDown, open, removeKeyDownListener]);

  useEffect(() => {
    if (hasDOM() && onClose) {
      window.addEventListener("click", handleOutsideClick);
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [handleOutsideClick, onClose]);

  useLayoutEffect(() => {
    if (ref.current) {
      const height = window.innerHeight;
      const rect = ref.current.getBoundingClientRect();
      setY(rect.top > height - rect.top ? "top" : "bottom");
    }
  }, [dropdown]);

  // TODO: use Popover (with position: absolute, and transform with top & left value)

  return (
    <div ref={ref} className={classes(styles.wrapper, className)} {...props}>
      {
        isCustomSelector ? (
          children
        ) : (
          <button
            className={classes(styles.btn, btnClass)}
            onClick={onOpen}
            type="button"
          >
            {children}
          </button>
        )
      }
      {
        open ? (
          <div
            className={classes(styles.dropdown, getClasses(), dropdownClass)}
            data-overlap={!noOverlap}
            ref={dropdownRef}
          >
            {dropdown}
          </div>
        ) : null
      }
    </div>
  );
};

export default Dropdown;
