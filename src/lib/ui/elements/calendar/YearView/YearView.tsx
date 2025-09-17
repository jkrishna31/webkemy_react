import React, { ComponentProps } from "react";

import { months, monthsOrder } from "@/data/general/datetime";
import { useCalendarActions } from "@/data/stores";

import { MonthView } from "..";
import styles from "./YearView.module.scss";

export interface YearViewProps extends ComponentProps<"div"> {
  onAdd?: any
}

const YearView = ({
  onAdd,
}: YearViewProps) => {
  const { setStore } = useCalendarActions();

  return (
    <div className={styles.container}>
      {
        Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className={styles.month_wrapper}>
            <button
              onClick={() => setStore({
                mode: "month",
                activeMonth: idx,
              })}
            >
              {months[monthsOrder[idx]].label}
            </button>
            <MonthView mode="mini" month={idx} onAdd={onAdd} hideEmptyCells />
          </div>
        ))
      }
    </div>
  );
};

export default YearView;
