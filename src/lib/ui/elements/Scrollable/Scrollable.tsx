"use client";

import React, { ComponentProps, useEffect, useImperativeHandle, useRef, useState } from "react";

import { useWindowSize } from "@/data/stores";
import useThrottledCallback from "@/lib/hooks/useThrottledCallback";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { hasDOM } from "@/lib/utils/client.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Scrollable.module.scss";


export interface ScrollableProps extends ComponentProps<"div"> {
  vertical?: boolean
  scrollStep?: number
}

const Scrollable = ({
  children,
  className,
  id,
  vertical,
  scrollStep = 100,
  ref,
  ...props
}: ScrollableProps) => {
  const windowSize = useWindowSize();

  const listRef = useRef<HTMLDivElement>(null);

  const [hasXScroll, setHasXScroll] = useState([false, false]);
  const [hasYScroll, setHasYScroll] = useState([false, false]);

  const updateScrollArea = useThrottledCallback(
    () => {
      if (!listRef.current) return;
      if (vertical) {
        const canScrollUp = listRef.current.scrollTop > 0;
        const canScrollDown = listRef.current.scrollTop < (listRef.current.scrollHeight - listRef.current.clientHeight);
        setHasYScroll([canScrollUp, canScrollDown]);
      } else {
        const canScrollLeft = listRef.current.scrollLeft > 0;
        const canScrollRight = Math.ceil(listRef.current.scrollLeft) < (listRef.current.scrollWidth - listRef.current.clientWidth);
        setHasXScroll([canScrollLeft, canScrollRight]);
      }
    },
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
    // TODO: add only if has scrollable area
    const elem = listRef.current;
    if (hasDOM() && elem) {
      elem.addEventListener("scroll", updateScrollArea, { passive: true });
      elem.addEventListener("wheel", updateScrollArea, { passive: true });
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
            className={classes(styles.scroll_btn, styles.btn_left, "scroll_btn")}
            onClick={() => performScroll("left")}
            aria-label="Scroll Left"
            title="Scroll Left"
            aria-controls={id}
          >
            <ChevronLeftIcon className={styles.scroll_icon} />
          </button>
        ) : null
      }
      <div
        {...props}
        id={id}
        className={classes("scroll_invisible", styles.container, className)}
        ref={listRef}
      >
        {children}
      </div>
      {
        hasXScroll[1] ? (
          <button
            className={classes(styles.scroll_btn, styles.btn_right, "scroll_btn")}
            onClick={() => performScroll("right")}
            aria-label="Scroll Right"
            title="Scroll Right"
            aria-controls={id}
          >
            <ChevronRightIcon className={styles.scroll_icon} />
          </button>
        ) : null
      }
    </>
  );
};

export default Scrollable;
