"use client";

import Link from "next/link";
import React, { ComponentProps, ElementType, useCallback, useEffect, useLayoutEffect, useRef } from "react";

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
  const innerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const innerElem = innerRef.current;
    if (open && innerElem) {
      const observer = new ResizeObserver(() => {
        updateHeight();
      });
      observer.observe(innerElem);
      return () => observer.disconnect();
    }
  }, [open, updateHeight]);

  // useEffect(() => {
  //   const innerElem = ref.current;
  //   if (innerElem && open) {
  //     const observer = new MutationObserver(() => {
  //       updateHeight();
  //     });
  //     observer.observe(innerElem, { attributes: true, subtree: true, childList: true });
  //     return () => observer.disconnect();
  //   }
  // }, [open, updateHeight]);

  // if (!renderWhileClosed && !open) return;

  return (
    <Element
      {...props}
      ref={ref}
      className={`${styles.container} ${className}`}
      onTransitionStart={open ? handleTransitionStart : undefined}
      onTransitionEnd={open ? updateHeight : undefined}
      role="region"
      data-expanded={open}
    >
      <div className="inner_container" ref={innerRef}>
        {children}
      </div>
    </Element>
  );
};

export default CollapsibleContainer;
