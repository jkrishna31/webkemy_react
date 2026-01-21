"use client";

import Link from "next/link";
import { ComponentProps, ElementType, useEffectEvent, useLayoutEffect, useRef, useState } from "react";

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
  const frameRef = useRef<number>(null);

  const updateHeight = useEffectEvent((_duration: number, _open: boolean, _renderWhileClosed: boolean) => {
    const elem = ref.current;
    if (elem && !isFirstRender.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (destroyContentRef.current) clearTimeout(destroyContentRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setDestroyContent(false);

      const contentHeight = Math.ceil((elem as HTMLElement).scrollHeight);
      const currHeight = Math.ceil((elem as HTMLElement).clientHeight);

      frameRef.current = requestAnimationFrame(() => {
        if (_open) {
          elem.style.overflow = "hidden";
          elem.style.setProperty("--mxh", (currHeight && _renderWhileClosed) ? `${currHeight}px` : "0px");
          void elem.offsetHeight;
          elem.style.setProperty("--mxh", `${contentHeight}px`);
          timeoutRef.current = setTimeout(() => {
            elem.style.overflow = "";
            elem.style.setProperty("--mxh", "none");
          }, _duration);
        } else {
          elem.style.overflow = "hidden";
          elem.style.setProperty("--mxh", `${currHeight}px`);
          void elem.offsetHeight;
          elem.style.setProperty("--mxh", "0px");
          if (!_renderWhileClosed) {
            destroyContentRef.current = setTimeout(() => {
              setDestroyContent(true);
            }, _duration);
          }
        }
      });
    }
  });

  useLayoutEffect(() => {
    isFirstRender.current = false;
  }, []);

  useLayoutEffect(() => {
    updateHeight(duration, open, renderWhileClosed);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, open, renderWhileClosed]);

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
