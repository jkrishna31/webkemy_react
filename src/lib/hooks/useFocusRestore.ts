import { useCallback, useRef } from "react";

export function useFocusRestore() {
  const ref = useRef<HTMLElement>(null);

  const onOpen = useCallback(() => {
    ref.current = document.activeElement as HTMLElement;
  }, []);

  const onClose = useCallback(() => {
    if (ref.current) {
      ref.current.focus({ preventScroll: true });
      ref.current = null;
    }
  }, []);

  return { onOpen, onClose };
}
