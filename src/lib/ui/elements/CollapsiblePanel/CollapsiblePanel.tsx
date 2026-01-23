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
    if (!elem) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (destroyContentRef.current) clearTimeout(destroyContentRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDestroyContent(false);

    const contentHeight = Math.ceil((elem as HTMLElement).scrollHeight);
    const currentHeight = Math.ceil((elem as HTMLElement).clientHeight);

    frameRef.current = requestAnimationFrame(() => {
      if (_open) {
        if (contentHeight === currentHeight && _renderWhileClosed) {
          elem.style.setProperty("--mxh", "auto");
          return;
        }
        elem.style.setProperty("overflow", "hidden");
        elem.style.setProperty("--mxh", (currentHeight && _renderWhileClosed) ? `${currentHeight}px` : "0px");
        // void elem.offsetHeight;
        requestAnimationFrame(() => {
          elem.style.setProperty("--mxh", `${contentHeight}px`);
          timeoutRef.current = setTimeout(() => {
            elem.style.removeProperty("overflow");
            elem.style.setProperty("--mxh", "auto");
          }, _duration);
        });
      } else {
        elem.style.setProperty("overflow", "hidden");
        elem.style.setProperty("--mxh", `${currentHeight}px`);
        // void elem.offsetHeight;
        requestAnimationFrame(() => {
          elem.style.setProperty("--mxh", "0px");
          if (!_renderWhileClosed) {
            destroyContentRef.current = setTimeout(() => {
              setDestroyContent(true);
            }, _duration);
          }
        });
      }
    });
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
