"use client";

import React, { ComponentProps, useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useKey } from "@/lib/hooks/useKey";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
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
  closeOnOutsideClick?: boolean;
  lockScroll?: boolean;
  offset?: number;
  usePortal?: boolean;
  useTransform?: boolean;
  closeOnEsc?: boolean | "capture";
  adjustOnScroll?: boolean;
}

const Popover = ({
  anchor,
  placement = "bottom",
  alignment = "center",
  offset = 8,
  isTooltip,
  className, children,
  closeOnScroll,
  closeOnOutsideClick,
  lockScroll,
  adjustOnScroll,
  onClose,
  usePortal = true,
  useTransform = true,
  ref,
  closeOnEsc = true,
  ...props
}: PopoverProps) => {
  const popoverId = useId();

  const popoverRef = useRef<HTMLDivElement>(null);

  const { lock, unlock } = useScrollLock();

  const updatePopoverLayout = useCallback(() => {
    const elem = popoverRef.current;
    if (!elem || !anchor) return;
    requestAnimationFrame(() => {
      const anchorBoundingRect = anchor?.getBoundingClientRect();
      const popoverBoundingRect = (elem as HTMLDivElement).getBoundingClientRect();
      const { top, left } = calculateRenderPosition(
        anchorBoundingRect, popoverBoundingRect,
        { placement, alignment, offset },
      );
      (elem as HTMLElement).style.top = "0px";
      (elem as HTMLElement).style.left = "0px";
      if (!!(elem as HTMLElement).style.transform) {
        (elem as HTMLElement).style.transition = "transform .2s ease, left .2s ease, top .2s ease";
      }
      if (useTransform) {
        (elem as HTMLElement).style.transform = `translate3d(${left}px, ${top}px, 0)`;
      } else {
        // will use this for when having nested popover (not using portal), since transform affects the children fixed elements 
        (elem as HTMLElement).style.left = `${left}px`;
        (elem as HTMLElement).style.top = `${top}px`;
      }
    });
  }, [alignment, anchor, offset, placement, useTransform]);

  useLayoutEffect(updatePopoverLayout, [updatePopoverLayout]);

  useEffect(() => {
    const handleResize = () => requestAnimationFrame(updatePopoverLayout);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePopoverLayout]);

  useKey(closeOnEsc ? () => {
    onClose?.();
  } : undefined, ["Escape"], "keydown", closeOnEsc === "capture");

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
        if (adjustOnScroll) {
          updatePopoverLayout();
        }
      };
      window.addEventListener("scroll", handleScroll, { once: isTooltip || closeOnScroll, passive: true, capture: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [adjustOnScroll, anchor, closeOnScroll, isTooltip, onClose, updatePopoverLayout]);

  useEffect(() => {
    if (anchor && closeOnOutsideClick) {
      const handleClick = (e: MouseEvent) => {
        const composedPath = e.composedPath();

        if (!(popoverRef.current && composedPath.includes(popoverRef.current)) && !composedPath.includes(anchor)) {
          onClose?.();
        }
      };
      window.addEventListener("click", handleClick, { capture: true });
      return () => {
        window.removeEventListener("click", handleClick, { capture: true });
      };
    }
  }, [anchor, closeOnOutsideClick, lock, onClose, popoverId, unlock]);

  return usePortal
    ? createPortal((
      <div
        ref={mergeRefs(popoverRef, ref)}
        className={classes(styles.wrapper, !useTransform && styles.animate, className)}
        data-id={popoverId}
        data-popover={isTooltip ? "tooltip" : ""}
      >
        {children}
      </div>
    ), document.body)
    : (
      <div
        ref={mergeRefs(popoverRef, ref)}
        className={classes(styles.wrapper, !useTransform && styles.animate, className)}
        data-id={popoverId}
        data-popover={isTooltip ? "tooltip" : ""}
      >
        {children}
      </div>
    );
};

export default Popover;
