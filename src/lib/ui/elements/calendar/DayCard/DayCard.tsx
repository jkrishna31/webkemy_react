import React, { ComponentProps } from "react";

import { CalendarEvent } from "@/lib/ui/elements/calendar/EventBadge/EventBadge";
import { PlusIcon } from "@/lib/ui/svgs/icons";

import { EventBadge } from "..";
import styles from "./DayCard.module.scss";

export interface DayCardProps extends ComponentProps<"div"> {
  monthType: "prev" | "curr" | "next"
  date?: number
  events?: CalendarEvent[]
  onAdd?: any
  onDayClick?: any
  compact?: boolean
  loading?: boolean
  isDragOver?: boolean
  day?: number
  month?: number
  year?: number
  hideOutsideDays?: boolean
}

const DayCard = ({
  day, month, year, monthType,
  events, onAdd, onDayClick, isDragOver,
  children, className, compact, loading, hideOutsideDays,
  ...props
}: DayCardProps) => {
  if (hideOutsideDays && monthType == "prev") {
    return (
      <div className={`${styles.card} ${styles.pm_date_card}`} {...props}>
      </div>
    );
  }

  if (hideOutsideDays && monthType === "next") {
    return (
      <div className={`${styles.card} ${styles.nm_date_card}`} {...props}>
      </div>
    );
  }

  const totalEvents = events?.length ?? 0;

  const renderEvents = () => {
    if (!totalEvents || loading) {
      return null;
    }
    return (
      <div className={`${compact ? styles.dots_wrapper : styles.badges_wrapper} scroll_thin`}>
        {
          events?.map((event: CalendarEvent, i: number) => (
            <EventBadge
              key={i}
              className={styles.ev}
              event={event}
              data-clamp={totalEvents > 2}
              compact={compact}
              draggable
              data-id={event.id}
              day={day} month={month} year={year}
            />
          ))
        }
      </div>
    );
  };

  return (
    <div
      className={`${styles.card} ${className}`}
      {...props}
      data-compact={compact}
      data-day={`${year}-${month}-${day}`}
      data-drag-over={isDragOver}
      data-adjacent={monthType !== "curr"}
    >
      <div className={styles.cell_header}>
        <button className={styles.date_btn} onClick={() => onDayClick({ day, month, year })}>
          {day}
        </button>
        {
          (!loading && !compact) ? (
            <button
              className={styles.add_btn}
              onClick={() => onAdd?.({ day, month, year })}
            >
              <PlusIcon className={styles.add_icon} />
            </button>
          ) : null
        }
      </div>
      {renderEvents()}
      {children}
    </div>
  );
};

export default DayCard;
