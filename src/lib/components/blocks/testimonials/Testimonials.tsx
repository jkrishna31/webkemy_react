import { ComponentProps } from "react";

import { Marquee } from "@/lib/components/elements/marquee";
import { classes } from "@/lib/utils/style";

import { Testimonial, TTestimonial } from ".";
import styles from "./Testimonials.module.scss";

export interface TestimonialsProps extends ComponentProps<"div"> {
  testimonials?: TTestimonial[];
  direction?: "left" | "right" | "up" | "down";
}

export const Testimonials = ({
  testimonials, direction,
  className,
  ...restProps
}: TestimonialsProps) => {
  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      <Marquee className={styles.scroller} direction={direction}>
        {testimonials?.map(item => (
          <Testimonial key={item.id} testimonial={item} className={styles.testimonial} />
        ))}
      </Marquee>
    </div>
  );
};
