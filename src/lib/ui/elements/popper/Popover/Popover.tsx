"use client";

import React, { ComponentProps, useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { edges } from "@/constants/general.const";
import { useKey, useScrollLock } from "@/lib/hooks";

import styles from "./Popover.module.scss";

export type Position = typeof edges[keyof typeof edges] | "center";

export interface PopoverProps extends ComponentProps<"div"> {
  anchor: HTMLElement
  placement?: Exclude<Position, "center">
  alignment?: Position
  isTooltip?: boolean
  onClose?: () => void
  closeOnScroll?: boolean
  closeOnOutsideClick?: boolean
  lockScroll?: boolean
  offset?: number
  usePortal?: boolean
  useTransform?: boolean
}

const getLocation = (
  anchorBoundingRect: DOMRect,
  targetBoundingRect: DOMRect,
  options: {
    placement: Exclude<Position, "center">
    alignment: Position
    offset: number
  }
) => {
  const { placement, alignment, offset = 8 } = options;

  const leftSpace = anchorBoundingRect.x;
  const rightSpace = window.innerWidth - (anchorBoundingRect.x + anchorBoundingRect.width);
  const topSpace = anchorBoundingRect.y;
  const bottomSpace = window.innerHeight - (anchorBoundingRect.y + anchorBoundingRect.height);

  const hasEnoughLeftSpace = leftSpace >= targetBoundingRect.width / 2;
  const hasEnoughRightSpace = rightSpace >= targetBoundingRect.width / 2;

  const position: { [key: string]: number } = {};

  if (hasEnoughLeftSpace && hasEnoughRightSpace) {
    position.left = (leftSpace + anchorBoundingRect.width / 2) - targetBoundingRect.width / 2;
  } else if (!hasEnoughLeftSpace) {
    position.left = 20;
  } else {
    position.left = window.innerWidth - 20 - targetBoundingRect.width;
  }

  if (topSpace > bottomSpace) {
    position.top = (topSpace) - targetBoundingRect.height - offset;
  } else {
    position.top = (anchorBoundingRect.y + anchorBoundingRect.height) + offset;
  }

  return position;
};

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
  ...props
}: PopoverProps) => {
  const popoverId = useId();

  const popoverRef = useRef<HTMLDivElement>(null);

  const { lock, unlock } = useScrollLock();

  useKey(() => {
    onClose?.();
  }, ["Escape"]);

  useLayoutEffect(() => {
    const anchorBoundingRect = anchor.getBoundingClientRect();
    const popoverBoundingRect = (popoverRef.current as HTMLDivElement).getBoundingClientRect();
    const { top, left } = getLocation(
      anchorBoundingRect, popoverBoundingRect,
      {
        placement, alignment, offset,
      }
    );
    (popoverRef.current as HTMLElement).style.top = "0px";
    (popoverRef.current as HTMLElement).style.left = "0px";
    if (!!(popoverRef.current as HTMLElement).style.transform) {
      (popoverRef.current as HTMLElement).style.transition = "transform .2s ease, left .2s ease, top .2s ease";
    }
    if (useTransform) {
      (popoverRef.current as HTMLElement).style.transform = `translate3d(${left}px, ${top}px, 0)`;
    } else {
      // will use this for when having nested popover (not using portal), since transform affects the children fixed elements 
      (popoverRef.current as HTMLElement).style.left = `${left}px`;
      (popoverRef.current as HTMLElement).style.top = `${top}px`;
    }
  }, [alignment, anchor, isTooltip, offset, placement, useTransform]);

  useEffect(() => {
    if (anchor && lockScroll) {
      lock();
      return unlock;
    }
  }, [anchor, lock, lockScroll, unlock]);

  useEffect(() => {
    if (anchor && (isTooltip || closeOnScroll)) {
      const handleScroll = () => {
        onClose?.();
      };
      // close on esc
      // add scoll listener on all scrollable parent
      window.addEventListener("scroll", handleScroll, { once: true, passive: true });
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
        ref={popoverRef}
        className={`${styles.wrapper} ${className}`}
        data-id={popoverId}
        data-popover={isTooltip ? "tooltip" : ""}
      >
        {children}
      </div>
    ), document.body)
    : (
      <div
        ref={popoverRef}
        className={`${styles.wrapper} ${className}`}
        data-id={popoverId}
        data-popover={isTooltip ? "tooltip" : ""}
      >
        {children}
      </div>
    );
};

export default Popover;
