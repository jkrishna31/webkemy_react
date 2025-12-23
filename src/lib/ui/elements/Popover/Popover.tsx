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
  anchor: HTMLElement
  placement?: Exclude<LayoutPosition, "center">
  alignment?: LayoutPosition
  isTooltip?: boolean
  onClose?: () => void
  closeOnScroll?: boolean
  closeOnOutsideClick?: boolean
  lockScroll?: boolean
  offset?: number
  usePortal?: boolean
  useTransform?: boolean
  closeOnEsc?: boolean | "capture"
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

  const layoutPopover = useCallback(() => {
    const elem = popoverRef.current;
    if (!elem) return;
    requestAnimationFrame(() => {
      const anchorBoundingRect = anchor.getBoundingClientRect();
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

  useLayoutEffect(layoutPopover, [layoutPopover]);

  // TODO: re-position on resize
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        layoutPopover();
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layoutPopover]);

  useKey(closeOnEsc ? (e) => {
    onClose?.();
  } : undefined, ["Escape"], "keydown", closeOnEsc === "capture");

  useEffect(() => {
    if (anchor && lockScroll) {
      lock();
      return unlock;
    }
  }, [anchor, lock, lockScroll, unlock]);

  useEffect(() => {
    if (anchor && (isTooltip || closeOnScroll)) {
      const handleScroll = (e: Event) => {
        if ((e.target as HTMLElement).contains(anchor)) {
          onClose?.();
        }
      };
      window.addEventListener("scroll", handleScroll, { once: true, passive: true, capture: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [anchor, closeOnScroll, isTooltip, onClose]);

  useEffect(() => {
    if (anchor && closeOnOutsideClick) {
      const handleClick = (e: MouseEvent) => {
        const composedPath = e.composedPath();

        if (!(popoverRef.current && composedPath.includes(popoverRef.current))) {
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
