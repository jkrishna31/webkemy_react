"use client";

import { ComponentProps, MouseEvent, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { usePointerFlow } from "@/lib/hooks/usePointerFlow";
import { clampNumber } from "@/lib/utils/math.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Slider2D.module.scss";

export interface Slider2DProps extends Omit<ComponentProps<"div">, "min" | "max" | "step" | "value" | "defaultValue" | "onChange" | "onInput"> {
  thumbClass?: string;
  crosshair?: "both" | "horizontal" | "vertical";
  min?: [number, number];
  max?: [number, number];
  step?: [number, number];
  disabled?: boolean;
  onChange?: (coords: [number, number]) => void;
  onInput?: (coords: [number, number]) => void;
  defaultValue?: [number, number];
  value?: [number, number];
}

const DEFAULT_STEP: [number, number] = [1, 1];

const Slider2D = ({
  crosshair,
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
  ...restProps
}: Slider2DProps) => {
  const areaRef = useRef<HTMLDivElement>(null);

  const [xStep, yStep] = step ?? DEFAULT_STEP;
  const [xValue, yValue] = value ?? defaultValue ?? [0, 0];

  // todo : min and max support

  const updateValue = useCallback((fromLeftPercent: number, fromBottomPercent: number) => {
    onInput?.([fromLeftPercent, fromBottomPercent]);
    onChange?.([fromLeftPercent, fromBottomPercent]);
  }, [onChange, onInput]);

  const updateValueBy = useCallback((by: [number, number]) => {
    updateValue(
      clampNumber(xValue + by[0], 0, 100),
      clampNumber(yValue + -by[1], 0, 100)
    );
  }, [updateValue, xValue, yValue]);

  const handlePointerUpdate = useCallback((event: MouseEvent | PointerEvent) => {
    if (!areaRef.current) return;

    const areaRect = areaRef.current?.getBoundingClientRect();

    const fromLeftPercent = clampNumber(((event.clientX - areaRect.left) / areaRect.width) * 100, 0, 100, xStep);
    const fromBottomPercent = 100 - clampNumber(((event.clientY - areaRect.top) / areaRect.height) * 100, 0, 100, yStep);

    updateValue(fromLeftPercent, fromBottomPercent);
  }, [updateValue, xStep, yStep]);

  const updateHandlePosition = (fromLeftPercent: number, fromBottomPercent: number) => {
    if (!areaRef.current) return;

    const areaRect = areaRef.current.getBoundingClientRect();

    const fromLeftPx = (fromLeftPercent / 100) * areaRect.width;
    const fromTopPx = ((100 - fromBottomPercent) / 100) * areaRect.height;

    const transformX = clampNumber(fromLeftPx, 0, areaRect.width - 2);
    const transformY = clampNumber(fromTopPx, 0, areaRect.height - 2);

    areaRef.current.style.setProperty("--x", `${transformX}px`);
    areaRef.current.style.setProperty("--y", `${transformY}px`);
  };

  useLayoutEffect(() => {
    if (xValue || yValue) updateHandlePosition(xValue, yValue);
  }, [xValue, yValue]);

  useEffect(() => {
    if (areaRef.current) {
      const elem = areaRef.current;
      const abortController = new AbortController();

      const keyDownHandler = (e: KeyboardEvent) => {
        switch (e.key) {
          case "ArrowLeft":
            updateValueBy([-1 * xStep, 0]);
            break;
          case "ArrowRight":
            updateValueBy([1 * xStep, 0]);
            break;
          case "ArrowUp":
            e.preventDefault();
            updateValueBy([0, -1 * yStep]);
            break;
          case "ArrowDown":
            e.preventDefault();
            updateValueBy([0, 1 * yStep]);
            break;
        }
      };

      elem.addEventListener("keydown", keyDownHandler, { signal: abortController.signal });

      return () => {
        abortController.abort();
      };
    }
  }, [updateValueBy, xStep, yStep]);

  usePointerFlow(areaRef, handlePointerUpdate);

  useEffect(() => {
    if (!areaRef.current) return;
    const ro = new ResizeObserver(() => updateHandlePosition(xValue, yValue));
    ro.observe(areaRef.current);
    return () => ro.disconnect();
  }, [xValue, yValue]);

  return (
    <div
      ref={areaRef}
      className={classes(styles.wrapper, className)}
      tabIndex={0}
      onClick={handlePointerUpdate}
      {...restProps}
    >
      <div className={styles.area_inner}>
        {(crosshair === "both" || crosshair === "horizontal") && (
          <div className={classes(styles.crosshair_arm, styles.x)}></div>
        )}
        {(crosshair === "both" || crosshair === "vertical") && (
          <div className={classes(styles.crosshair_arm, styles.y)}></div>
        )}
      </div>
      <div className={classes(styles.handle, thumbClass)}>
      </div>
    </div>
  );
};

export default Slider2D;
