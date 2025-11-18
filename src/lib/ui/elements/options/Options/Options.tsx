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

  // no need to focus trap
  // only loop on item as per arrow keys
  // arrow keys to iterate on items
  // on tab move out of options

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
