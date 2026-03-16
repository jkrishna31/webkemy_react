"use client";

import { ComponentProps, useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { hasDOM } from "@/lib/utils/client.utils";
import { calculateRenderPosition, LayoutPosition } from "@/lib/utils/dom.utils";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Popover.module.scss";

export interface PopoverProps extends ComponentProps<"div"> {
  anchor?: Element | Selection;
  coords?: number[];
  placement?: Exclude<LayoutPosition, "center">;
  alignment?: LayoutPosition;
  isTooltip?: boolean;
  onClose?: (e?: Event) => void;
  closeOnScroll?: boolean;
  closeOnOutsideClick?: boolean | "capture";
  lockScroll?: boolean;
  anchorMargin?: number;
  usePortal?: boolean;
  useTransform?: boolean;
  closeOnEsc?: boolean | "capture";
  adjustOnScroll?: boolean;
  overlap?: boolean;
  trapFocus?: boolean;
  animation?: "fade" | "slide";
}

const Popover = ({
  anchor,
  coords,
  placement = "bottom",
  alignment = "center",
  anchorMargin = 8,
  isTooltip,
  className,
  children,
  closeOnScroll,
  closeOnOutsideClick = true,
  closeOnEsc = "capture",
  lockScroll,
  adjustOnScroll = true,
  onClose,
  usePortal = true,
  useTransform = true,
  ref,
  overlap,
  trapFocus = true,
  animation = "fade",
  ...props
}: PopoverProps) => {
  const popoverId = useId();

  const popoverRef = useRef<HTMLDivElement>(null);
  const prevActiveElem = useRef<Element>(null);

  const { lock, unlock } = useScrollLock();
  const isMounted = useMounted();

  const updatePopoverLayout = useCallback(() => {
    const elem = popoverRef.current;
    if (!elem || !anchor) return;

    let anchorBoundingRect: DOMRect | null = null;

    if (anchor instanceof Element && coords) {
      anchorBoundingRect = {
        x: coords[0],
        y: coords[1],
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
      } as DOMRect;
    } else if (anchor instanceof Element) {
      anchorBoundingRect = anchor?.getBoundingClientRect();
    } else if (anchor instanceof Selection) {
      const range = anchor.getRangeAt(0);
      const rangeRect = range.getClientRects()[0] || range.getBoundingClientRect();
      if (rangeRect.x || rangeRect.y) {
        anchorBoundingRect = rangeRect;
      } else if (range.startContainer instanceof HTMLElement) {
        anchorBoundingRect = range.startContainer.getBoundingClientRect();
      }
    } else {
      // TODO: no need to check for close on scroll with anchor.target & only check for anchor/anchor.anchorNode/anchor.focusNode
      anchorBoundingRect = {
        x: (anchor as MouseEvent).pageX,
        y: (anchor as MouseEvent).pageY,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
      } as DOMRect;
    }
    if (!anchorBoundingRect) return;

    elem.style.setProperty("--popover-min-width", `${anchorBoundingRect.width}px`);

    requestAnimationFrame(() => {
      const popoverBoundingRect = (elem as HTMLDivElement).getBoundingClientRect();

      const { top, left, maxHeight, maxWidth } = calculateRenderPosition(
        anchorBoundingRect, popoverBoundingRect,
        { placement, alignment, offset: anchorMargin, overlap },
      );

      if (maxHeight) elem.style.setProperty("--popover-max-height", String(maxHeight));
      if (maxWidth) elem.style.setProperty("--popover-max-width", String(maxWidth));

      requestAnimationFrame(() => {
        if (useTransform) {
          elem.style.setProperty("--popover-left", "0");
          elem.style.setProperty("--popover-top", "0");
          elem.style.setProperty("--popover-left-shift", `${Math.floor(left)}px`);
          elem.style.setProperty("--popover-top-shift", `${Math.floor(top)}px`);
        } else {
          // will use this for when having nested popover (not using portal), since transform affects the children fixed elements 
          elem.style.setProperty("--popover-left", `${left}px`);
          elem.style.setProperty("--popover-top", `${top}px`);
        }
        requestAnimationFrame(() => elem.style.setProperty("--popover-transition-dur", ".2s"));
      });
    });
  }, [alignment, anchor, anchorMargin, coords, overlap, placement, useTransform]);

  useFocusTrap(popoverRef, trapFocus && !isTooltip);

  useKey(closeOnEsc ? (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    onClose?.(e);
    if (prevActiveElem.current) (prevActiveElem.current as HTMLElement).focus();
  } : undefined, ["Escape"], "keydown", closeOnEsc === "capture");

  useLayoutEffect(() => {
    const elem = popoverRef.current;
    if (!anchor || !elem) return;
    prevActiveElem.current = document.activeElement;
    if (
      hasDOM()
      && "ResizeObserver" in window
    ) {
      const observer = new ResizeObserver(updatePopoverLayout);
      observer.observe(elem);
      if (anchor instanceof Element) observer.observe(anchor);
      observer.observe(window.document.body);
      return () => {
        observer.disconnect();
      };
    } else {
      updatePopoverLayout();
      window.addEventListener("resize", updatePopoverLayout, { passive: true, capture: true });
      return () => {
        window.removeEventListener("resize", updatePopoverLayout, true);
      };
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
        if (isTooltip || closeOnScroll) {
          if (
            (anchor instanceof Element && (e.target as Element).contains(anchor))
            || (
              anchor instanceof Selection && (
                (e.target as Element).contains(anchor.anchorNode) || (e.target as Element).contains(anchor.focusNode)
              )
            )
          ) {
            onClose?.(e);
          }
        }
        if (
          adjustOnScroll
          &&
          !popoverRef.current?.contains(e.target as Element)
        ) {
          updatePopoverLayout();
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
      return () => window.removeEventListener("scroll", handleScroll, true);
    }
  }, [adjustOnScroll, anchor, closeOnScroll, isTooltip, onClose, updatePopoverLayout]);

  useEffect(() => {
    const elem = popoverRef.current;
    if (!elem || !anchor || !closeOnOutsideClick || !isMounted) return;

    const handleClick = (e: PointerEvent) => {
      const popoverRect = elem.getBoundingClientRect();

      if (e.buttons >= 2) return;

      if (
        popoverRect.x <= e.clientX && (popoverRect.x + popoverRect.width) >= e.clientX
        &&
        popoverRect.y <= e.clientY && (popoverRect.y + popoverRect.height) >= e.clientY
      ) return;

      if (!e.pointerType) {
        const isContained = elem.contains(document.activeElement);
        if (prevActiveElem.current && !isContained) (prevActiveElem.current as HTMLElement).focus();
        return;
        // TODO: (preserve only if closes [also check if another popover directly gets enabled])
      }

      if (elem.contains(e.target as Node) || (anchor instanceof Selection && elem.contains(document.activeElement))) return;

      onClose?.(e);
    };

    window.addEventListener("pointerdown", handleClick, closeOnOutsideClick === "capture");
    return () => {
      window.removeEventListener("pointerdown", handleClick, closeOnOutsideClick === "capture");
    };
  }, [anchor, closeOnOutsideClick, isMounted, onClose]);

  return usePortal
    ? createPortal((
      <div
        ref={mergeRefs(popoverRef, ref)}
        className={classes(styles.popover, styles[animation], className)}
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
        className={classes(styles.popover, styles[animation], className)}
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
