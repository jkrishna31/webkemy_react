import { RefObject, useEffect } from "react";

export default function usePointerFlow(
  target: RefObject<HTMLElement | null>,
  onFlow: (event: PointerEvent) => void,
  onStart?: (event: PointerEvent) => void,
  onEnd?: (event?: PointerEvent) => void,
) {
  useEffect(() => {
    if (target.current) {
      const elem = target.current;

      const handlePointerMove = (e: PointerEvent) => {
        onFlow(e);
      };

      const handlePointerDown = (e: PointerEvent) => {
        // adding on the window, by default, so that when we move out of the target area, we will still be able to listen to event
        window.addEventListener("pointermove", handlePointerMove);
        onStart?.(e);
      };

      const handlePointerUp = (e?: PointerEvent) => {
        window.removeEventListener("pointermove", handlePointerMove);
        onEnd?.(e);
      };

      elem.addEventListener("pointerdown", handlePointerDown);
      // adding to the window, by default, so that we will be able to listen to pointer up, even if are out of the target area while pointer move
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        elem.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        handlePointerUp();
      };
    }
  }, [onEnd, onFlow, onStart, target]);
}
