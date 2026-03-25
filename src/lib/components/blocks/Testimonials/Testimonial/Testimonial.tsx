import { ComponentProps } from "react";

import { Avatar } from "@/lib/components/elements/Avatar";
import QuoteIcon from "@/lib/svgs/icons/QuoteIcon";
import { classes } from "@/lib/utils/style";

import styles from "./Testimonial.module.scss";

export type TTestimonial = {
  content?: string;
  name?: string;
  role?: string;
  profile?: string;
  date?: string;
  id?: string | number;
  company?: string;
  companyLogo?: string;
}

export interface TestimonialProps extends ComponentProps<"div"> {
  testimonial?: TTestimonial;
}

const Testimonial = ({
  testimonial,
  className,
  ...restProps
}: TestimonialProps) => {
  return (
    <div
      className={classes(styles.testimonial, className)}
      {...restProps}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <p>{testimonial?.content}</p>
        </div>

        <div className={styles.author}>
          <Avatar
            className={styles.avatar}
            src={testimonial?.profile ?? ""} alt={testimonial?.name ?? "N/A"}
          />
          <div className={styles.author_details}>
            <p className={styles.name}>{testimonial?.name}</p>
            <p className={styles.role}>{testimonial?.role}{" at "}<span>{testimonial?.company}</span></p>
          </div>
        </div>

        {/* <BlockquoteIcon className={styles.presentation_start} /> */}
        <QuoteIcon className={styles.presentation} />
      </div>
    </div>
  );
};

export default Testimonial;
