"use client";

import Link from "next/link";
import React, { ComponentProps, ElementType, useCallback, useLayoutEffect, useRef, useState } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./CollapsibleContainer.module.scss";

export type CollapsibleContainerProps<T extends ElementType> = {
  as?: T;
  open?: boolean;
  renderWhileClosed?: boolean;
  duration?: number;
} & ComponentProps<T>;

const CollapsibleContainer = <T extends ElementType = "div">({
  as = "div", open, children, className, renderWhileClosed = true,
  duration = 500,
  ...props
}: CollapsibleContainerProps<T>) => {
  const Element = as === "a" ? Link : as;

  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const destroyContentRef = useRef<NodeJS.Timeout>(undefined);

  const [destroyContent, setDestroyContent] = useState(!renderWhileClosed);

  const updateHeight = useCallback(() => {
    const elem = ref.current;
    if (elem) {
      const contentHeight = Math.ceil((elem as HTMLElement).scrollHeight + 1);
      clearTimeout(timeoutRef.current);
      clearTimeout(destroyContentRef.current);
      setDestroyContent(false);
      if (open) {
        const currMaxHeight = Number(elem.style?.maxHeight?.slice(0, -2));
        // console.log("=== update height ===", elem, contentHeight, currMaxHeight, (elem as HTMLElement).offsetHeight);
        if (currMaxHeight <= contentHeight) {
          elem.style.setProperty("--mxh", "0px");
          void elem.offsetHeight;
          elem.style.setProperty("--mxh", `${contentHeight}px`);
        }
        elem.style.overflow = "hidden";
        elem.style.opacity = "100%";
        timeoutRef.current = setTimeout(() => elem.style.overflow = "", .5 * duration);
        timeoutRef.current = setTimeout(() => elem.style.setProperty("--mxh", "auto"), duration);
      } else {
        elem.style.setProperty("--mxh", `${contentHeight}px`);
        void elem.offsetHeight;
        elem.style.setProperty("--mxh", "0px");
        elem.style.overflow = "hidden";
        elem.style.opacity = "0%";
        if (!renderWhileClosed) {
          destroyContentRef.current = setTimeout(() => {
            setDestroyContent(true);
          }, duration);
        }
      }
    }
  }, [duration, open, renderWhileClosed]);

  useLayoutEffect(() => {
    updateHeight();
  }, [updateHeight]);

  // useEffect(() => {
  //   const innerElem = ref.current;
  //   if (open && innerElem) {
  //     const observer = new ResizeObserver((d) => {
  //       updateHeight();
  //     });
  //     observer.observe(innerElem);
  //     return () => observer.disconnect();
  //   }
  // }, [open, updateHeight]);

  if (destroyContent && !open) return null;

  return (
    <Element
      aria-hidden={!open}
      {...props}
      ref={ref}
      className={classes(styles.container, className)}
      // onTransitionEnd={open ? (e: TransitionEvent) => {
      //   if (e.propertyName !== "max-height") {
      //     updateHeight();
      //   }
      // } : undefined}
      role="region"
      data-expanded={open}
    >
      {children}
    </Element>
  );
};

export default CollapsibleContainer;
