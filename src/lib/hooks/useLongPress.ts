import { RefObject, useEffect, useEffectEvent } from "react";

export type Options = {
  threshold?: number;
};

export function useLongPress(ref: RefObject<HTMLElement | null>, cb: (event: TouchEvent) => void, options?: Options) {
  const { threshold = 500 } = options ?? {};

  const _cb = useEffectEvent((e: TouchEvent) => cb(e));

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout;

    const trigger = (e: TouchEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _cb(e);
      }, threshold);
    };

    const handleTouchEnd = () => {
      clearTimeout(timeoutId);
      elem.removeEventListener("touchend", handleTouchEnd);
    };

    const handleTouchStart = (e: TouchEvent) => {
      trigger(e);
      elem.addEventListener("touchend", handleTouchEnd, { signal: abortController.signal });
    };

    elem.addEventListener("touchstart", handleTouchStart, { signal: abortController.signal });

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, [ref, threshold]);
}
