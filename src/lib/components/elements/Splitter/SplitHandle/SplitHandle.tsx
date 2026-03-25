"use client";

import { ComponentProps, FormEvent, useEffect, useRef, useState } from "react";

import { Keys } from "@/constants/keys.const";

import styles from "./SplitHandle.module.scss";


const ALLOWED_KEYS: string[] = [Keys.ARROW_DOWN, Keys.ARROW_LEFT, Keys.ARROW_RIGHT, Keys.ARROW_UP];

export interface SplitHandleProps extends Omit<ComponentProps<"div">, "onChange"> {
  layout?: "v" | "h";
  passive?: boolean;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const SplitHandle = ({
  layout = "h", passive,
  value, min, max, onChange, step = 2,
  className,
  ...props
}: SplitHandleProps) => {
  const [active, setActive] = useState(false);

  const handleRef = useRef<HTMLDivElement>(null);

  // todo: direction aware
  // todo: lazy (cancel on esc, ghost handle)
  // todo: fix step handling

  useEffect(() => {
    const handleElem = handleRef.current;
    if (!handleElem) return;

    let splitter: Element | null;
    let bodyCursorStyle: string;
    let _layout: string | null;
    let splitterRect: DOMRect;

    const handlePointerMove = (moveEv: PointerEvent) => {
      const dy = _layout === "v" ? Math.round(((moveEv.y - splitterRect.y) / splitterRect.height) * 100) : 0;
      const dx = _layout === "h" ? Math.round(((moveEv.x - splitterRect.x) / splitterRect.width) * 100) : 0;

      onChange?.(_layout === "v" ? dy : dx);
    };

    const handlePointerUp = () => {
      document.body.style.cursor = bodyCursorStyle;
      setActive(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();

      splitter = (e.target as HTMLElement)?.closest("[data-splitter]");
      if (!splitter || !e.target) return;

      bodyCursorStyle = document.body.style.cursor;
      document.body.style.cursor = window.getComputedStyle(e.target as HTMLElement).cursor;

      _layout = splitter.getAttribute("data-layout");
      splitterRect = splitter.getBoundingClientRect();

      setActive(true);

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    handleElem.addEventListener("pointerdown", handlePointerDown);

    return () => {
      handleElem.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerDown);
    };
  }, [onChange]);

  useEffect(() => {
    const handleElem = handleRef.current;
    const splitter = handleElem?.closest("[data-splitter]");

    if (handleElem && splitter) {
      const _layout = splitter.getAttribute("data-layout");
      const splitterRect = splitter.getBoundingClientRect();

      const keyDownHandler = (keyDownEvent: KeyboardEvent) => {
        if (!ALLOWED_KEYS.includes(keyDownEvent.key)) return;

        const handleRect = (handleElem as HTMLElement).getBoundingClientRect();

        const dy = _layout === "v" ? Math.round(((handleRect.y - splitterRect.y) / splitterRect.height) * 100) : 0;
        const dx = _layout === "h" ? Math.round(((handleRect.x - splitterRect.x) / splitterRect.width) * 100) : 0;

        let newValue = _layout === "v" ? dy : dx;
        switch (keyDownEvent.key) {
          case Keys.ARROW_LEFT:
            newValue -= step;
            break;
          case Keys.ARROW_RIGHT:
            newValue += step;
            break;
          case Keys.ARROW_UP:
            keyDownEvent.preventDefault();
            newValue -= step;
            break;
          case Keys.ARROW_DOWN:
            keyDownEvent.preventDefault();
            newValue += step;
            break;
        }

        onChange?.(newValue);
      };

      handleElem.addEventListener("keydown", keyDownHandler);

      return () => {
        handleElem.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [onChange, step]);

  return (
    <div
      ref={handleRef}
      data-handle={layout}
      data-active={active}
      data-passive={passive}
      tabIndex={0}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className={styles.handle}
      {...props}
    >
    </div>
  );
};

export default SplitHandle;
