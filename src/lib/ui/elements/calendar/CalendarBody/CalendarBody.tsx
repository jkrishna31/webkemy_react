import { ComponentProps } from "react";

import { useActiveDay, useActiveMonth, useActiveWeek, useActiveYear, useCalendarActions, useCalendarMode, useEvents, useShowOutsideDays, useTimeFormat, useWeekDayStart } from "@/data/stores";
import { classes } from "@/lib/utils/style.utils";

import { DayView, DayViewProps, MonthView, MonthViewProps, WeekView, WeekViewProps, YearView, YearViewProps } from "..";
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
  const weekDayStart = useWeekDayStart();
  const timeFormat = useTimeFormat();
  const showOutsideDays = useShowOutsideDays();
  const events = useEvents();

  const activeDay = useActiveDay();
  const activeMonth = useActiveMonth();
  const activeYear = useActiveYear();
  const activeWeek = useActiveWeek();

  const { setStore } = useCalendarActions();

  const updateWeek = (week?: number) => {
    setStore({ activeWeek: week });
  };

  return (
    <div className={classes(styles.wrapper, className)}>
      {
        calendarMode === "day" ? (
          <DayView
            day={activeDay} month={activeMonth} year={activeYear} week={activeWeek}
            weekDayStart={weekDayStart} timeFormat={timeFormat}
            events={events}
            onAdd={onAdd}
            {...dayViewProps}
          />
        ) : null
      }
      {
        calendarMode === "week" ? (
          <WeekView
            day={activeDay} month={activeMonth} year={activeYear} week={activeWeek}
            weekDayStart={weekDayStart} timeFormat={timeFormat}
            onAdd={onAdd} setWeek={updateWeek}
            {...weekViewProps}
          />
        ) : null
      }
      {
        calendarMode === "month" ? (
          <MonthView
            day={activeDay} month={activeMonth} year={activeYear}
            weekDayStart={weekDayStart}
            onAdd={onAdd} hideEmptyCells={!showOutsideDays}
            events={events}
            {...monthViewProps}
          />
        ) : null
      }
      {
        calendarMode === "year" ? (
          <YearView
            day={activeDay} month={activeMonth} year={activeYear}
            weekDayStart={weekDayStart}
            onAdd={onAdd}
            {...yearViewProps}
          />
        ) : null
      }
    </div>
  );
};

export default CalendarBody;
