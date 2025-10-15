"use client";

import React, { ComponentProps, FormEvent, useEffect, useRef, useState } from "react";

import styles from "./SplitHandle.module.scss";


const ALLOWED_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

export interface SplitHandleProps extends ComponentProps<"div"> {
  layout?: "v" | "h";
  passive?: boolean;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (e: FormEvent<Element>) => void;
}

const SplitHandle = ({
  layout = "h", passive,
  value, min, max, onChange,
  className,
  ...props
}: SplitHandleProps) => {
  const [active, setActive] = useState(false);

  const handleRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();

    const splitter = (e.target as HTMLElement)?.closest("[data-splitter]");

    if (splitter) {
      setActive(true);
      const cursorStyle = document.body.style.cursor;
      document.body.style.cursor = window.getComputedStyle(e.currentTarget).cursor;

      const _layout = splitter.getAttribute("data-layout");
      const splitterRect = splitter.getBoundingClientRect();

      const onMove = (moveEv: PointerEvent) => {
        const dy = _layout === "v" ? Math.round(((moveEv.y - splitterRect.y) / splitterRect.height) * 100) : 0;
        const dx = _layout === "h" ? Math.round(((moveEv.x - splitterRect.x) / splitterRect.width) * 100) : 0;

        onChange?.({ target: { value: _layout === "v" ? dy : dx } } as unknown as FormEvent);
      };

      const onUp = () => {
        document.body.style.cursor = cursorStyle;
        setActive(false);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }
  };

  // todo: direction aware
  // todo: cancel on Esc for passive mode
  // todo: passive mode
  // - use another ghost handle or use psuedo-element
  // - render at the same position by default
  // - and based on move offset add the transform

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
          case "ArrowLeft":
            newValue -= 2;
            break;
          case "ArrowRight":
            newValue += 2;
            break;
          case "ArrowUp":
            keyDownEvent.preventDefault();
            newValue -= 2;
            break;
          case "ArrowDown":
            keyDownEvent.preventDefault();
            newValue += 2;
            break;
        }

        onChange?.({ target: { value: newValue } } as unknown as FormEvent);
      };

      handleElem.addEventListener("keydown", keyDownHandler);

      return () => {
        console.log("---- unmount ---",);
        handleElem.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [onChange]);

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
      onPointerDown={handlePointerDown}
      className={styles.handle}
      {...props}
    >
    </div>
  );
};

export default SplitHandle;
