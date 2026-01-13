import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./SplitSection.module.scss";

export interface SplitSectionProps extends ComponentProps<"div"> {
  size?: number
}

const SplitSection = ({
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

export default SplitSection;
