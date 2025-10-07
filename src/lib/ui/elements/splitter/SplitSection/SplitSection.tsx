import React, { ComponentProps } from "react";

import styles from "./SplitSection.module.scss";

export interface SplitSectionProps extends ComponentProps<"div"> {

}

const SplitSection = ({
  children, className,
  ...props
}: SplitSectionProps) => {
  return (
    <div className={`${styles.section} ${className}`} data-section>
      {children}
    </div>
  );
};

export default SplitSection;
