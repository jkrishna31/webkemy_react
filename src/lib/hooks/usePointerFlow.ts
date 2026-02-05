import { RefObject, useEffect } from "react";

export function usePointerFlow(
  target: RefObject<HTMLElement | null>,
  onFlow: (event: PointerEvent) => void,
  onStart?: (event: PointerEvent) => void,
  onEnd?: (event?: PointerEvent) => void,
) {
  useEffect(() => {
    const elem = target.current;
    if (!elem) return;

    const handlePointerMove = (e: PointerEvent) => {
      onFlow(e);
    };

    const handlePointerDown = (e: PointerEvent) => {
      // adding on the window, by default, so that when we move out of the target area, we will still be able to listen to event
      // (e.target as HTMLElement).setPointerCapture(e.pointerId);
      window.addEventListener("pointermove", handlePointerMove);
      onStart?.(e);
    };

    const handlePointerUp = (e?: PointerEvent) => {
      // if (e) (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", handlePointerMove);
      onEnd?.(e);
    };

    elem.addEventListener("pointerdown", handlePointerDown);
    // adding to the window, by default, so that we will be able to listen to pointer up, even if are out of the target area while pointer move
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      handlePointerUp();
      elem.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [onEnd, onFlow, onStart, target]);
}
