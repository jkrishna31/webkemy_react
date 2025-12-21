import React, { ComponentProps, useRef } from "react";

import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./SelectList.module.scss";

export interface SelectListProps extends ComponentProps<"div"> {

}

const SelectList = ({
  ref, className,
  ...props
}: SelectListProps) => {
  const _ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mergeRefs(_ref, ref)}
      className={classes(styles.wrapper, className)}
      {...props}
    >

    </div>
  );
};

export default SelectList;
