"use client";

import React, { ComponentProps, useEffect, useImperativeHandle, useRef, useState } from "react";

import { useWindowSize } from "@/data/stores";
import { useDebouncedCallback } from "@/lib/hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/ui/svgs/icons";
import { hasDOM } from "@/lib/utils/client.utils";

import styles from "./Scrollable.module.scss";

export interface ScrollableProps extends ComponentProps<"div"> {
  vertical?: boolean
  scrollStep?: number
}

const Scrollable = ({
  children,
  className,
  vertical,
  scrollStep = 100,
  ref,
  ...props
}: ScrollableProps) => {
  const windowSize = useWindowSize();

  const listRef = useRef<HTMLDivElement>(null);

  const [hasXScroll, setHasXScroll] = useState([false, false]);
  const [hasYScroll, setHasYScroll] = useState([false, false]);

  const updateScrollArea = useDebouncedCallback(
    () => {
      if (listRef.current) {
        if (vertical) {
          const canScrollUp = listRef.current.scrollTop > 0;
          const canScrollDown = listRef.current.scrollTop < (listRef.current.scrollHeight - listRef.current.clientHeight);
          setHasYScroll([canScrollUp, canScrollDown]);
        } else {
          const canScrollLeft = listRef.current.scrollLeft > 0;
          const canScrollRight = Math.ceil(listRef.current.scrollLeft) < (listRef.current.scrollWidth - listRef.current.clientWidth);
          setHasXScroll([canScrollLeft, canScrollRight]);
        }
      }
    },
    50,
  );

  const performScroll = (dir: "left" | "right") => {
    if (listRef.current) {
      listRef.current.scrollBy({
        behavior: "smooth",
        left: dir === "left" ? -scrollStep : scrollStep,
      });
    }
  };

  useImperativeHandle(ref, () => listRef.current!);

  useEffect(() => {
    if (hasDOM() && listRef.current) {
      const elem = listRef.current;
      // make it debounce (since on fast scroll btn not getting removed)
      elem.addEventListener("scroll", updateScrollArea);
      elem.addEventListener("wheel", updateScrollArea);
      return () => {
        elem.removeEventListener("wheel", updateScrollArea);
        elem.removeEventListener("scroll", updateScrollArea);
      };
    }
  }, [updateScrollArea]);

  useEffect(() => {
    if (hasDOM()) {
      updateScrollArea();
    }
  }, [updateScrollArea, windowSize]);

  return (
    <>
      {
        hasXScroll[0] ? (
          <button
            className={`${styles.scroll_btn} ${styles.btn_left} scroll_btn`}
            onClick={() => performScroll("left")}
            aria-label="Scroll Left"
          >
            <ChevronLeftIcon className={styles.scroll_icon} />
          </button>
        ) : null
      }
      <div
        {...props}
        className={`scroll_invisible ${styles.container} ${className}`}
        ref={listRef}
      >
        {children}
      </div>
      {
        hasXScroll[1] ? (
          <button
            className={`${styles.scroll_btn} ${styles.btn_right} scroll_btn`}
            onClick={() => performScroll("right")}
            aria-label="Scroll Right"
          >
            <ChevronRightIcon className={styles.scroll_icon} />
          </button>
        ) : null
      }
    </>
  );
};

export default Scrollable;
