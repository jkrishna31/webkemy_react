import { EventHandler, useEffect } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

export default function useKey(
  onKey: EventHandler<any>,
  filterKeys: string[],
  type: "keydown" | "keyup" | "keypress" = "keydown",
  options?: boolean | AddEventListenerOptions,
) {
  // todo: handle explicit removal of listener

  useEffect(() => {
    if (hasDOM()) {
      function keyDownHandler(e: KeyboardEvent) {
        if (filterKeys.includes(e.key)) {
          onKey(e);
        }
      };
      window.addEventListener(type, keyDownHandler, options);
      return () => {
        window.removeEventListener(type, keyDownHandler);
      };
    }
  }, [filterKeys, onKey, options, type]);
}
