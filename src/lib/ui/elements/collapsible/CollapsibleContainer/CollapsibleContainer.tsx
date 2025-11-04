"use client";

import Link from "next/link";
import React, { ComponentProps, ElementType, useCallback, useLayoutEffect, useRef } from "react";

import styles from "./CollapsibleContainer.module.scss";

export type CollapsibleContainerProps<T extends ElementType> = {
  as?: T;
  open?: boolean;
  renderWhileClosed?: boolean;
} & ComponentProps<T>;

const CollapsibleContainer = <T extends ElementType = "div">({
  as = "div", open, children, className, renderWhileClosed = true,
  ...props
}: CollapsibleContainerProps<T>) => {
  const Element = as === "a" ? Link : as;

  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const updateHeight = useCallback(() => {
    const elem = ref.current;
    if (elem) {
      const contentHeight = (elem as HTMLElement).scrollHeight;
      elem.style.height = "fit-content";
      elem.style.maxHeight = `${open ? contentHeight : 0}px`;
      clearTimeout(timeoutRef.current ?? undefined);
      if (open) {
        elem.style.opacity = "100%";
        timeoutRef.current = setTimeout(() => {
          elem.style.overflow = "initial";
        }, .6 * 500);
      } else {
        elem.style.overflow = "hidden";
        elem.style.opacity = "0%";
      }
    }
  }, [open]);

  const handleTransitionStart = () => {
    const elem = ref.current;
    if (elem && open) {
      clearTimeout(timeoutRef.current ?? undefined);
      elem.style.overflow = "hidden";
    }
  };

  useLayoutEffect(() => {
    updateHeight();
  }, [open, updateHeight]);

  // if (!renderWhileClosed && !open) return;

  return (
    <Element
      {...props}
      ref={ref}
      className={`${styles.container} ${className}`}
      onTransitionStart={handleTransitionStart}
      onTransitionEnd={updateHeight}
      role="region"
      data-expanded={open}
    >
      {children}
    </Element>
  );
};

export default CollapsibleContainer;
