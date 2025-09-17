"use client";

import React, { ComponentProps, CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { useScroll } from "@/lib/hooks";

import styles from "./Virtualizer.module.scss";

export interface VirtualizerProps<T> extends ComponentProps<"div"> {
  data: T[]
  itemMaxSize: number
  render: (data: T, style: CSSProperties) => ReactNode
  onBottom?: any
}

const Virtualizer = <T extends object | string | number | boolean>({
  children, className, data, itemMaxSize, render, onBottom,
  ...props
}: VirtualizerProps<T>) => {
  const offsetTop = useRef(0);
  const [renderStart, setRenderStart] = useState(0);
  const heightMap = useRef<{ [key: number]: number }>({});
  const ref = useRef<HTMLDivElement>(null);

  const itemsPerWindow = Math.max(10, (ref.current as HTMLElement)?.clientHeight / itemMaxSize);

  const handleScroll = useCallback((e: WheelEvent) => {
    const el = e.target as HTMLElement;
    const scrolled = el?.scrollTop;
    // console.log("---- scrolled ----", scrolled);
    const itemsScrolled = Math.floor(scrolled / itemMaxSize);
    offsetTop.current = (scrolled);
    setRenderStart(itemsScrolled);
  }, [itemMaxSize]);

  const { isOnBoundary } = useScroll({
    target: ref, margin: 0, delay: 0, onScroll: handleScroll,
  }, { passive: true });

  useEffect(() => {
    if (isOnBoundary && ref.current) {
      // const windowHeight = (ref.current as HTMLElement).scrollHeight;
      if (data.length <= renderStart + itemsPerWindow) {
        onBottom?.();
      }
    }
  }, [data.length, isOnBoundary, itemsPerWindow, onBottom, renderStart]);

  // approaches
  // 1. USE INTERSECTION OBSERVER TO FIX THAT ITEM LEVEL JITTER BY SCROLLING UPTO HOW MUCH OF THE INTERSECTING ELEMENT IS ALREADY SCROLLED OUT OF VIEWPORT
  // 2. USE INTERSECTION OBSERVER ON THE CONTAINER AND OBSERVER ALL ITEMS
  // 2.a. use info like first & last intersecting item
  // 3. add in totalPlacement as item 

  // issues/areas to look
  // 1. as scroll up as new items
  // 2. no jitter in scroll when adding elements on top

  // data present - previous elements already rendered once, so on rendering an element we store the height of that element in a hashmap based on element id

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      ref={ref}
    >
      {
        data?.map((item, idx) => {
          if (idx >= (renderStart) && idx <= (renderStart + itemsPerWindow)) {
            return render(item, {
              transform: `translate3d(0, ${offsetTop.current}px, 0)`
            });
          }
          return null;
        })
      }
      {children}
    </div>
  );
};

export default Virtualizer;
