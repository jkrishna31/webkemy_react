import React, { ComponentProps } from "react";

import { SortIcon } from "@/lib/ui/svgs/icons";

import styles from "./SortBtn.module.scss";

export interface SortBtnProps extends ComponentProps<"button"> {
  sort?: "+" | "-"
}

const SortBtn = ({
  sort,
  children, className,
  ...props
}: SortBtnProps) => {
  return (
    <button
      data-sort={sort}
      className={`${styles.btn} ${className}`}
      {...props}
    >
      <SortIcon />
    </button>
  );
};

export default SortBtn;
