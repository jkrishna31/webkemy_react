"use client";

import React, { ComponentProps, useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { hasDOM } from "@/lib/utils/client.utils";
import { calculateRenderPosition, LayoutPosition } from "@/lib/utils/dom.utils";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Popover.module.scss";

export interface PopoverProps extends ComponentProps<"div"> {
  anchor?: HTMLElement;
  placement?: Exclude<LayoutPosition, "center">;
  alignment?: LayoutPosition;
  isTooltip?: boolean;
  onClose?: () => void;
  closeOnScroll?: boolean;
  closeOnOutsideClick?: boolean | "capture";
  lockScroll?: boolean;
  offset?: number;
  usePortal?: boolean;
  useTransform?: boolean;
  closeOnEsc?: boolean | "capture";
  adjustOnScroll?: boolean;
  overlap?: boolean;
  trapFocus?: boolean;
}

const Popover = ({
  anchor,
  placement = "bottom",
  alignment = "center",
  offset = 8,
  isTooltip,
  className, children,
  closeOnScroll,
  closeOnOutsideClick = "capture",
  closeOnEsc = "capture",
  lockScroll,
  adjustOnScroll = true,
  onClose,
  usePortal = true,
  useTransform = true,
  ref,
  overlap,
  trapFocus = true,
  ...props
}: PopoverProps) => {
  const popoverId = useId();

  const popoverRef = useRef<HTMLDivElement>(null);
  const prevActiveElem = useRef<Element>(null);

  const { lock, unlock } = useScrollLock();

  const updatePopoverLayout = useCallback(() => {
    const elem = popoverRef.current;
    if (!elem || !anchor) return;

    const anchorBoundingRect = anchor?.getBoundingClientRect();

    requestAnimationFrame(() => {
      elem.style.minWidth = `${anchorBoundingRect.width}px`;

      const popoverBoundingRect = (elem as HTMLDivElement).getBoundingClientRect();

      const { top, left, maxHeight, maxWidth } = calculateRenderPosition(
        anchorBoundingRect, popoverBoundingRect,
        { placement, alignment, offset, overlap },
      );

      const computedStyle = getComputedStyle(elem);

      if (maxHeight) elem.style.maxHeight = String(maxHeight);
      if (maxWidth) elem.style.maxWidth = String(maxWidth);

      if (computedStyle.transform !== "none") elem.style.transition = "transform .2s ease";

      requestAnimationFrame(() => {
        elem.style.setProperty("--popover-left", "0");
        elem.style.setProperty("--popover-top", "0");
        if (useTransform) {
          elem.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        } else {
          // will use this for when having nested popover (not using portal), since transform affects the children fixed elements 
          elem.style.left = `${left}px`;
          elem.style.top = `${top}px`;
        }
      });
    });
  }, [alignment, anchor, offset, overlap, placement, useTransform]);

  useFocusTrap(popoverRef, trapFocus && !isTooltip);

  useKey(closeOnEsc ? (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    onClose?.();
    if (prevActiveElem.current) (prevActiveElem.current as HTMLElement).focus();
  } : undefined, ["Escape"], "keydown", closeOnEsc === "capture");

  useLayoutEffect(() => {
    const elem = popoverRef.current;
    if (!anchor || !elem) return;
    updatePopoverLayout();
    prevActiveElem.current = document.activeElement;
    if (hasDOM() && "ResizeObserver" in window) {
      const observer = new ResizeObserver((e) => {
        updatePopoverLayout();
      });
      observer.observe(elem);
      observer.observe(anchor);
      observer.observe(window.document.body);
      return () => observer.disconnect();
    } else {
      window.addEventListener("resize", updatePopoverLayout, { passive: true, capture: true });
      return () => window.removeEventListener("resize", updatePopoverLayout, true);
    }
  }, [anchor, updatePopoverLayout]);

  useEffect(() => {
    if (anchor && lockScroll) {
      lock();
      return unlock;
    }
  }, [anchor, lock, lockScroll, unlock]);

  useEffect(() => {
    if (anchor && (isTooltip || closeOnScroll || adjustOnScroll)) {
      const handleScroll = (e: Event) => {
        if ((isTooltip || closeOnScroll) && (e.target as HTMLElement).contains(anchor)) {
          onClose?.();
        }
        if (adjustOnScroll && !popoverRef.current?.contains(e.target as HTMLElement)) {
          updatePopoverLayout();
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
      return () => window.removeEventListener("scroll", handleScroll, true);
    }
  }, [adjustOnScroll, anchor, closeOnScroll, isTooltip, onClose, updatePopoverLayout]);

  useEffect(() => {
    const elem = popoverRef.current;
    if (anchor && closeOnOutsideClick && elem) {
      const handleClick = (e: MouseEvent) => {
        const composedPath = e.composedPath();

        // console.log("=== detect outside ===", anchor, composedPath.includes(elem), composedPath.includes(anchor), elem?.contains(e.target as HTMLElement), elem.contains(e.target as HTMLElement), anchor.contains(e.target as HTMLElement));

        const isInsidePopover = composedPath.includes(elem) || elem?.contains(e.target as HTMLElement);

        // if (isInsidePopover) e.stopImmediatePropagation();
        if (isInsidePopover || composedPath.includes(anchor)) return;

        // e.stopPropagation();
        // e.stopImmediatePropagation();
        onClose?.();
        // console.log("--- on close ---", anchor, composedPath);
      };
      window.addEventListener("click", handleClick, { capture: closeOnOutsideClick === "capture" });
      return () => {
        window.removeEventListener("click", handleClick, { capture: closeOnOutsideClick === "capture" });
      };
    }
  }, [anchor, closeOnOutsideClick, lock, onClose, popoverId, unlock]);

  return usePortal
    ? createPortal((
      <div
        ref={mergeRefs(popoverRef, ref)}
        className={classes(styles.wrapper, className)}
        data-id={popoverId}
        data-popover={isTooltip ? "tooltip" : ""}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    ), document.body)
    : (
      <div
        ref={mergeRefs(popoverRef, ref)}
        className={classes(styles.wrapper, className)}
        data-id={popoverId}
        data-popover={isTooltip ? "tooltip" : ""}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    );
};

export default Popover;
