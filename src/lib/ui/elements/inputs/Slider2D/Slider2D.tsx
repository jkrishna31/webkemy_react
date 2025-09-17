"use client";

import React, { ComponentProps, MouseEvent, useCallback, useEffect, useRef } from "react";

import { usePointerFlow } from "@/lib/hooks";
import { clampNumber } from "@/lib/utils/math.utils";

import styles from "./Slider2D.module.scss";

export interface Props extends ComponentProps<any> {
  thumbClass?: string
  min?: [number, number]
  max?: [number, number]
  step?: [number, number]
  disabled?: boolean
  name?: string
  onChange?: (coords: [number, number]) => void
  onInput?: (coords: [number, number]) => void
  defaultValue?: [number, number]
  value?: [number, number]
  className?: string;
}

const Slider2D = ({
  min,
  max,
  step,
  disabled,
  className,
  thumbClass,
  value,
  defaultValue,
  onInput,
  onChange,
  ...props
}: Props) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback((event?: MouseEvent | PointerEvent, by?: [number, number]) => {
    if (!thumbRef.current || !areaRef.current) return;

    const areaRect = areaRef.current.getBoundingClientRect();
    const thumbRect = thumbRef.current.getBoundingClientRect();

    let leftPercent = value ? value[0] : 50;
    let topPercent = value ? value[1] : 50;

    if (event) {
      leftPercent = clampNumber(((event.clientX - areaRect.left) / areaRect.width) * 100, 0, 100);
      topPercent = clampNumber(((event.clientY - areaRect.top) / areaRect.height) * 100, 0, 100);
      topPercent = 100 - topPercent;
    } else if (by) {
      leftPercent = clampNumber(leftPercent + by[0], 0, 100);
      topPercent = clampNumber(topPercent + -by[1], 0, 100);
    }

    const fromLeft = (leftPercent / 100) * areaRect.width;
    const fromTop = ((100 - topPercent) / 100) * areaRect.height;

    const transformX = clampNumber(fromLeft - thumbRect.width / 2, 0, areaRect.width - thumbRect.width);
    const transformY = clampNumber(fromTop - thumbRect.height / 2, 0, areaRect.height - thumbRect.height);

    thumbRef.current.style.transform = `translate3d(${transformX}px, ${transformY}px, 0)`;

    onInput?.([leftPercent, topPercent]);
    onChange?.([leftPercent, topPercent]);
  }, [onChange, onInput, value]);

  useEffect(() => {
    if (areaRef.current) {
      const elem = areaRef.current;
      const abortController = new AbortController();

      const keyDownHandler = (e: KeyboardEvent) => {
        switch (e.key) {
          case "ArrowLeft":
            updateValue(undefined, [-1, 0]);
            break;
          case "ArrowRight":
            updateValue(undefined, [1, 0]);
            break;
          case "ArrowUp":
            e.preventDefault();
            updateValue(undefined, [0, -1]);
            break;
          case "ArrowDown":
            e.preventDefault();
            updateValue(undefined, [0, 1]);
            break;
        }
      };

      elem.addEventListener("keydown", keyDownHandler, { signal: abortController.signal });

      return () => {
        abortController.abort();
      };
    }
  }, [updateValue]);

  usePointerFlow(areaRef, updateValue);

  return (
    <div
      ref={areaRef}
      className={`${styles.wrapper} ${className}`}
      tabIndex={0}
      onClick={updateValue}
      {...props}
    >
      <div
        ref={thumbRef}
        className={`${styles.thumb} ${thumbClass}`}
      ></div>
    </div>
  );
};

export default Slider2D;
