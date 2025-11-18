"use client";

import React, { ComponentProps, useCallback, useMemo, useRef, useState } from "react";

import { ResizableContainer } from "@/components/common/containers";
import { Resizers } from "@/components/common/containers/ResizableContainer";
import { weekDays, weekDaysOrder } from "@/data/general/datetime";
import { useCalendarActions } from "@/data/stores";
import { CalendarEvent, EventBadge } from "@/lib/ui/elements/calendar/EventBadge";
import { getRelativeMonth } from "@/lib/utils/datetime.utils";
import { debounce, isNullish } from "@/lib/utils/general.utils";
import { classes } from "@/lib/utils/style.utils";
import { CalendarDay } from "@/types/calendar.types";

import styles from "./DayView.module.scss";

export const DAY_CELL_SIZE_IN_PX = 50;

export interface DayViewProps extends ComponentProps<"div"> {
  day: number;
  month: number;
  year: number;
  week?: number;
  weekDayStart?: 0 | 1;
  timeFormat?: "12h" | "24h";
  days?: number;
  onAdd?: any;
  events?: CalendarEvent[];
}

const getCoords = (ev: Partial<CalendarEvent>) => {
  let fromTopInRem = null, fromBottomInRem = null;
  const width = "100%";

  if (ev.start) {
    const date = new Date(ev.start);
    const startHour = date.getHours();
    const startMinutes = date.getMinutes();
    const startInMins = startHour * 60 + startMinutes;
    fromTopInRem = Math.fround((1 / 12) * startInMins); // 1/12 = rem per min
  }
  if (ev.end) {
    const date = new Date(ev.end);
    const endHours = date.getHours();
    const endMinutes = date.getMinutes();
    const endInMins = endHours * 60 + endMinutes;
    fromBottomInRem = Math.fround((1 / 12) * endInMins);
  }

  if (!ev.start && !ev.end) {
    return {
      top: 0,
      bottom: 0,
      height: "100%",
      width,
    };
  }

  if (fromTopInRem !== null && fromBottomInRem !== null) {
    return {
      top: `${fromTopInRem}rem`,
      left: 0,
      height: `${fromBottomInRem - fromTopInRem}rem`,
      width,
    };
  } else if (fromTopInRem !== null) {
    return {
      top: `${fromTopInRem}rem`,
      left: 0,
      bottom: 0,
      height: `${120 - fromTopInRem}rem`, // 120 = DAY_CELL_SIZE_IN_PX/10 * 24
      width,
    };
  } else if (fromBottomInRem !== null) {
    return {
      top: 0,
      left: 0,
      height: `${fromBottomInRem}rem`,
      width,
    };
  }

  return {};
};

const getDaysDetails = (
  date: Date, weekDayStart: 0 | 1 = 0,
): CalendarDay[] => {
  const days: CalendarDay[] = [];

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const dayOfWeek = date.getDay();
  const offsetToStart = (dayOfWeek - weekDayStart + 7) % 7;
  const startDate = new Date(year, month, day - offsetToStart);

  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const dYear = d.getFullYear();
    const dMonth = d.getMonth();
    const dDate = d.getDate();

    let monthType: CalendarDay["monthType"] = "curr";
    if (dMonth < month || dYear < year) monthType = "prev";
    else if (dMonth > month || dYear > year) monthType = "next";

    days.push({
      date: [dYear, dMonth, dDate],
      monthType,
    });
  }
  return days;
};

const DayView = ({
  day, month, year, week, weekDayStart = 0, timeFormat = "12h",
  events,
  onAdd,
  className,
  days = 1,
}: DayViewProps) => {
  const { setStore, setField, getSegregatedEvents } = useCalendarActions();

  const segregatedEvents = getSegregatedEvents();

  const ref = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const timeBadgeRef = useRef<HTMLDivElement>(null);

  const [timeMarker, setTimeMarker] = useState(false);
  const [draggingEvent, setDraggingEvent] = useState<string>();
  const [resizingEvent, setResizingEvent] = useState<string>();
  const [dragOverCell, setDragOverCell] = useState<string>();
  const [selection, setSelection] = useState<[string, string]>(["", ""]);
  const [newEvSpan, setNewEvSpan] = useState<{
    start: string
    end: string
  }>();
  const [hideDraggable, setHideDraggable] = useState(false);

  const currDate = new Date();
  const currMonthAndYear = month === currDate.getMonth() && year === currDate.getFullYear();

  const weekDetails: CalendarDay[] = days > 1 ? getDaysDetails(new Date(year, month, day), weekDayStart) : [{ date: [year, month, day], monthType: "curr" }];

  const getTime = useCallback((idx: number) => {
    const integerPart = Math.floor(idx);
    const decimalPart = idx - integerPart;
    const inMins = String(decimalPart * 60).padStart(2, "0");

    return timeFormat === "12h" ? (
      `${integerPart % 12 || 12}:${inMins} ${integerPart > 11 ? "pm" : "am"}`
    ) : (
      String(integerPart).padStart(2, "0") + `:${inMins}`
    );
  }, [timeFormat]);

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const evElem = (e.target as HTMLElement).closest("[data-id]");
    if (evElem) {
      return;
    }

    e.preventDefault();

    const hrCellElem = (e.target as HTMLElement).closest("[data-hour]");
    const hrDetails = hrCellElem?.getAttribute("data-hour");
    if (hrDetails) {
      setSelection([hrDetails, ""]);
    }

    const refElem = ref.current;
    if (!refElem) {
      return;
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
      const hrCellElem = (e.target as HTMLElement).closest("[data-hour]");
      const hrDetail = hrCellElem?.getAttribute("data-hour");
      if (hrDetail) {
        setSelection(currSelection => [currSelection[0], hrDetail]);
      }
    };

    const handlePointerUp = () => {
      if (selection[0]) {
        const [, sDay, sHr, sMonType] = selection[0].split(" ");
        const [, eDay, eHr, eMonType] = selection[1].split(" ");
        const sDate = new Date(year, getRelativeMonth(month, sMonType), Number(sDay), Number(sHr));
        const eDate = new Date(year, getRelativeMonth(month, eMonType), Number(eDay), Number(eHr));
        const earlierDate = sDate <= eDate ? sDate : eDate;
        const laterDate = sDate <= eDate ? eDate : sDate;
        laterDate.setHours(laterDate.getHours() + 1);
        setNewEvSpan({
          start: earlierDate.toUTCString(),
          end: laterDate.toUTCString(),
        });
        setSelection(["", ""]);
      }
      refElem.removeEventListener("pointermove", handlePointerMove as any);
    };

    refElem.addEventListener("pointerup", handlePointerUp as any, { once: true });
    refElem.addEventListener("pointermove", handlePointerMove as any);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
    const evElem = (e.target as HTMLElement).closest("[data-id]");
    if (evElem) {
      return;
    }
    const hrCellElem = (e.target as HTMLElement).closest("[data-hour]");
    const hrDetails = hrCellElem?.getAttribute("data-hour");
    if (hrDetails) {
      const [, cDay, cHr, cMonType] = hrDetails.split(" ");
      const d = new Date(year, getRelativeMonth(month, cMonType), Number(cDay), Number(cHr));
      const start = d.toUTCString();
      d.setHours(d.getHours() + 1);
      const end = d.toUTCString();
      setNewEvSpan({ start, end });
    }
  };

  const getUpdatedDatetime = (
    start: string, end: string, payload: {
      hour: number
      day: number
      month: number
    }
  ) => {
    const newStart = new Date(start || "");
    const newEnd = new Date(end || "");
    const durInMins = ((newEnd as any) - (newStart as any)) / (1000 * 60);
    if (payload.month) {
      newStart.setMonth(payload.month);
    }
    if (payload.day) {
      newStart.setDate(payload.day);
    }
    if (!isNullish(payload.hour)) {
      newStart.setHours(payload.hour);
    }
    newEnd.setMonth(newStart.getMonth());
    newEnd.setDate(newStart.getDate());
    newEnd.setHours(newStart.getHours());
    newEnd.setMinutes(newStart.getMinutes() + durInMins);
    return { start: newStart.toUTCString(), end: newEnd.toUTCString() };
  };

  const handleDragEnd = () => {
    setDragOverCell(undefined);
    setDraggingEvent(undefined);
    setHideDraggable(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dayCard = (e.target as HTMLDivElement).closest("[data-hour]");
    const dayTimeDropped = dayCard?.getAttribute("data-hour");
    if (dayTimeDropped) {
      const evId = e.dataTransfer.getData("text/plain");
      const [_, dayDropped, hourDropped, monthType] = dayTimeDropped.split(" ");
      const relativeMonth = getRelativeMonth(month, monthType);
      if (evId === "new" && newEvSpan?.start) {
        const newDates = getUpdatedDatetime(newEvSpan.start, newEvSpan.end, {
          month: relativeMonth,
          day: Number(dayDropped),
          hour: Number(hourDropped),
        });
        setNewEvSpan({ ...newDates });
      } else {
        const newEvents = events?.map(ev => {
          if (ev.id === evId) {
            const newDates = getUpdatedDatetime(ev.start ?? "", ev.end ?? "", {
              month: relativeMonth,
              day: Number(dayDropped),
              hour: Number(hourDropped),
            });
            return {
              ...ev,
              ...newDates,
            };
          }
          return ev;
        });
        setField("events", newEvents);
      }
    }
    handleDragEnd();
  };

  const handleMove = useCallback((e: PointerEvent, evId?: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect && ref.current && timeLineRef.current && timeBadgeRef.current) {
      const y = e.clientY - rect?.top + ref.current?.scrollTop;
      const step = DAY_CELL_SIZE_IN_PX / 4;
      const stepMultiplier = Math.round(y / step);
      const yPosInPx = stepMultiplier * step;
      timeLineRef.current.style.top = `${yPosInPx}px`;
      timeBadgeRef.current.style.top = `${yPosInPx}px`;
      timeBadgeRef.current.textContent = getTime(yPosInPx / DAY_CELL_SIZE_IN_PX);
      setTimeMarker(true);
      setResizingEvent(evId);
    }
  }, [getTime]);

  const handleUp = useCallback(() => {
    // get the updated time which was saved from handleMove last call in state
    setTimeMarker(false);
    setResizingEvent(undefined);
  }, []);

  const debouncedMoveHandler = useMemo(() => debounce(handleMove, 6), [handleMove]);

  const debouncedUpHandler = useMemo(() => debounce(handleUp, 6), [handleUp]);

  const dragEvts: {
    [key: string]: React.DragEventHandler<HTMLDivElement>
  } = {
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const dragOverDayElem = (e.target as HTMLElement).closest("[data-hour]");
      const hourState = dragOverDayElem?.getAttribute("data-hour");
      if (hourState) {
        setDragOverCell(hourState);
      }
    },
    onDrop: handleDrop,
    onDragStart: (e) => {
      const evElem = (e.target as HTMLElement).closest("[data-id]");
      const evId = evElem?.getAttribute("data-id");
      if (evId) {
        setDraggingEvent(evId);
        e.dataTransfer.setData("text/plain", evId);
      }
      setTimeout(() => {
        if (evElem && (evElem as HTMLElement).parentElement) {
          const p = (evElem as HTMLElement).parentElement;
          if (p) {
            setHideDraggable(true);
          }
        }
      }, 0);
    },
    onDragEnd: handleDragEnd,
  };

  const getHourState = (cellId: string) => {
    if (dragOverCell === cellId) {
      return "active";
    }
    if (selection[0] && selection[1]) {
      const [, cDay, cHr, cMonType] = cellId.split(" ");
      const [, sDay, sHr, sMonType] = selection[0].split(" ");
      const [, eDay, eHr, eMonType] = selection[1].split(" ");
      let start, end;
      const sNum: [number, number, string] = [Number(sDay), Number(sHr), sMonType];
      const eNum: [number, number, string] = [Number(eDay), Number(eHr), eMonType];
      if (sDay === eDay) {
        if (Number(sHr) <= Number(eHr)) {
          start = sNum;
          end = eNum;
        } else {
          start = eNum;
          end = sNum;
        }
      } else {
        if (Number(sDay) <= Number(eDay)) {
          start = sNum;
          end = eNum;
        } else {
          start = eNum;
          end = sNum;
        }
      }
      if (start[0] === end[0] && end[0] === Number(cDay)) {
        if (Number(cHr) >= start[1] && Number(cHr) <= end[1]) {
          return "active";
        }
        return "";
      }
      if (Number(cDay) === start[0] && Number(cHr) >= start[1]) {
        return "active";
      } else if (Number(cDay) > start[0] && Number(cDay) < end[0]) {
        return "active";
      } else if (Number(cDay) === end[0] && Number(cHr) <= end[1]) {
        return "active";
      }
    }
    return "";
  };

  const renderNewEventSpanner = (idx: number) => {
    if (!newEvSpan?.start) {
      return null;
    }
    const day = weekDetails[idx];
    const mon = getRelativeMonth(month, day.monthType);
    const date = new Date(newEvSpan.start);
    if (!(date.getDate() === day.date[2] && date.getMonth() === mon)) {
      return null;
    }
    return (
      <ResizableContainer
        key="new"
        className={styles.ev_wrapper}
        style={{
          ...getCoords(newEvSpan),
        }}
        allowedResizers={["t", "b"]}
        handleMove={debouncedMoveHandler}
        handleUp={debouncedUpHandler}
        payload="new"
      >
        <EventBadge
          event={newEvSpan as CalendarEvent}
          className={styles.ev_badge}
          timeFormat={timeFormat}
          data-id="new"
          draggable
        // onDragEnd={handleDragEnd}
        />
      </ResizableContainer>
    );
  };

  return (
    <div
      className={classes(styles.container, className)}
    >
      <div className={classes(styles.col, styles.hr_col)}>
        {
          days > 1 ? (
            <div className={styles.week_number}>{"W"}{week}</div>
          ) : null
        }
        <div className={styles.hour_marks}>
          {
            Array.from({ length: 24 }).map((_, idx) => {
              return (
                <div key={`hr-${idx}`} className={styles.hr_cell}>
                  {getTime(idx)}
                </div>
              );
            })
          }
          <div
            className={styles.time_badge} ref={timeBadgeRef}
            style={{ display: !timeMarker ? "none" : "" }}
          >
          </div>
        </div>
      </div>
      <div className={styles.days_wrapper}>
        {
          days > 1 ? (
            <div className={styles.weekday_header_row}>
              {
                Array.from({ length: days }).map((_, idx) => {
                  const weekDayKey: string = weekDaysOrder[(weekDayStart + idx) % weekDaysOrder.length];
                  return (
                    <div
                      key={weekDayKey} className={styles.weekday_header_cell}
                      data-month={weekDetails[idx].monthType}
                      data-day-state={
                        (currMonthAndYear && currDate.getDate() === weekDetails[idx].date[2])
                          ? "today"
                          : day === weekDetails[idx].date[2]
                            ? "active"
                            : ""
                      }
                    >
                      <button
                        onClick={() => setStore({
                          activeDay: weekDetails[idx].date[2],
                          activeMonth: weekDetails[idx].date[1],
                          mode: "day",
                        })}
                      >
                        {weekDetails[idx].date[2]} {weekDays[weekDayKey].label.slice(0, 3)}
                      </button>
                    </div>
                  );
                })
              }
            </div>
          ) : null
        }
        <div
          className={styles.day_cols_wrapper} ref={ref}
          {...dragEvts}
          // onPointerDown={windowSize[0] > 700 ? handlePointerDown : undefined}
          onDoubleClick={handleDoubleClick}
        >
          {
            Array.from({ length: days }).map((_, idx) => {
              const mon = getRelativeMonth(month, weekDetails[idx].monthType);
              const yr = year;
              return (
                <div
                  key={idx}
                  className={classes(styles.col, styles.day_col, idx === days - 1 && styles.last_day_col)}
                  data-day={weekDetails[idx].date[2]}
                  data-day-state={idx === 2 ? "active" : ""}
                >
                  {
                    Array.from({ length: 24 }).map((_, idx2) => {
                      const cellId = `${idx} ${weekDetails[idx].date[2]} ${idx2} ${weekDetails[idx].monthType}`;
                      return (
                        <div
                          key={`day-${idx2}`} className={styles.day_cell}
                          data-hour={cellId}
                          data-hour-state={getHourState(cellId)}
                        ></div>
                      );
                    })
                  }
                  {
                    segregatedEvents[yr]?.[mon]?.[weekDetails[idx].date[2]]?.map(ev => {
                      const coords = getCoords(ev);
                      const resizers: Resizers[] = [];
                      if (ev.start) resizers.push("t");
                      if (ev.end) resizers.push("b");
                      return (
                        <ResizableContainer
                          key={ev.id}
                          className={styles.ev_wrapper}
                          style={{
                            ...coords,
                            ...{
                              visibility: ((draggingEvent && draggingEvent !== ev.id) || (resizingEvent && resizingEvent !== ev.id) || (selection[0] && selection[1]) || hideDraggable)
                                ? "hidden"
                                : "visible",
                            },
                          }}
                          allowedResizers={resizers}
                          handleMove={debouncedMoveHandler}
                          handleUp={debouncedUpHandler}
                          payload={ev.id}
                        >
                          <EventBadge
                            event={ev}
                            className={styles.ev_badge}
                            timeFormat={timeFormat}
                            data-id={ev.id}
                            draggable
                          // onDragEnd={handleDragEnd}
                          />
                        </ResizableContainer>
                      );
                    })
                  }
                  {renderNewEventSpanner(idx)}
                </div>
              );
            })
          }
          <div
            ref={timeLineRef}
            className={styles.time_crosshair}
            style={{ display: !timeMarker ? "none" : "" }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
