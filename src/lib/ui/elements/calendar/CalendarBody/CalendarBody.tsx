import React, { ComponentProps } from "react";

import { useCalendarMode } from "@/data/stores";
import { DayViewProps } from "@/lib/ui/elements/calendar/DayView/DayView";
import { MonthViewProps } from "@/lib/ui/elements/calendar/MonthView/MonthView";
import { WeekViewProps } from "@/lib/ui/elements/calendar/WeekView/WeekView";
import { YearViewProps } from "@/lib/ui/elements/calendar/YearView/YearView";

import { DayView, MonthView, WeekView, YearView } from "..";
import styles from "./CalendarBody.module.scss";

export interface CalendarBodyProps extends ComponentProps<"div"> {
  monthViewProps?: MonthViewProps
  dayViewProps?: DayViewProps
  weekViewProps?: WeekViewProps
  yearViewProps?: YearViewProps
  onAdd?: any
}

const CalendarBody = ({
  className, onAdd,
  dayViewProps, weekViewProps, monthViewProps, yearViewProps,
}: CalendarBodyProps) => {
  const calendarMode = useCalendarMode();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {
        calendarMode === "day" ? (
          <DayView
            onAdd={onAdd}
            {...dayViewProps}
          />
        ) : null
      }
      {
        calendarMode === "week" ? (
          <WeekView
            onAdd={onAdd}
            {...weekViewProps}
          />
        ) : null
      }
      {
        calendarMode === "month" ? (
          <MonthView
            onAdd={onAdd}
            {...monthViewProps}
          />
        ) : null
      }
      {
        calendarMode === "year" ? (
          <YearView
            onAdd={onAdd}
            {...yearViewProps}
          />
        ) : null
      }
    </div>
  );
};

export default CalendarBody;
