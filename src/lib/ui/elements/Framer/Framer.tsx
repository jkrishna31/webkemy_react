import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Framer.module.scss";

export interface FrameProps extends ComponentProps<"div"> {
  type?: "PREV" | "NEXT" | "CURR";
}

export interface FramerProps extends ComponentProps<"div"> {

}

const Frame = ({ type = "CURR", className, ...props }: FrameProps) => {
  return (
    <div className={classes(styles.frame, className)} data-frame={type}>

    </div>
  );
};

const Framer = ({
  children, className,
  ...props
}: FramerProps) => {
  return (
    <div className={classes(styles.wrapper, className)}>
      <Frame>
        {children}
      </Frame>
    </div>
  );
};

export default Framer;
