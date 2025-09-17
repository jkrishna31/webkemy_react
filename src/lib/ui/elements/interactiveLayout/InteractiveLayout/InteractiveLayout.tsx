import React, { ComponentProps } from "react";

import styles from "./InteractiveLayout.module.scss";

export interface InteractiveLayoutProps extends ComponentProps<"div"> {

}

const InteractiveLayout = ({
  className, children,
  ...props
}: InteractiveLayoutProps) => {
  // layouts - grid, column, row

  // grid item options
  // + auto width
  // + take all avaibale width

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
      <div data-type="dr"></div>
    </div>
  );
};

export default InteractiveLayout;
