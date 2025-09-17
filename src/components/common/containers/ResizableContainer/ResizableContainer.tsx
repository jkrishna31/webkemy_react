"use client";

import React, { ComponentProps, memo, useCallback, useRef } from "react";

import styles from "./ResizableContainer.module.scss";

export type Resizers = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br";

export interface ResizableContainerProps extends ComponentProps<"div"> {
  allowedResizers?: Resizers[]
  contentClass?: string
  handleMove?: (e: PointerEvent, payload?: any) => void
  handleUp?: (e: PointerEvent, payload?: any) => void
  xStep?: number
  yStep?: number
  payload?: any
}

const ResizableContainer = ({
  children, className, allowedResizers, contentClass,
  handleMove, handleUp, payload, xStep = 1, yStep = 1,
  ...props
}: ResizableContainerProps) => {
  const elRef = useRef<HTMLDivElement>(null);

  // const resizeRight = (e: MouseEvent) => {
  //   if (e.target instanceof HTMLElement && elRef.current) {
  //     elRef.current.style.width = elRef.current.getBoundingClientRect().width + e.movementX + "px";
  //   }
  // };

  // const resizeBottom = (e: MouseEvent) => {
  //   if (e.target instanceof HTMLElement && elRef.current) {
  //     elRef.current.style.height = elRef.current.getBoundingClientRect().height + e.movementY + "px";
  //   }
  // };

  const handleResize = useCallback((e: PointerEvent, dir: Resizers) => {
    const elem = elRef.current;
    if (!elem) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = elem.offsetWidth;
    const startHeight = elem.offsetHeight;
    const startTop = parseFloat(getComputedStyle(elem).top || "0");

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
    };

    const onUp = () => {
      handleUp?.(payload);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [handleMove, handleUp, payload, xStep, yStep]);

  const startResize = (dir: Resizers) => (e: React.PointerEvent) => {
    e.preventDefault();
    handleResize(e.nativeEvent, dir);
  };

  // another approach ---
  // use mouseenter event
  // on mouse enter add mouse move event
  // on mouse leave remove mouse move event
  // on mouse move detect which edge or corner the mouse is currently near
  // add the respective class which will update cursor style and show the pill resizer
  // also add the pointerdown, pointermove, and pointerup listeners for rest behaviour

  // const handlePointerMove = () => {
  //   console.log("*** pointer move ***",);
  // };

  // const handlePointerLeave = () => {
  //   console.log("==== handle pointer leave ====",);
  //   window.removeEventListener("pointermove", handlePointerMove);
  // };

  // const handlePointerEnter = () => {
  //   console.log("---- HANDLE POINTER ENTER ----",);
  //   window.addEventListener("pointermove", handlePointerMove);
  //   window.addEventListener("pointerleave", handlePointerLeave, { once: true });
  // };

  const renderResizer = (dir: Resizers, className: string) => {
    if (!allowedResizers?.includes(dir)) {
      return null;
    }
    return (
      <div
        className={className}
        onPointerDown={startResize(dir)}
      ></div>
    );
  };

  return (
    <div
      className={`${styles.container} ${className}`} ref={elRef} {...props}
    // onPointerEnter={handlePointerEnter}
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
    </div>
  );
};

export default memo(ResizableContainer);
