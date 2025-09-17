import React, { ComponentProps } from "react";

import { formatTime } from "@/lib/utils/datetime.utils";

import styles from "./EventBadge.module.scss";

export interface CalendarEvent {
  id: string
  title: string
  desc?: string
  start?: string
  end?: string
  color?: string
  repeat?: boolean
}

export interface EventBadgeProps extends ComponentProps<"div"> {
  day?: number
  month?: number
  year?: number
  badgeColor?: "green" | "red" | "blue" | "yellow" | "orange"
  compact?: boolean
  timeFormat?: "12h" | "24h"
  event: CalendarEvent
  onBadgeClick?: any
}

const getBadgeClasses = (event: CalendarEvent) => {
  const boundaryClasses = [];
  if (event.start) {
    boundaryClasses.push(styles.start);
  }
  if (event.end) {
    boundaryClasses.push(styles.end);
  }
  if (event.color) {
    boundaryClasses.push(styles[event.color]);
  }
  return boundaryClasses.join(" ");
};

const EventBadge = ({
  day, month, year, timeFormat = "24h",
  children, className, event, compact, onBadgeClick,
  ...props
}: EventBadgeProps) => {
  // container will have click listener (day/month view)

  const renderCompactLabel = () => {
    return (
      <p>
        {
          (event.start || event.end) ? (
            <time className={styles.time}>
              {formatTime((event.start || event.end)!, "en-US", timeFormat)}
            </time>
          ) : null
        }
        {event.title}
      </p>
    );
  };

  return compact ? (
    <div
      key={event.title}
      className={`scroll_invisible ${styles.ev_dot} ${event.color ? styles[`${event.color}_bg`] : ""}`}
      aria-label={event.title}
    ></div>
  ) : (
    <div
      className={`${styles.badge} ${getBadgeClasses(event)} ${styles.lc} ${className}`}
      onClick={onBadgeClick}
      {...props}
    >
      {
        false ? (
          renderCompactLabel()
        ) : (
          <>
            <p>{event.title}</p>
            {
              (event.start || event.end) ? (
                <div className={styles.time_wrapper}>
                  {
                    event.start ? (
                      <time className={styles.time}>
                        {formatTime(event.start, "en-US", timeFormat)}
                      </time>
                    ) : "_"
                  }
                  {" - "}
                  {
                    event.end ? (
                      <time className={styles.time}>
                        {formatTime(event.end, "en-US", timeFormat)}
                      </time>
                    ) : "_"
                  }
                </div>
              ) : null
            }
          </>
        )
      }
      {children}
    </div>
  );
};

export default EventBadge;
