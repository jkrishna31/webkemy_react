import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./SplitSection.module.scss";

export interface SplitSectionProps extends ComponentProps<"div"> {
  size?: number
}

export const SplitSection = ({
  size,
  children, className, style,
  ...props
}: SplitSectionProps) => {
  return (
    <div
      data-section
      className={classes(styles.section, className)}
      style={{
        flexBasis: size !== undefined ? `${size}%` : "auto",
        flexGrow: size !== undefined ? 0 : 1,
        ...style
      }}
      {...props}>
      {children}
    </div>
  );
};
