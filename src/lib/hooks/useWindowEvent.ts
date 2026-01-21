import { useEffect } from "react";

export function useWindoEvent<T extends keyof WindowEventMap>(
  type: T,
  listener: (event: WindowEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, listener);
    return () => window.removeEventListener(type, listener, options);
  }, [listener, options, type]);
}
