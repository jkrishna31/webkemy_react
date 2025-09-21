"use client";

import React, { ComponentProps, useEffect } from "react";

import { useActiveDay, useActiveMonth, useActiveYear, useCalendarActions, useWeekDayStart } from "@/data/stores";
import { getWeekOfTheMonth } from "@/lib/utils/datetime.utils";

import { DayView } from "..";
import styles from "./WeekView.module.scss";

export interface WeekViewProps extends ComponentProps<"div"> {
  onAdd?: any
}

const WeekView = ({
  onAdd,
}: WeekViewProps) => {
  const activeDay = useActiveDay();
  const activeMonth = useActiveMonth();
  const activeYear = useActiveYear();
  const weekDayStart = useWeekDayStart();
  const { setStore } = useCalendarActions();

  const activeWeek = getWeekOfTheMonth(activeYear, activeMonth, activeDay, weekDayStart);

  // on activeWeekChange
  // find the nth week based on today's date
  // back/forth navigation - first day - 1 or last day + 1 in the weekDetails array

  useEffect(() => {
    setStore({ activeWeek });
  }, [activeWeek, setStore]);

  return (
    <div className={styles.wrapper}>
      <DayView days={7} onAdd={onAdd} />
    </div>
  );
};

export default WeekView;
