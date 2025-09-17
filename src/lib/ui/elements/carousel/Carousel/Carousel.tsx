"use client";

import React, { ComponentProps, ReactNode, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/ui/svgs/icons";

import styles from "./Carousel.module.scss";

export interface Slide {
  id: string | number
  render?: ReactNode
  title?: string
}

export interface CarouselProps extends ComponentProps<"div"> {
  slides?: Slide[]
}

const Carousel = ({
  children, className, slides,
  ...props
}: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // focus on specific slide
  // auto, looped scroll
  // play progress

  return (
    <div role="region" className={`${styles.wrapper} ${className}`} {...props}>
      <button
        className={styles.btn_prev}
        aria-label="Prev Slide"
      >
        <ChevronLeftIcon />
      </button>
      <button
        className={styles.btn_next}
        aria-label="Next Slide"
      >
        <ChevronRightIcon />
      </button>
      <div className={`${styles.slides} scroll_invisible`}>
        {
          slides?.map((slide, idx) => {
            return (
              <div key={slide.id} className={styles.item} data-slide={idx}>
                {slide.render}
              </div>
            );
          })
        }
      </div>
      <div className={styles.slide_btns}>
        {
          slides?.map((slide, idx) => {
            return (
              <button
                key={slide.id}
                className={styles.slide_btn}
                data-active={activeSlide === idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={slide.title ?? `Show Slide ${idx + 1}`}
              ></button>
            );
          })
        }
      </div>
    </div>
  );
};

export default Carousel;
