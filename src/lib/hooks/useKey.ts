import { useEffect, useEffectEvent } from "react";

import { hasDOM } from "@/lib/utils/dom";

export function useKey(
  onKey: ((event: KeyboardEvent) => void) | undefined,
  filterKeys?: string[],
  type: "keydown" | "keyup" | "keypress" = "keydown",
  options?: boolean | AddEventListenerOptions,
) {
  // TODO: handle explicit removal of listener

  const callback = useEffectEvent((e: KeyboardEvent) => {
    if (!filterKeys?.length) onKey?.(e);
    else if (filterKeys.includes(e.key) || filterKeys.includes(e.code)) onKey?.(e);
  });

  useEffect(() => {
    if (hasDOM()) {
      window.addEventListener(type, callback, options);
      return () => {
        window.removeEventListener(type, callback, options);
      };
    }
  }, [options, type]);
}
