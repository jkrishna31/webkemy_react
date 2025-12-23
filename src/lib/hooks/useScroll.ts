"use client";

import { RefObject, useCallback, useEffect, useMemo, useState } from "react";

import { throttle } from "@/lib/utils/general.utils";

export interface UseScrollProps {
  target: RefObject<HTMLElement | null>
  margin?: number
  delay?: number
  onScroll?: any
  initialState?: boolean
}

export function useScroll({
  target, margin = 0, delay = 300, onScroll, initialState,
}: UseScrollProps, options?: boolean | AddEventListenerOptions) {
  const [isOnBoundary, setIsOnBoundary] = useState(initialState);

  const throttledScrollHandler = useMemo(() => throttle((e?: any) => {
    if (target.current) {
      const currScroll = target.current.scrollTop + target.current.clientHeight;
      const isBottom = (target.current.scrollHeight - currScroll) <= margin;
      if (isBottom !== isOnBoundary) {
        setIsOnBoundary(isBottom);
      }
      onScroll?.(e);
    }
  }, delay), [delay, target, margin, isOnBoundary, onScroll]);
  // works with target, but not with target.current because ref is a stable object and ref.current is not reactive, and the important thing is that useEffect runs after the dom is mounted, so that time we will have ref, but if we use ref.current we lost the stable ref and as earlier mentioned, it's not a reactive so it won't cause rerender

  const handleScroll = useCallback(throttledScrollHandler, [throttledScrollHandler]);

  useEffect(() => {
    if (target.current) {
      const elem = target.current;
      elem.addEventListener("scroll", handleScroll, options);
      return () => {
        elem.removeEventListener("scroll", handleScroll, options);
      };
    }
  }, [handleScroll, options, target]);

  return { isOnBoundary, setIsOnBoundary, handleScroll };
}
