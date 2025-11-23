"use client";

import React, { ComponentProps, Fragment, ReactNode, useEffect, useId, useState } from "react";

import { StarIcon } from "@/lib/ui/svgs/icons";
import { SVG } from "@/lib/ui/svgs/misc";
import { classes } from "@/lib/utils/style.utils";
import { Color } from "@/types/general.types";

import styles from "./Rate.module.scss";

export interface RateProps extends ComponentProps<"fieldset"> {
  color?: Color;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  subStep?: number;
  readonly?: boolean;
  disabled?: boolean;
  noStroke?: boolean;
  icon?: ReactNode;
  name?: string;
  clearable?: boolean;
  getLabelText?: (rating: number) => string;
  characters?: ReactNode[];
  itemClass?: string;
}

const Rate = ({
  value, defaultValue, onChange,
  min = 1, max = 5, step = 1, subStep = step,
  readonly, disabled, noStroke, icon, color,
  className, children, name = "rating", clearable, onClick,
  getLabelText, characters, itemClass,
  ...props
}: RateProps) => {
  const [rate, setRate] = useState<number | undefined>(value ?? defaultValue);
  const [active, setActive] = useState<number | null>(null);

  const id = useId();
  const total = (max - min + 1) / step;
  const noOfSubStops = Math.ceil(step / subStep);
  const isEventsAllowed = !disabled && !readonly;

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(Number(e.target.value));
    onChange?.(e as any);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const selectedRatingElem = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRatingElem) {
      const newRating = Number(selectedRatingElem?.getAttribute("data-rating"));
      const selectedRatingElemRect = selectedRatingElem.getBoundingClientRect();
      const subStepInPx = selectedRatingElemRect.width / noOfSubStops;
      const coveredSubStops = Math.ceil((e.clientX - selectedRatingElemRect.x) / subStepInPx);
      const finalNewRating = (newRating - step) + (coveredSubStops * subStep);
      setActive(finalNewRating);
    }
  };

  const handlePointerLeave = () => {
    setActive(null);
  };

  useEffect(() => {
    setRate(value ?? defaultValue ?? 0);
  }, [defaultValue, value]);

  return (
    <fieldset
      onPointerMove={isEventsAllowed ? handlePointerMove : undefined}
      onPointerLeave={isEventsAllowed ? handlePointerLeave : undefined}
      className={classes(styles.wrapper, className)}
      data-color={color}
      disabled={disabled || readonly}
      aria-disabled={disabled || readonly}
      data-readonly={readonly}
      {...props}
    >
      {!!clearable && (
        <>
          <input
            type="radio"
            name={name} id={name + "-clear"}
            value=""
            checked={rate === null}
            onChange={handleRating}
            className={classes(styles.clear_input)}
            disabled={disabled}
            readOnly={readonly}
          />
          <label className={styles.clear_input_label} htmlFor={name + "-clear"}>
            <span className="sr_only">
              {"0"}
            </span>
          </label>
        </>
      )}
      {
        Array.from({ length: total }).map((_, stepIdx: number) => {
          const rating = min + (step * stepIdx);
          const ceil = active ?? rate ?? 0;
          const isPartial = ceil < rating && ceil > (rating - step);
          return (
            <span
              key={"rating-" + rating}
              data-rating={rating}
              data-state={(rating <= ceil && !isPartial) ? "full" : isPartial ? "partial" : ""}
              data-nostroke={noStroke}
              aria-disabled={disabled || readonly}
              style={isPartial ? { fill: `url(#${id})` } : {}}
              className={classes(styles.item, itemClass)}
            >
              {
                isPartial ? (
                  <SVG hidden>
                    <defs>
                      <linearGradient id={id}>
                        <stop offset={`${((ceil - (rating - step)) / step) * 100}%`} data-color={color ?? "default"} />
                        <stop offset={`${((ceil - (rating - step)) / step) * 100}%`} stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </SVG>
                ) : null
              }
              {
                Array.from({ length: noOfSubStops }).map((_, subStepIdx) => {
                  const subRating = Math.min((rating - step) + ((subStepIdx + 1) * subStep), rating);
                  const label = getLabelText?.(subRating) ?? String(subRating);
                  return (
                    <Fragment key={subRating}>
                      <label
                        htmlFor={name + "-" + subRating}
                        style={{ left: `${subStepIdx * (100 / noOfSubStops)}%`, width: `${100 / noOfSubStops}%` }}
                      >
                        <span className="sr_only">
                          {label}
                        </span>
                      </label>
                      <input
                        type="radio"
                        name={name}
                        id={name + "-" + subRating}
                        value={subRating}
                        checked={subRating === rate}
                        onChange={handleRating}
                        disabled={disabled || readonly}
                        readOnly={readonly}
                        onClick={
                          (isEventsAllowed && clearable && subRating === rate)
                            ? () => setRate(undefined)
                            : undefined
                        }
                      />
                    </Fragment>
                  );
                })
              }
              {icon ?? characters?.[stepIdx] ?? <StarIcon />}
            </span>
          );
        })
      }
    </fieldset>
  );
};

export default Rate;
