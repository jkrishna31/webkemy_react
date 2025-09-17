import { RefObject, useEffect } from "react";

import { FOCUS_SELECTOR, focusable, scopeTab, tabbable } from "@/lib/utils/tabbable.utils";

export default function useFocusTrap(ref: RefObject<HTMLElement | null>, active = true) {
  const focusNode = (node: HTMLElement) => {
    let focusElement: HTMLElement | null = node.querySelector("[data-autofocus]");

    if (!focusElement) {
      const children = Array.from<HTMLElement>(node.querySelectorAll(FOCUS_SELECTOR));
      focusElement = children.find(tabbable) || children.find(focusable) || null;
      if (!focusElement && focusable(node)) {
        focusElement = node;
      }
    }

    if (focusElement) {
      focusElement.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    if (ref.current) {
      setTimeout(() => focusNode(ref.current!));
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab(ref.current, event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active, ref]);
}
