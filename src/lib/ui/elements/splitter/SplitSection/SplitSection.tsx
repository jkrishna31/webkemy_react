import React, { ComponentProps } from "react";

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
      className={`${styles.section} ${className}`}
      style={{
        flexBasis: size !== undefined ? `${size}%` : "auto",
        flexGrow: size !== undefined ? 0 : 1,
        ...(style ?? {})
      }}
      {...props}>
      {children}
    </div>
  );
};

export default SplitSection;
