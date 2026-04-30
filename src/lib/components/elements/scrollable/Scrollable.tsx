"use client";

import { ComponentProps, CSSProperties, useEffect, useRef, useState } from "react";

import { useWindowSize } from "@/data/stores";
import { useThrottledCallback } from "@/lib/hooks/useThrottledCallback";
import ChevronLeftIcon from "@/lib/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/svgs/icons/ChevronRightIcon";
import { hasDOM } from "@/lib/utils/dom";
import { mergeRefs } from "@/lib/utils/react";
import { classes } from "@/lib/utils/style";

import styles from "./Scrollable.module.scss";

export interface ScrollableProps extends ComponentProps<"div"> {
  vertical?: boolean
  scrollStep?: number
  withControls?: boolean
}

export const Scrollable = ({
  children,
  className,
  id,
  vertical,
  scrollStep = 100,
  ref,
  withControls = true,
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

  useEffect(() => {
    const elem = listRef.current;
    // TODO: add only if has scrollable area (and listen for resize)
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
    <div
      className={classes(
        styles.wrapper,
        !withControls && styles.hint,
        !withControls && hasXScroll[0] && styles.has_left,
        !withControls && hasXScroll[1] && styles.has_right,
        className
      )}
    // style={{
    //   "--left-hint": `${hasXScroll[0] ? 4 : 0}rem`,
    //   "--right-hint": `${hasXScroll[1] ? 4 : 0}rem`,
    // } as CSSProperties}
    >
      {
        !!withControls && (
          <button
            className={classes(styles.scroll_btn, styles.btn_left, hasXScroll[0] && styles.visible, "scroll_btn")}
            onClick={() => performScroll("left")}
            aria-label="Scroll Left"
            title="Scroll Left"
            aria-controls={id}
          >
            <ChevronLeftIcon className={styles.scroll_icon} />
          </button>
        )
      }
      <div
        {...props}
        id={id}
        className={classes("scroll_invisible", styles.container)}
        ref={mergeRefs(listRef, ref)}
      >
        {children}
      </div>
      {
        !!withControls && (
          <button
            className={classes(styles.scroll_btn, styles.btn_right, hasXScroll[1] && styles.visible, "scroll_btn")}
            onClick={() => performScroll("right")}
            aria-label="Scroll Right"
            title="Scroll Right"
            aria-controls={id}
          >
            <ChevronRightIcon className={styles.scroll_icon} />
          </button>
        )
      }
    </div>
  );
};
