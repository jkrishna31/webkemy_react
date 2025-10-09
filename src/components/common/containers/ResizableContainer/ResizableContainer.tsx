"use client";

import React, { ComponentProps, ElementType, memo, useCallback, useRef, useState } from "react";

import styles from "./ResizableContainer.module.scss";

export type Resizers = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br";

export type ResizableContainerProps<T extends ElementType> = {
  as?: T;
  allowedResizers?: Resizers[];
  contentClass?: string;
  handleMove?: (e: PointerEvent, payload?: any) => void;
  handleUp?: (e: PointerEvent, payload?: any) => void;
  xStep?: number;
  yStep?: number;
  payload?: any;
} & ComponentProps<T>;

const ResizableContainer = <T extends ElementType = "div">({
  as = "div",
  children, className, allowedResizers, contentClass,
  handleMove, handleUp, payload, xStep = 1, yStep = 1,
  ...props
}: ResizableContainerProps<T>) => {
  const Element = as;

  const elRef = useRef<T>(null);

  const [activeResize, setActiveResize] = useState<Resizers>();

  const handleResize = useCallback((e: PointerEvent, dir: Resizers) => {
    const elem = elRef.current as unknown as HTMLElement;
    if (!elem) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = elem.offsetWidth;
    const startHeight = elem.offsetHeight;
    const startTop = parseFloat(getComputedStyle(elem).top || "0");

    const cursorStyle = document.body.style.cursor;
    document.body.style.cursor = window.getComputedStyle(e.target as any).cursor;

    const onMove = (moveEv: PointerEvent) => {
      if (!elem) return;

      handleMove?.(moveEv, payload);

      const dx = moveEv.clientX - startX;
      const dy = moveEv.clientY - startY;

      const fdx = Math.round(dx / xStep) * xStep;
      const fdy = Math.round(dy / yStep) * yStep;

      if (dir.includes("r")) {
        elem.style.width = `${startWidth + fdx}px`;
      }
      if (dir.includes("l")) {
        elem.style.width = `${startWidth - fdx}px`;
        elem.style.height = `${elem.offsetHeight + fdx}`;
      }
      if (dir.includes("b")) {
        elem.style.height = `${startHeight + fdy}px`;
      }
      if (dir.includes("t")) {
        elem.style.height = `${startHeight - fdy}px`;
        elem.style.top = `${startTop + fdy}px`;
      }
      setActiveResize(dir);
    };

    const onUp = () => {
      handleUp?.(payload);
      document.body.style.cursor = cursorStyle;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setActiveResize(undefined);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [handleMove, handleUp, payload, xStep, yStep]);

  const startResize = (dir: Resizers) => (e: React.PointerEvent) => {
    e.preventDefault();
    handleResize(e.nativeEvent, dir);
  };

  const renderResizer = (dir: Resizers, className: string) => {
    if (!allowedResizers?.includes(dir)) {
      return null;
    }
    return (
      <div
        className={className}
        data-active={activeResize === dir}
        onPointerDown={startResize(dir)}
      ></div>
    );
  };

  return (
    <Element
      ref={elRef}
      className={`${styles.container} ${className}`}
      {...props}
    >
      <div className={`${styles.content} ${contentClass}`}>
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

export default memo(ResizableContainer);
