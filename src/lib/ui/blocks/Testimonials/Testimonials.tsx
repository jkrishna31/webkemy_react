import { ComponentProps } from "react";

import { InfiniteScrollBanner } from "@/lib/ui/elements/InfiniteScrollBanner";
import { classes } from "@/lib/utils/style.utils";

import { Testimonial, TTestimonial } from ".";
import styles from "./Testimonials.module.scss";

export interface TestimonialsProps extends ComponentProps<"div"> {
  testimonials?: TTestimonial[];
  direction?: "left" | "right" | "up" | "down";
}

const Testimonials = ({
  testimonials, direction,
  className,
  ...restProps
}: TestimonialsProps) => {
  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      <InfiniteScrollBanner className={styles.scroller} direction={direction}>
        {testimonials?.map(item => (
          <Testimonial key={item.id} testimonial={item} className={styles.testimonial} />
        ))}
      </InfiniteScrollBanner>
    </div>
  );
};

export default Testimonials;
