"use client";

import { RefObject, useCallback, useEffect, useRef } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

const useSwipe = (
  ref: RefObject<HTMLElement | null>,
  onSwipe: (a: "LEFT" | "RIGHT", b: "UP" | "DOWN", e: TouchEvent) => void,
  threshold = [0, 0],
  type: "HOZ" | "VRT" | "ALL" = "ALL",
) => {
  const startCoords = useRef([0, 0]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startCoords.current = [e.touches[0].clientX, e.touches[0].clientY];
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const endCoords = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    if (endCoords[0] === startCoords.current[0] && endCoords[1] === startCoords.current[1]) {
      return;
    }
    const dx = endCoords[0] - startCoords.current[0];
    const dy = endCoords[1] - startCoords.current[1];
    const xDir = dx < 0 ? "RIGHT" : "LEFT";
    const yDir = dy < 0 ? "DOWN" : "UP";
    if (onSwipe && Math.abs(dx) >= threshold[0] && Math.abs(dy) >= threshold[1]) {
      if (type === "HOZ" && Math.abs(dx) / 2 <= Math.abs(dy)) {
        return;
      } else if (type === "VRT") {
        return;
      } else if (type === "ALL") {
        return;
      }
      onSwipe(xDir, yDir, e);
    }
  }, [onSwipe, threshold, type]);

  useEffect(() => {
    const elem = ref?.current || document.body;
    if (hasDOM()) {
      elem.addEventListener("touchstart", handleTouchStart);
      elem.addEventListener("touchend", handleTouchEnd);
      return () => {
        elem.removeEventListener("touchstart", handleTouchStart);
        elem.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleTouchEnd, handleTouchStart, ref]);
};

export default useSwipe;
