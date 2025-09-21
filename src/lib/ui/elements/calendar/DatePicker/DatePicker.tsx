import React, { ComponentProps } from "react";

import styles from "./DatePicker.module.scss";

export interface DatePickerProps extends ComponentProps<"input"> {
  range?: boolean
}

const DatePicker = ({
  range,
  min, max,
  ...props
}: DatePickerProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>

      </div>
      <div className={styles.footer}>

      </div>
    </div>
  );
};

export default DatePicker;
