import React, { ComponentProps } from "react";

import { PlusIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import { CalendarEvent, EventBadge } from "..";
import styles from "./DayCard.module.scss";

export interface DayCardProps extends ComponentProps<"div"> {
  monthType: "prev" | "curr" | "next";
  date?: number;
  events?: CalendarEvent[];
  onAdd?: any;
  onDayClick?: any;
  compact?: boolean;
  loading?: boolean;
  isDragOver?: boolean;
  day?: number;
  month?: number;
  year?: number;
  hideOutsideDays?: boolean;
  disabled?: boolean;
}

const DayCard = ({
  day, month, year, monthType,
  events, onAdd, onDayClick, isDragOver, disabled,
  children, className, compact, loading, hideOutsideDays,
  ...props
}: DayCardProps) => {
  if (hideOutsideDays && monthType == "prev") {
    return (
      <div className={classes(styles.card, styles.pm_date_card)} {...props}>
      </div>
    );
  }

  if (hideOutsideDays && monthType === "next") {
    return (
      <div className={classes(styles.card, styles.nm_date_card)} {...props}>
      </div>
    );
  }

  const totalEvents = events?.length ?? 0;

  const renderEvents = () => {
    if (!totalEvents || loading) {
      return null;
    }
    return (
      <div className={classes(compact ? styles.dots_wrapper : styles.badges_wrapper, "scroll_thin")}>
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
      className={classes(styles.card, className)}
      {...props}
      data-compact={compact}
      data-day={`${year}-${month}-${day}`}
      data-drag-over={isDragOver}
      data-adjacent={monthType !== "curr"}
      data-disabled={disabled}
    >
      <div className={styles.cell_header}>
        <button
          className={styles.date_btn}
          onClick={() => onDayClick({ day, month, year })}
          disabled={disabled}
        >
          {day}
        </button>
        {
          (!loading && !compact) ? (
            <button
              className={styles.add_btn}
              onClick={() => onAdd?.({ day, month, year })}
              disabled={disabled}
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
