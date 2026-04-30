import { RefObject, useEffect, useEffectEvent } from "react";

import { isMobileDevice } from "@/lib/utils/client";

export type Options = {
  threshold?: number;
  tolerance?: number;
  onStart?: (e: TouchEvent | PointerEvent) => void;
  onMove?: (e: TouchEvent | PointerEvent, startCoords?: number[]) => void;
  onEnd?: (e: TouchEvent | PointerEvent) => void;
};

export function useLongPress(
  ref: RefObject<HTMLElement | null>,
  options?: Options,
) {
  const { threshold = 500, tolerance = 6, onStart, onMove, onEnd } = options ?? {};

  const _onStart = useEffectEvent((e: TouchEvent | PointerEvent) => onStart?.(e));
  const _onMove = useEffectEvent((e: TouchEvent | PointerEvent, startCoords?: number[]) => onMove?.(e, startCoords));
  const _onEnd = useEffectEvent((e: TouchEvent | PointerEvent) => onEnd?.(e));

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout;
    let startCoords: number[] | undefined;
    let isPressed: boolean;

    if (isMobileDevice()) {
      const trigger = (e: TouchEvent) => {
        clearTimeout(timeoutId);
        startCoords = [e.touches[0].clientX, e.touches[0].clientY];
        timeoutId = setTimeout(() => {
          isPressed = true;
          _onStart(e);
        }, threshold);
      };

      const handleTouchEnd = (e: TouchEvent) => {
        isPressed = false;
        clearTimeout(timeoutId);
        _onEnd(e);
        elem.removeEventListener("touchmove", handleTouchMove);
        elem.removeEventListener("touchend", handleTouchEnd);
        elem.removeEventListener("touchcancel", handleTouchEnd);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!startCoords?.length) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startCoords[0];
        const dy = touch.clientY - startCoords[1];
        const d = Math.sqrt(dx * dx + dy * dy);
        if (!isPressed && d > tolerance) handleTouchEnd(e);
        else if (isPressed) _onMove(e, startCoords);
      };

      const handleTouchStart = (e: TouchEvent) => {
        trigger(e);
        elem.addEventListener("touchmove", handleTouchMove, { signal: abortController.signal });
        elem.addEventListener("touchend", handleTouchEnd, { signal: abortController.signal });
        // elem.addEventListener("touchcancel", handleTouchEnd, { signal: abortController.signal });
      };

      elem.addEventListener("touchstart", handleTouchStart, { signal: abortController.signal });
    } else {
      const trigger = (e: PointerEvent) => {
        isPressed = false;
        clearTimeout(timeoutId);
        startCoords = [e.clientX, e.clientY];
        timeoutId = setTimeout(() => {
          isPressed = true;
          _onStart(e);
        }, 0);
      };

      const handlePointerCancel = (e: PointerEvent) => {
        isPressed = false;
        clearTimeout(timeoutId);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        _onEnd(e);
        elem.removeEventListener("pointermove", handlePointerMove);
        elem.removeEventListener("pointerup", handlePointerCancel);
        elem.removeEventListener("pointercancel", handlePointerCancel);
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!startCoords?.length) return;
        const dx = e.clientX - startCoords[0];
        const dy = e.clientY - startCoords[1];
        const d = Math.sqrt(dx * dx + dy * dy);
        if (!isPressed && d > tolerance) handlePointerCancel(e);
        else if (isPressed) _onMove(e, startCoords);
      };

      const handlePointerDown = (e: PointerEvent) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        trigger(e);
        elem.addEventListener("pointermove", handlePointerMove, { signal: abortController.signal });
        elem.addEventListener("pointerup", handlePointerCancel, { signal: abortController.signal });
        elem.addEventListener("pointercancel", handlePointerCancel, { signal: abortController.signal });
      };

      elem.addEventListener("pointerdown", handlePointerDown, { signal: abortController.signal });
    }

    return () => {
      isPressed = false;
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, [ref, threshold, tolerance]);
}
