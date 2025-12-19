"use client";

import React, { ComponentProps, useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { edges } from "@/constants/general.const";
import { useKey, useScrollLock } from "@/lib/hooks";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

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
  closeOnEsc?: boolean | "capture"
}

const getLocation = (
  anchorBoundingRect: DOMRect,
  targetBoundingRect: DOMRect,
  options: {
    placement: Exclude<Position, "center">
    alignment: Position
    offset: number
    overlap?: boolean
  }
) => {
  const { placement, alignment, offset = 8, overlap } = options;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const position: {
    top: number;
    left: number;
    bottom?: number;
    right?: number;
    maxHeight?: number | string;
    maxWidth?: number | string;
  } = {
    top: offset,
    left: offset,
  };

  if (!placement || placement === "left" || placement === "right") {
    const _leftSpace = anchorBoundingRect.x + (overlap ? anchorBoundingRect.width : 0) - offset - (overlap ? 0 : offset);
    const _rightSpace = vw - anchorBoundingRect.x - (overlap ? 0 : anchorBoundingRect.width) - offset - (overlap ? 0 : offset);
    const _topSpace = anchorBoundingRect.y - offset;
    const _bottomSpace = vh - anchorBoundingRect.y - anchorBoundingRect.height - offset;

    const isCenterAlignPossible = ((_topSpace + anchorBoundingRect.height / 2) >= (targetBoundingRect.height / 2 + offset))
      && ((_bottomSpace + anchorBoundingRect.height / 2) >= (targetBoundingRect.height / 2 + offset));
    const isTopAlignPossible = _bottomSpace >= (targetBoundingRect.height + offset);
    const isBottomAlignPossible = _topSpace >= (targetBoundingRect.height + offset);

    const finalAlignment = (alignment === "center" && isCenterAlignPossible ? "center" : null)
      || (alignment === "top" && isTopAlignPossible ? "top" : null)
      || (alignment === "bottom" && isBottomAlignPossible ? "bottom" : null)
      || (isCenterAlignPossible ? "center" : null)
      || (isBottomAlignPossible ? "bottom" : null)
      || (isTopAlignPossible ? "top" : null);

    switch (finalAlignment) {
      case "top": {
        position.top = anchorBoundingRect.y;
        break;
      }
      case "center": {
        position.top = anchorBoundingRect.y + anchorBoundingRect.height / 2 - targetBoundingRect.height / 2;
        break;
      }
      case "bottom": {
        position.top = anchorBoundingRect.y + anchorBoundingRect.height - targetBoundingRect.height;
        break;
      }
      default: {
        position.top = offset;
        position.maxHeight = `calc(100vh - ${offset * 2}`;
      }
    }

    const isLeftPlacementPossible = _leftSpace >= targetBoundingRect.width;
    const isRightPlacementPossible = _rightSpace >= targetBoundingRect.width;

    const finalPlacement = (placement === "left" && isLeftPlacementPossible ? "left" : null)
      || (placement === "right" && isRightPlacementPossible ? "right" : null)
      || (isLeftPlacementPossible ? "left" : null)
      || (isRightPlacementPossible ? "right" : null);

    switch (finalPlacement) {
      case "left": {
        position.left = anchorBoundingRect.x - offset - targetBoundingRect.width;
        break;
      }
      case "right": {
        position.left = anchorBoundingRect.x + anchorBoundingRect.width + offset;
        break;
      }
      default: {
        position.left = offset;
        position.maxWidth = `calc(100vw - ${offset * 2})`;
      }
    }

    return position;
  }

  if (!placement || placement === "top" || placement === "bottom") {
    const _topSpace = anchorBoundingRect.y + (overlap ? anchorBoundingRect.height : 0) - offset - (overlap ? 0 : offset);
    const _bottomSpace = vh - anchorBoundingRect.y - (overlap ? 0 : anchorBoundingRect.height) - offset - (overlap ? 0 : offset);
    const _leftSpace = anchorBoundingRect.x - offset;
    const _rightSpace = vw - anchorBoundingRect.x - anchorBoundingRect.width - offset;

    const isCenterAlignPossible = ((_leftSpace + anchorBoundingRect.width / 2) >= (targetBoundingRect.width / 2 + offset)) && ((_rightSpace + anchorBoundingRect.width / 2) >= (targetBoundingRect.width / 2 + offset));
    const isLeftAlignPossible = _rightSpace >= (targetBoundingRect.width + offset);
    const isRightAlignPossible = _leftSpace >= (targetBoundingRect.width + offset);

    const finalAlignment = (alignment === "center" && isCenterAlignPossible ? "center" : null)
      || (alignment === "left" && isLeftAlignPossible ? "left" : null)
      || (alignment === "right" && isRightAlignPossible ? "right" : null)
      || (isCenterAlignPossible ? "center" : null)
      || (isLeftAlignPossible ? "left" : null)
      || (isRightAlignPossible ? "right" : null);

    switch (finalAlignment) {
      case "left": {
        position.left = anchorBoundingRect.x;
        break;
      }
      case "center": {
        position.left = anchorBoundingRect.x + anchorBoundingRect.width / 2 - targetBoundingRect.width / 2;
        break;
      }
      case "right": {
        position.left = anchorBoundingRect.x + anchorBoundingRect.width - targetBoundingRect.width;
        break;
      }
      default: {
        position.left = offset;
        position.maxWidth = `calc(100vw - ${offset * 2})`;
      }
    }

    const isTopPlacementPossible = _topSpace >= targetBoundingRect.height;
    const isBottomPlacementPossible = _bottomSpace >= targetBoundingRect.height;

    const finalPlacement = (placement === "top" && isTopPlacementPossible ? "top" : null)
      || (placement === "bottom" && isBottomPlacementPossible ? "bottom" : null)
      || (isTopPlacementPossible ? "top" : null)
      || (isBottomPlacementPossible ? "bottom" : null);

    switch (finalPlacement) {
      case "top": {
        position.top = anchorBoundingRect.y - offset - targetBoundingRect.height;
        break;
      }
      case "bottom": {
        position.top = anchorBoundingRect.y + anchorBoundingRect.height + offset;
        break;
      }
      default: {
        position.top = offset;
        position.maxHeight = `calc(100vh - ${offset * 2})`;
      }
    }

    return position;
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
      const { top, left, maxWidth } = getLocation(
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
