import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./DropZone.module.scss";

export interface DropZoneProps extends ComponentProps<"div"> {

}

const DropZone = ({
  className, children,
}: DropZoneProps) => {
  return (
    <div className={classes(styles.wrapper, className)}>
      {children}
    </div>
  );
};

export default DropZone;
