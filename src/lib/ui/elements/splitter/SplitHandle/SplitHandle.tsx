"use client";

import React, { ComponentProps, FormEvent, useState } from "react";

import styles from "./SplitHandle.module.scss";

export interface SplitHandleProps extends ComponentProps<"div"> {
  layout?: "v" | "h";
  value?: number;
  min?: number;
  max?: number;
  onChange?: (e: FormEvent<Element>) => void;
}

const SplitHandle = ({
  layout = "h", value, min, max, onChange,
  className,
  ...props
}: SplitHandleProps) => {
  const [active, setActive] = useState(false);

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

  // todo: consider direction
  // todo: on focus add keydown listener for arrow key resize

  return (
    <div
      className={styles.handle}
      data-handle={layout}
      data-active={active}
      tabIndex={0}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      onPointerDown={handlePointerDown}
      {...props}
    >
    </div>
  );
};

export default SplitHandle;
