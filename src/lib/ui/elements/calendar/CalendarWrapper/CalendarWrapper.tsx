import { ComponentProps } from "react";

import styles from "./CalendarWrapper.module.scss";

export interface CalendarWrapperProps extends ComponentProps<"div"> {

}

const CalendarWrapper = ({ children }: CalendarWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default CalendarWrapper;
