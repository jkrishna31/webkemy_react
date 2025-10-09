import React, { ComponentProps } from "react";

import styles from "./SplitSection.module.scss";

export interface SplitSectionProps extends ComponentProps<"div"> {
  value?: number
}

const SplitSection = ({
  value = 100,
  children, className, style,
  ...props
}: SplitSectionProps) => {
  return (
    <div
      data-section
      className={`${styles.section} ${className}`}
      style={{
        flex: value / 100,
        // flexGrow: 1,
        // flexShrink: 1,
        ...(style ?? {})
      }}
      {...props}>
      {children}
    </div>
  );
};

export default SplitSection;
