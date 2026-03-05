import { RefObject, useEffect, useEffectEvent } from "react";

export type Options = {
  threshold?: number;
  tolerance?: number;
};

export function useLongPress(ref: RefObject<HTMLElement | null>, cb: (event: TouchEvent) => void, options?: Options) {
  const { threshold = 500, tolerance = 6 } = options ?? {};

  const _cb = useEffectEvent((e: TouchEvent) => cb(e));

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout;
    let startCoords = [0, 0];

    const trigger = (e: TouchEvent) => {
      clearTimeout(timeoutId);
      startCoords = [e.touches[0].clientX, e.touches[0].clientY];
      timeoutId = setTimeout(() => {
        _cb(e);
      }, threshold);
    };

    const handleTouchEnd = () => {
      clearTimeout(timeoutId);
      elem.removeEventListener("touchmove", handleTouchMove);
      elem.removeEventListener("touchend", handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startCoords[0];
      const dy = touch.clientY - startCoords[1];
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > tolerance) {
        handleTouchEnd();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      trigger(e);
      elem.addEventListener("touchmove", handleTouchMove, { signal: abortController.signal });
      elem.addEventListener("touchend", handleTouchEnd, { signal: abortController.signal });
    };

    elem.addEventListener("touchstart", handleTouchStart, { signal: abortController.signal });

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, [ref, threshold, tolerance]);
}
