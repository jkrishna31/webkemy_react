import React, { ComponentProps } from "react";

import styles from "./DropZone.module.scss";

export interface DropZoneProps extends ComponentProps<"div"> {

}

const DropZone = ({
  className, children,
}: DropZoneProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  );
};

export default DropZone;
