import React, { ComponentProps, useRef } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Options.module.scss";

export interface OptionsProps extends ComponentProps<"div"> {

}

const Options = ({
  children, className,
  ...props
}: OptionsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // arrow key navigation support
  // arrow key lock
  // update focus on hover

  return (
    <div
      ref={ref}
      className={classes(styles.wrapper)}
    >
      {children}
    </div>
  );
};

export default Options;
