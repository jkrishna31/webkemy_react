"use client";

import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";

import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { classes } from "@/lib/utils/style.utils";

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
  children, className, slides = [],
  ...props
}: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // cons -  loop scroll, slide can be skipped
  // todo - autoplay

  useEffect(() => {
    const targetSlide = containerRef.current?.querySelector(`[data-slide="${activeSlide}"]`);
    targetSlide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeSlide, slides.length]);

  useEffect(() => {
    if (containerRef.current) {
      const slides = containerRef.current?.querySelectorAll("[data-slide]");
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const activeSlide = entry.target.closest("[data-slide]");
          if (activeSlide && entry.intersectionRatio === 1) {
            setActiveSlide(Number(activeSlide?.getAttribute("data-slide")));
          }
        }
      }, {
        root: containerRef.current,
        threshold: [0, 1],
      });
      slides?.forEach(slide => observer.observe(slide));
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      role="region"
      className={classes(styles.wrapper, className)}
      {...props}
    >
      <button
        className={styles.btn_prev}
        aria-label="Prev Slide"
        disabled={activeSlide === 0}
        onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className={styles.btn_next}
        aria-label="Next Slide"
        disabled={activeSlide === (slides?.length ?? 0) - 1}
        onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
      >
        <ChevronRightIcon />
      </button>
      <div
        ref={containerRef}
        className={classes(styles.slides, "scroll_invisible")}
      >
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
      <div className={styles.slide_btns} role="listbox">
        {
          slides?.map((slide, idx) => {
            return (
              <button
                key={slide.id}
                className={styles.slide_btn}
                data-active={activeSlide === idx}
                role="option"
                aria-selected={activeSlide === idx}
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
