import React, { ComponentProps } from "react";

import styles from "./SplitHandle.module.scss";

export interface SplitHandleProps extends ComponentProps<"div"> {
  layout?: "v" | "h"
}

const SplitHandle = ({
  layout = "h",
  className,
  ...props
}: SplitHandleProps) => {
  // on mouse down ---
  // + find the closest ancestor splitter & get its id

  return (
    <div
      data-handle={layout}
      className={styles.handle}
      tabIndex={0}
      {...props}
    >
    </div>
  );
};

export default SplitHandle;
