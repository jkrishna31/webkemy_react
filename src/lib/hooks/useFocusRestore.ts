import { useRef } from "react";

export function useFocusRestore() {
  const ref = useRef<HTMLElement>(null);

  const onOpen = () => {
    ref.current = document.activeElement as HTMLElement;
  };

  const onClose = () => {
    if (ref.current) {
      ref.current.focus({ preventScroll: true });
      ref.current = null;
    }
  };

  return { onOpen, onClose };
}
