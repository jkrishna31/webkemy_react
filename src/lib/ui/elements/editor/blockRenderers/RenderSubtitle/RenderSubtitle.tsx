import React, { ComponentProps } from "react";

import styles from "./RenderSubtitle.module.scss";

export interface RenderSubtitleProps extends ComponentProps<"p"> {

}

const RenderSubtitle = ({ children, className, ...props }: RenderSubtitleProps) => {
  return (
    <p className={`${styles.subtitle} ${className}`} {...props}>
      {children}
    </p>
  );
};

export default RenderSubtitle;
