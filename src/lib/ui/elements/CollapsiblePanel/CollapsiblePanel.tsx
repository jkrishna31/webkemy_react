"use client";

import Link from "next/link";
import { ComponentProps, ElementType, useCallback, useLayoutEffect, useRef, useState } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./CollapsiblePanel.module.scss";

export type CollapsiblerPanelProps<T extends ElementType> = {
  as?: T;
  open?: boolean;
  renderWhileClosed?: boolean;
  duration?: number;
} & ComponentProps<T>;

const CollapsiblePanel = <T extends ElementType = "div">({
  as = "div", open, children, className, renderWhileClosed = true,
  duration = 500,
  ...props
}: CollapsiblerPanelProps<T>) => {
  const Element = as === "a" ? Link : as;

  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const destroyContentRef = useRef<NodeJS.Timeout>(undefined);

  const [destroyContent, setDestroyContent] = useState(!renderWhileClosed);
  const isFirstRender = useRef(true);

  const updateHeight = useCallback(() => {
    const elem = ref.current;
    if (elem && !isFirstRender.current) {
      clearTimeout(timeoutRef.current);
      clearTimeout(destroyContentRef.current);
      setDestroyContent(false);
      const contentHeight = Math.ceil((elem as HTMLElement).scrollHeight);
      const currHeight = Math.ceil((elem as HTMLElement).clientHeight);
      requestAnimationFrame(() => {
        if (open) {
          elem.style.overflow = "hidden";
          elem.style.setProperty("--mxh", (currHeight && renderWhileClosed) ? `${currHeight}px` : "0px");
          void elem.offsetHeight;
          elem.style.setProperty("--mxh", `${contentHeight}px`);
          timeoutRef.current = setTimeout(() => {
            elem.style.overflow = "";
            elem.style.setProperty("--mxh", "none");
          }, duration);
        } else {
          elem.style.overflow = "hidden";
          elem.style.setProperty("--mxh", `${currHeight}px`);
          void elem.offsetHeight;
          elem.style.setProperty("--mxh", "0px");
          if (!renderWhileClosed) {
            destroyContentRef.current = setTimeout(() => {
              setDestroyContent(true);
            }, duration);
          }
        }
      });
    }
  }, [duration, open, renderWhileClosed]);

  useLayoutEffect(() => {
    isFirstRender.current = false;
  }, []);

  useLayoutEffect(updateHeight, [updateHeight]);

  if (destroyContent && !open) return null;

  return (
    <Element
      aria-hidden={!open}
      {...props}
      ref={ref}
      className={classes(styles.container, className)}
      role="region"
      data-expanded={open}
    >
      {children}
    </Element>
  );
};

export default CollapsiblePanel;
