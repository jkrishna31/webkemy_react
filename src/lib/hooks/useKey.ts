import { useEffect, useRef } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

export function useKey(
  onKey: ((event: KeyboardEvent) => void) | undefined,
  filterKeys: string[],
  type: "keydown" | "keyup" | "keypress" = "keydown",
  options?: boolean | AddEventListenerOptions,
) {
  // TODO: handle explicit removal of listener

  const cbRef = useRef(onKey);

  useEffect(() => {
    cbRef.current = onKey;
  }, [onKey]);

  useEffect(() => {
    if (hasDOM() && cbRef.current) {
      function keyDownHandler(e: KeyboardEvent) {
        if (!filterKeys?.length) cbRef.current?.(e);
        else if (filterKeys.includes(e.key) || filterKeys.includes(e.code)) cbRef.current?.(e);
      };
      window.addEventListener(type, keyDownHandler, options);
      return () => {
        window.removeEventListener(type, keyDownHandler, options);
      };
    }
  }, [filterKeys, options, type]);
}
