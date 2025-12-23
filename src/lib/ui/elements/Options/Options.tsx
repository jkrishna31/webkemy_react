"use client";

import React, { ComponentProps, useEffect, useRef } from "react";

import { Keys } from "@/constants/keys.const";
import { useThrottledCallback } from "@/lib/hooks/useThrottledCallback";
import { isMobileDevice } from "@/lib/utils/client.utils";
import { findNextCandidate } from "@/lib/utils/dom.utils";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Options.module.scss";

export interface OptionsProps extends ComponentProps<"div"> {
  type?: "menu" | "select";
  highlighted?: { index?: number; keyboard?: boolean };
  onHighlightedChange?: (payload?: { index?: number; keyboard?: boolean }) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, highlighted?: number) => void;
}

const Options = ({
  highlighted, onDurationChange,
  children, className, onHighlightedChange, ref, onKeyDown,
  ...props
}: OptionsProps) => {
  const _ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    const optionItem = (e.target as HTMLElement)?.closest("[role='option']") as HTMLElement;
    const isEnabled = optionItem?.getAttribute("disabled") !== "true" || optionItem?.getAttribute("aria-disabled") !== "true";
    const index = (optionItem && isEnabled) ? Array.prototype.indexOf.call(optionItem?.parentNode?.children, optionItem) : undefined;
    onHighlightedChange?.({ index });
  }, 50);

  useEffect(() => {
    const allItems = _ref.current?.querySelectorAll("[role='option']");
    const nextItemIdx = findNextCandidate(allItems);
    if (nextItemIdx != undefined) onHighlightedChange?.({ index: nextItemIdx, keyboard: true });
  }, [onHighlightedChange]);

  useEffect(() => {
    if (!isMobileDevice() && onHighlightedChange) {
      const handleKeyDown = (e: KeyboardEvent) => {
        let nextItemIdx;
        switch (e.key) {
          case Keys.ARROW_DOWN: {
            const allItems = _ref.current?.querySelectorAll("[role='option']");
            nextItemIdx = findNextCandidate(allItems, { current: highlighted?.index });
            if (nextItemIdx != undefined) onHighlightedChange({ index: nextItemIdx, keyboard: true });
            break;
          }
          case Keys.ARROW_UP: {
            const allItems = _ref.current?.querySelectorAll("[role='option']");
            nextItemIdx = findNextCandidate(allItems, { current: highlighted?.index, dir: "prev" });
            if (nextItemIdx != undefined) onHighlightedChange({ index: nextItemIdx, keyboard: true });
            break;
          }
        }
        onKeyDown?.(e as unknown as React.KeyboardEvent<HTMLDivElement>, nextItemIdx);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [highlighted, onHighlightedChange, onKeyDown]);

  useEffect(() => {
    const elem = _ref.current;
    if (!isMobileDevice() && elem && onHighlightedChange) {
      elem.addEventListener("pointermove", handleMouseMove);
      return () => elem.removeEventListener("pointermove", handleMouseMove);
    }
  }, [handleMouseMove, onHighlightedChange]);

  useEffect(() => {
    if (!highlighted?.keyboard) return;
    const elem = _ref.current;
    if (!elem) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (elem.scrollHeight > elem.clientHeight || (elem?.parentElement && elem.parentElement.scrollHeight > elem.parentElement.clientHeight)) {
          const activeElem = elem.querySelector("[data-highlighted='true']");
          if (activeElem) {
            const activeElemRect = activeElem.getBoundingClientRect();
            const containerRect = elem.getBoundingClientRect();
            const scrollBy = activeElemRect.top - containerRect.top + elem.scrollTop - (elem.parentElement?.clientHeight ?? 0) / 2 + activeElemRect.height / 2;
            elem.parentElement?.scrollTo({ top: scrollBy, behavior: "smooth" });
          }
        }
      });
    });
  }, [highlighted]);

  return (
    <div
      ref={mergeRefs(_ref, ref)}
      className={classes(styles.wrapper)}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
};

export default Options;
