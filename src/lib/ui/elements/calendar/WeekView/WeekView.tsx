"use client";

import React, { ComponentProps, useEffect } from "react";

import { getWeekOfTheMonth } from "@/lib/utils/datetime.utils";

import { DayView } from "..";
import styles from "./WeekView.module.scss";

export interface WeekViewProps extends ComponentProps<"div"> {
  onAdd?: any;
  day: number;
  month: number;
  year: number;
  week: number;
  weekDayStart?: 0 | 1;
  timeFormat?: "12h" | "24h";
  setWeek?: (val: number) => void;
}

const WeekView = ({
  day, month, year, week, weekDayStart = 0, setWeek, timeFormat,
  onAdd,
}: WeekViewProps) => {
  const activeWeek = getWeekOfTheMonth(year, month, day, weekDayStart);

  // on activeWeekChange
  // find the nth week based on today's date
  // back/forth navigation - first day - 1 or last day + 1 in the weekDetails array

  useEffect(() => {
    setWeek?.(activeWeek);
  }, [activeWeek, setWeek]);

  return (
    <div className={styles.wrapper}>
      <DayView
        day={day} month={month} year={year} week={week} timeFormat={timeFormat} weekDayStart={weekDayStart}
        days={7} onAdd={onAdd}
      />
    </div>
  );
};

export default WeekView;
