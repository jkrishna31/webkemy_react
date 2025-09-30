"use client";

import React, { ComponentProps, useId, useState } from "react";

import { StarIcon } from "@/lib/ui/svgs/icons";
import { SVG } from "@/lib/ui/svgs/misc";
import { Color } from "@/types/general.types";

import styles from "./Rate.module.scss";

export interface RateProps extends ComponentProps<"div"> {
  color?: Color;
  rating?: number;
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  disabled?: boolean;
  noStroke?: boolean;
}

const Rate = ({
  rating = 0, color,
  min = 1, max = 5, step = 1,
  readonly, disabled, noStroke,
  className, children,
  ...props
}: RateProps) => {
  const [rated, setRated] = useState<number>(rating);

  const id = useId();

  // todo: should be usable as form input

  const handleRating = (e: React.MouseEvent) => {
    const selectedRating = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRating) {
      setRated(Number(selectedRating?.getAttribute("data-rating")));
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onClick={(readonly || disabled) ? undefined : handleRating}
      aria-readonly={readonly}
      aria-disabled={disabled}
      data-color={color}
    >
      {
        Array.from({ length: (max - min + 1) / step }).map((_, idx: number) => {
          const rating = min + (step * idx);
          const isPartial = rated < rating && rated > (rating - step);
          return (
            <button
              key={rating}
              data-rating={rating}
              data-state={(rating <= rated && !isPartial) ? "full" : isPartial ? "partial" : ""}
              disabled={disabled}
              aria-disabled={disabled}
              data-readonly={readonly}
              data-nostroke={noStroke}
              type="button"
            >
              {
                isPartial ? (
                  <SVG hidden>
                    <defs>
                      <linearGradient id={id}>
                        <stop offset={`${((rated - (rating - step)) / step) * 100}%`} data-color={color ?? "default"} />
                        <stop offset={`${((rated - (rating - step)) / step) * 100}%`} stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </SVG>
                ) : null
              }
              <StarIcon
                style={isPartial ? { fill: `url(#${id})` } : {}}
              />
            </button>
          );
        })
      }
    </div>
  );
};

export default Rate;
