"use client";

import Link from "next/link";
import React, { ComponentProps, ElementType, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const innerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const destroyContentRef = useRef<NodeJS.Timeout>(undefined);

  const [destroyContent, setDestroyContent] = useState(!renderWhileClosed);

  const updateHeight = useCallback(() => {
    const elem = ref.current;
    if (elem) {
      const contentHeight = Math.ceil((elem as HTMLElement).scrollHeight + 1);
      elem.style.height = "fit-content";
      clearTimeout(timeoutRef.current);
      clearTimeout(destroyContentRef.current);
      setDestroyContent(false);
      if (open) {
        const currMaxHeight = Number(elem.style?.maxHeight?.slice(0, -2));
        if (currMaxHeight <= contentHeight) {
          elem.style.maxHeight = `${contentHeight}px`;
        }
        elem.style.opacity = "100%";
        timeoutRef.current = setTimeout(() => {
          elem.style.overflow = "initial";
        }, .5 * duration);
      } else {
        elem.style.maxHeight = "0px";
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

  const handleTransitionStart = () => {
    const elem = ref.current;
    if (elem && open) {
      // clearTimeout(timeoutRef.current ?? undefined);
      elem.style.overflow = "hidden";
    }
  };

  useLayoutEffect(() => {
    updateHeight();
  }, [updateHeight]);

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

  if (destroyContent && !open) return null;

  return (
    <Element
      aria-hidden={!open}
      {...props}
      ref={ref}
      className={`${styles.container} ${className}`}
      onTransitionStart={open ? handleTransitionStart : undefined}
      onTransitionEnd={open ? (e: TransitionEvent) => {
        if (e.propertyName !== "max-height") {
          updateHeight();
        }
      } : undefined}
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
