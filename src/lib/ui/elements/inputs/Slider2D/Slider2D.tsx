"use client";

import React, { ComponentProps, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { usePointerFlow } from "@/lib/hooks";
import useEvent from "@/lib/hooks/useEvent";
import { clampNumber } from "@/lib/utils/math.utils";
import { classes } from "@/lib/utils/style.utils";

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

const DEFAULT_STEP: [number, number] = [1, 1];

const Slider2D = ({
  min,
  max,
  step = DEFAULT_STEP,
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

  const [_value, setValue] = useState<[number, number]>();

  // todo : min and max support

  const updateValue = useCallback((fromLeftPercent: number, fromBottomPercent: number) => {
    if (!areaRef.current || !thumbRef.current) return;

    const areaRect = areaRef.current?.getBoundingClientRect();
    const thumbRect = thumbRef.current?.getBoundingClientRect();

    const fromLeftPx = (fromLeftPercent / 100) * areaRect.width;
    const fromTop = ((100 - fromBottomPercent) / 100) * areaRect.height;

    const transformX = clampNumber(fromLeftPx - thumbRect.width / 2, 0, areaRect.width - thumbRect.width - 2);
    const transformY = clampNumber(fromTop - thumbRect.height / 2, 0, areaRect.height - thumbRect.height - 2);

    thumbRef.current.style.transform = `translate3d(${transformX}px, ${transformY}px, 0)`;

    setValue([fromLeftPercent, fromBottomPercent]);
    onInput?.([fromLeftPercent, fromBottomPercent]);
    onChange?.([fromLeftPercent, fromBottomPercent]);
  }, [onChange, onInput]);

  const updateValueBy = useEvent((by: [number, number]) => {
    updateValue(
      clampNumber((value?.[0] ?? 0) + by[0], 0, 100),
      clampNumber((value?.[1] ?? 0) + -by[1], 0, 100)
    );
  });

  const handlePointerUpdate = useEvent((event: MouseEvent | PointerEvent) => {
    if (!areaRef.current || !thumbRef.current) return;

    const areaRect = areaRef.current?.getBoundingClientRect();

    const fromLeftPercent = clampNumber(((event.clientX - areaRect.left) / areaRect.width) * 100, 0, 100, step[0]);
    const fromBottomPercent = 100 - clampNumber(((event.clientY - areaRect.top) / areaRect.height) * 100, 0, 100, step[1]);

    updateValue(fromLeftPercent, fromBottomPercent);
  });

  useEffect(() => {
    if (value && (!_value?.length || _value[0] !== value[0] || _value[1] !== value[1])) {
      updateValue(...value);
    }
  }, [_value, updateValue, value]);

  useEffect(() => {
    if (areaRef.current) {
      const elem = areaRef.current;
      const abortController = new AbortController();

      const keyDownHandler = (e: KeyboardEvent) => {
        switch (e.key) {
          case "ArrowLeft":
            updateValueBy([-1 * step[0], 0]);
            break;
          case "ArrowRight":
            updateValueBy([1 * step[0], 0]);
            break;
          case "ArrowUp":
            e.preventDefault();
            updateValueBy([0, -1 * step[1]]);
            break;
          case "ArrowDown":
            e.preventDefault();
            updateValueBy([0, 1 * step[1]]);
            break;
        }
      };

      elem.addEventListener("keydown", keyDownHandler, { signal: abortController.signal });

      return () => {
        abortController.abort();
      };
    }
  }, [step, updateValueBy]);

  usePointerFlow(areaRef, handlePointerUpdate);

  return (
    <div
      ref={areaRef}
      className={classes(styles.wrapper, className)}
      tabIndex={0}
      onClick={handlePointerUpdate}
      {...props}
    >
      <div
        ref={thumbRef}
        className={classes(styles.thumb, thumbClass)}
      ></div>
    </div>
  );
};

export default Slider2D;
