"use client";

import { ComponentProps, ElementType, memo, useRef, useState } from "react";

import { Keys } from "@/lib/constants/keys";
import { useLongPress } from "@/lib/hooks/useLongPress";
import { classes } from "@/lib/utils/style";

import styles from "./Resizable.module.scss";

export type Resizers = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br";

export type ResizableProps<T extends ElementType> = {
  as?: T;
  resizers?: Resizers[];
  contentClass?: string;
  handleMove?: (e: PointerEvent, payload?: any) => void;
  handleUp?: (e: PointerEvent, payload?: any) => void;
  xStep?: number;
  yStep?: number;
  payload?: any;
} & ComponentProps<T>;

export const Resizable = <T extends ElementType = "div">({
  as = "div",
  children, className, resizers, contentClass,
  handleMove, handleUp, payload, xStep = 1, yStep = 1,
  ...props
}: ResizableProps<T>) => {
  const Element = as;

  const elRef = useRef<HTMLElement>(null);

  const [activeResize, setActiveResize] = useState<Resizers>();
  const [startDetails, setStartDetails] = useState<{
    width: number; height: number; top: number; coords: number[];
  } | undefined>();

  const keyDownHandler = (keyDownEvent: React.KeyboardEvent) => {
    let newValue = 0;
    switch (keyDownEvent.key) {
      case Keys.ARROW_LEFT:
        newValue -= 2;
        break;
      case Keys.ARROW_RIGHT:
        newValue += 2;
        break;
      case Keys.ARROW_UP:
        keyDownEvent.preventDefault();
        newValue -= 2;
        break;
      case Keys.ARROW_DOWN:
        keyDownEvent.preventDefault();
        newValue += 2;
        break;
    }
  };

  useLongPress(
    elRef,
    {
      onStart: (e) => {
        const elem = elRef.current as unknown as HTMLElement;
        if (!elem) return;

        const handle = (e.target as HTMLElement)?.closest("[data-resize]");
        if (!handle) return;
        const dir = handle.getAttribute("data-resize");
        e.preventDefault();
        setActiveResize(dir as Resizers);

        document.body.style.cursor = window.getComputedStyle(e.target as any).cursor;

        const startWidth = elem.offsetWidth;
        const startHeight = elem.offsetHeight;
        const startTop = parseFloat(getComputedStyle(elem).top || "0");
        const startCoords = e instanceof PointerEvent ? [e.clientX, e.clientY] : [e.touches[0].clientX, e.touches[0].clientY];

        setStartDetails({ height: startHeight, width: startWidth, top: startTop, coords: startCoords });
      },
      onMove: (e) => {
        const elem = elRef.current as unknown as HTMLElement;
        if (!elem || !startDetails) return;

        handleMove?.(e, payload);

        const coords = e instanceof PointerEvent ? [e.clientX, e.clientY] : [e.touches[0].clientX, e.touches[0].clientY];

        const dx = coords[0] - startDetails.coords[0];
        const dy = coords[1] - startDetails.coords[1];

        const fdx = Math.round(dx / xStep) * xStep;
        const fdy = Math.round(dy / yStep) * yStep;

        if (activeResize?.includes("r")) {
          elem.style.width = `${startDetails.width + fdx}px`;
        }
        if (activeResize?.includes("l")) {
          elem.style.width = `${startDetails.width - fdx}px`;
          elem.style.height = `${elem.offsetHeight + fdx}`;
        }
        if (activeResize?.includes("b")) {
          elem.style.height = `${startDetails.height + fdy}px`;
        }
        if (activeResize?.includes("t")) {
          elem.style.height = `${startDetails.height - fdy}px`;
          elem.style.top = `${startDetails.top + fdy}px`;
        }
      },
      onEnd: (e) => {
        handleUp?.(e, payload);
        document.body.style.removeProperty("cursor");
        setActiveResize(undefined);
      },
    }
  );

  const renderResizer = (dir: Resizers, className: string) => {
    if (!resizers?.includes(dir)) return null;
    return (
      <div
        tabIndex={0}
        className={className}
        data-active={activeResize === dir}
        data-resize={dir}
        onKeyDown={keyDownHandler}
      ></div>
    );
  };

  return (
    <Element
      ref={elRef}
      className={classes(styles.container, className)}
      {...props}
    >
      <div className={classes(styles.content, contentClass)}>
        {children}
      </div>

      {renderResizer("t", `re ret ${styles.re} ${styles.ret}`)}
      {renderResizer("r", `re rer ${styles.re} ${styles.rer}`)}
      {renderResizer("b", `re reb ${styles.re} ${styles.reb}`)}
      {renderResizer("l", `re rel ${styles.re} ${styles.rel}`)}

      {renderResizer("tl", `rc rctl ${styles.rc} ${styles.rctl}`)}
      {renderResizer("tr", `rc rctr ${styles.rc} ${styles.rctr}`)}
      {renderResizer("br", `rc rcbr ${styles.rc} ${styles.rcbr}`)}
      {renderResizer("bl", `rc rcbl ${styles.rc} ${styles.rcbl}`)}
    </Element>
  );
};
