"use client";

import React, { ComponentProps, useMemo, useRef, useState } from "react";

import { weekDays, weekDaysOrder } from "@/data/general/datetime";
import { useActiveDay, useActiveMonth, useActiveYear, useCalendarActions, useEvents, useShowOutsideDays, useWeekDayStart, useWindowSize } from "@/data/stores";
import { useMounted } from "@/lib/hooks";
import { PlusIcon } from "@/lib/ui/svgs/icons";
import { getDaysInMonth, getFirstDayOfMonth, getRelativeMonth } from "@/lib/utils/datetime.utils";
import { throttle } from "@/lib/utils/general.utils";
import { CalendarDay } from "@/types/calendar.types";

import { DayCard } from "..";
import styles from "./MonthView.module.scss";

export interface MonthViewProps extends ComponentProps<"div"> {
  onAdd?: any
  mode?: "full" | "mini"
  month?: number
  hideEmptyCells?: boolean
}

const daysInWeek = 7;

const getMonthDetails = (
  year: number, month: number,
  totalDays: number = 42, weekDayStart: 0 | 1 = 0,
): CalendarDay[] => {
  const days: CalendarDay[] = [];

  const rawFirstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const firstDayOfMonth = (rawFirstDay + weekDayStart * 6) % 7;

  const daysInCurrentMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const daysInPrevMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;


  for (let i = 0; i < firstDayOfMonth; i++) {
    const day = daysInPrevMonth - firstDayOfMonth + i + 1;
    days.push({
      monthType: "prev",
      date: [prevYear, prevMonth, day],
    });
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    days.push({
      monthType: "curr",
      date: [year, month, day],
    });
  }

  const remaining = totalDays - days.length;
  for (let day = 1; day <= remaining; day++) {
    days.push({
      monthType: "next",
      date: [nextYear, nextMonth, day],
    });
  }

  return days;
};

const MonthView = ({
  className, onAdd, mode, month, hideEmptyCells,
}: MonthViewProps) => {
  const windowSize = useWindowSize();
  const activeDay = useActiveDay();
  const activeMonth = useActiveMonth();
  const activeYear = useActiveYear();
  const weekDayStart = useWeekDayStart();
  const showOutsideDays = useShowOutsideDays();
  const events = useEvents();
  const { setStore, setField, getSegregatedEvents } = useCalendarActions();

  const isMounted = useMounted();

  const [dragOverDay, setDragOverDay] = useState<string>();
  const [selection, setSelection] = useState<[string, string]>(["", ""]);

  const containerRef = useRef<HTMLDivElement>(null);

  const monthToUse = month ?? activeMonth;

  const daysInCurrMonth = getDaysInMonth(activeYear, monthToUse);
  const firstDayOfCurrMonth = (getFirstDayOfMonth(activeYear, monthToUse) + weekDayStart * 6) % 7;

  const date = new Date();
  const totalCells = daysInWeek * ((firstDayOfCurrMonth > 4 && daysInCurrMonth > 29) ? 6 : 5);

  const compact = mode === "mini" || (!!windowSize?.[0] && windowSize[0] < 700);

  const handleDayClick = (payload: any) => {
    setStore({
      activeDay: payload.day,
      activeMonth: payload.month,
      activeYear: payload.year,
      mode: "day",
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dayCard = (e.target as HTMLDivElement).closest("[data-day]");
    const dayDropped = dayCard?.getAttribute("data-day");
    if (dayDropped) {
      const [y, m, d] = dayDropped.split("-").map(Number);
      const eventId = e.dataTransfer.getData("text/plain");
      const newEvents = events.map(ev => {
        if (eventId === ev.id) {
          const newStart = new Date(ev.start || "");
          const newEnd = new Date(ev.end || "");
          const evDurInMins = ((newEnd as any) - (newStart as any)) / (1000 * 60);
          newStart.setFullYear(y);
          newEnd.setFullYear(newStart.getFullYear());
          newStart.setMonth(m);
          newEnd.setMonth(newStart.getMonth());
          newStart.setDate(d);
          newEnd.setDate(d);
          newEnd.setHours(newStart.getHours());
          newEnd.setMinutes(newStart.getMinutes() + evDurInMins);
          return {
            ...ev,
            start: newStart.toUTCString(),
            end: newEnd.toUTCString(),
          };
        }
        return ev;
      });
      setField("events", newEvents);
    }
    setDragOverDay(undefined);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const dayCellElem = (e.target as HTMLElement).closest("[data-day]");
    const dayDetails = dayCellElem?.getAttribute("data-day");
    if (dayDetails) {
      setSelection(currSelection => [currSelection[0], dayDetails]);
    }
  };

  const handlePointerUp = () => {
    containerRef.current?.removeEventListener("pointermove", (handlePointerMove as any));
    setSelection(["", ""]);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const evElem = (e.target as HTMLElement).closest("[data-id]");
    if (evElem) {
      return;
    }
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.addEventListener("pointerup", handlePointerUp, { once: true });
      containerRef.current.addEventListener("pointermove", (handlePointerMove as any));
    }
    const dayCellElem = (e.target as HTMLElement).closest("[data-day]");
    const dayDetails = dayCellElem?.getAttribute("data-day");
    if (dayDetails) {
      setSelection([dayDetails, ""]);
    }
  };

  const daysDetails = getMonthDetails(
    activeYear, monthToUse, totalCells, weekDayStart,
  );

  const getDayState = (dayDetail: CalendarDay) => {
    const d = new Date();
    if (d.getFullYear() === dayDetail.date[0] && d.getMonth() === dayDetail.date[1] && date.getDate() === dayDetail.date[2]) {
      return "today";
    }
    if (monthToUse === dayDetail.date[1] && activeDay === dayDetail.date[2]) {
      return "active";
    }
    return "";
  };

  const isDragOver = (dayDetail: CalendarDay) => {
    if (dragOverDay === dayDetail.date.join("-")) {
      return true;
    }
    if (selection[0] && selection[1]) {
      const [sy, sm, sd] = selection[0].split("-").map(Number);
      const [ey, em, ed] = selection[1].split("-").map(Number);
      const sDate = new Date(sy, sm, sd);
      const eDate = new Date(ey, em, ed);

      const earlierDate = sDate <= eDate ? sDate : eDate;
      const laterDate = sDate > eDate ? sDate : eDate;

      const cMon = getRelativeMonth(monthToUse, dayDetail.monthType);
      const cDate = new Date(activeYear, cMon, Number(dayDetail.date[2]));
      if (cDate >= earlierDate && cDate <= laterDate) {
        return true;
      }
    }
    return false;
  };

  const dragEvts: {
    [key: string]: React.DragEventHandler<HTMLDivElement>
  } = compact ? {} : {
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const dragOverDayElem = (e.target as HTMLElement).closest("[data-day]");
      const day = dragOverDayElem?.getAttribute("data-day");
      if (day) {
        setDragOverDay(day);
      }
    },
    onDrop: handleDrop,
    onDragStart: (e) => {
      const evElem = (e.target as HTMLElement).closest("[data-id]");
      const evId = evElem?.getAttribute("data-id");
      if (evId) {
        e.dataTransfer.setData("text/plain", evId);
      }
    },
    onDragEnd: () => {
      setDragOverDay(undefined);
    },
    onDragExit: () => {
      setDragOverDay(undefined);
    }
  };

  return isMounted ? (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      {...dragEvts}
      onPointerDown={windowSize[0] > 700 ? handlePointerDown : undefined}
      onPointerLeave={() => setSelection(["", ""])}
    >
      {
        weekDaysOrder.map((_, idx: number) => {
          const weekDayKey: string = weekDaysOrder[(weekDayStart + idx) % weekDaysOrder.length];
          return (
            <div key={weekDayKey} className={`${styles.header_cell}`} data-compact={compact}>
              {weekDays[weekDayKey].label.slice(0, 3)}
              {
                !compact ? (
                  <button className={styles.add_btn} onClick={onAdd}>
                    <PlusIcon className={styles.add_icon} />
                  </button>
                ) : null
              }
            </div>
          );
        })
      }
      {
        daysDetails.map((dayDetail, idx: number) => {
          const candidate = (idx + 1) % 7;
          return (
            <DayCard
              day={dayDetail.date[2]} month={dayDetail.date[1]} year={dayDetail.date[0]}
              monthType={dayDetail.monthType}
              key={dayDetail.date.join("-")}
              data-day-state={getDayState(dayDetail)}
              events={getSegregatedEvents()?.[dayDetail.date[0]]?.[dayDetail.date[1]]?.[dayDetail.date[2]]}
              onAdd={onAdd}
              onDayClick={compact ? onAdd : handleDayClick}
              compact={compact}
              isDragOver={isDragOver(dayDetail)}
              data-off={candidate === 0 || candidate === Math.abs(1 - 7 * weekDayStart) || dayDetail.monthType !== "curr"}
              // data-selected={true}
              hideOutsideDays={!showOutsideDays || hideEmptyCells}
              data-no-empty={dayDetail.monthType !== "curr" ? (!showOutsideDays || hideEmptyCells) : false}
            />
          );
        })
      }
    </div>
  ) : null;
};

export default MonthView;
