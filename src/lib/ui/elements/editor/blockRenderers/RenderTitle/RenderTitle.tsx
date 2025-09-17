import React, { ComponentProps } from "react";

import styles from "./RenderTitle.module.scss";

export interface RenderTitleProps extends ComponentProps<"h1"> {

}

const RenderTitle = ({ children, className, ...props }: RenderTitleProps) => {
  return (
    <h1 className={`${styles.title} ${className}`} {...props}>
      {children}
    </h1>
  );
};

export default RenderTitle;
