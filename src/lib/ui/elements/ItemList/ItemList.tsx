import React, { ComponentProps, useEffect, useRef } from "react";

import { Keys } from "@/constants/keys.const";
import { useThrottledCallback } from "@/lib/hooks/useThrottledCallback";
import { isMobileDevice } from "@/lib/utils/client.utils";
import { findNextCandidate } from "@/lib/utils/dom.utils";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ItemList.module.scss";

export interface ItemListProps extends ComponentProps<"div"> {
  type?: "menu" | "option";
  highlight?: { index?: number; keyboard?: boolean };
  onHighlightChange?: (payload: { index?: number; keyboard?: boolean }) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, highlight?: number) => void;
}

const ItemList = ({
  type, highlight, onHighlightChange, onKeyDown,
  children, className, ref,
  ...restProps
}: ItemListProps) => {
  const _ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    const optionItem = (e.target as HTMLElement)?.closest("[role='option']") as HTMLElement;
    const isEnabled = optionItem?.getAttribute("disabled") !== "true" || optionItem?.getAttribute("aria-disabled") !== "true";
    const allItems = _ref.current?.querySelectorAll("[role='option']");
    const index = (optionItem && isEnabled) ? Array.prototype.indexOf.call(allItems, optionItem) : undefined;
    onHighlightChange?.({ index });
  }, 50);

  useEffect(() => {
    if (isMobileDevice()) return;
    const allItems = _ref.current?.querySelectorAll("[role='option']");
    const nextItemIdx = findNextCandidate(allItems);
    if (nextItemIdx != undefined) onHighlightChange?.({ index: nextItemIdx, keyboard: true });
  }, [onHighlightChange]);

  useEffect(() => {
    if (isMobileDevice() || !onHighlightChange) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let nextItemIdx;
      switch (e.key) {
        case Keys.ARROW_DOWN: {
          const allItems = _ref.current?.querySelectorAll("[role='option']");
          nextItemIdx = findNextCandidate(allItems, { current: highlight?.index });
          if (nextItemIdx != undefined) onHighlightChange({ index: nextItemIdx, keyboard: true });
          break;
        }
        case Keys.ARROW_UP: {
          const allItems = _ref.current?.querySelectorAll("[role='option']");
          nextItemIdx = findNextCandidate(allItems, { current: highlight?.index, dir: "prev" });
          if (nextItemIdx != undefined) onHighlightChange({ index: nextItemIdx, keyboard: true });
          break;
        }
      }
      onKeyDown?.(e as unknown as React.KeyboardEvent<HTMLDivElement>, nextItemIdx);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [highlight, onHighlightChange, onKeyDown]);

  useEffect(() => {
    const elem = _ref.current;
    if (isMobileDevice() || !elem || !onHighlightChange) return;
    elem.addEventListener("pointermove", handleMouseMove);
    return () => elem.removeEventListener("pointermove", handleMouseMove);
  }, [handleMouseMove, onHighlightChange]);

  useEffect(() => {
    if (!highlight?.keyboard) return;
    const elem = _ref.current;
    if (!elem) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const listElem = elem?.closest("[role='listbox']")?.parentElement;
        if (elem.scrollHeight > elem.clientHeight || (listElem && listElem.scrollHeight > listElem.clientHeight)) {
          const activeElem = elem.querySelector("[data-highlight='true']");
          if (activeElem) {
            const activeElemRect = activeElem.getBoundingClientRect();
            const containerRect = elem.getBoundingClientRect();
            const scrollBy = activeElemRect.top - containerRect.top + elem.scrollTop - (listElem?.clientHeight ?? 0) / 2 + activeElemRect.height / 2;
            elem.parentElement?.scrollTo({ top: scrollBy, behavior: "smooth" });
          }
        }
      });
    });
  }, [highlight]);

  return (
    <div
      ref={mergeRefs(_ref, ref)}
      className={classes(styles.list, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default ItemList;
