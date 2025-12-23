import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./OptionGroup.module.scss";

export interface OptionGroupProps extends ComponentProps<"div"> {
  collapsible?: boolean;
  open?: boolean;
  group?: string;
}

const OptionGroup = ({
  className, collapsible, open, group,
  ...restProps
}: OptionGroupProps) => {
  const collapsibleProps: ComponentProps<"div"> = {};

  if (collapsible) collapsibleProps["aria-expanded"] = open;

  const renderHeader = () => {
    return (
      <div role="presentation">
        <p>{group}</p>
      </div>
    );
  };

  return (
    <div
      role="listbox"
      className={classes(styles.wrapper, className)}
      {...collapsibleProps}
      {...restProps}
    >
      {renderHeader()}
      <div className={styles.list}>

      </div>
    </div>
  );
};

export default OptionGroup;
