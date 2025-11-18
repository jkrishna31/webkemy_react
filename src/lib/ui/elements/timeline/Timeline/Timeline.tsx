import React, { ComponentProps, ReactNode } from "react";

import { CheckMarkIcon, CrossIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Timeline.module.scss";

export interface TimelineEntry {
  id: string
  left?: ReactNode
  right?: ReactNode
  mark?: ReactNode
  subEntries?: TimelineEntry[]
  status?: "success" | "fail" | "current" | "pending"
}

export interface TimelineProps extends ComponentProps<"ul"> {
  timeline: TimelineEntry[]
  entryClass?: string
  flow?: "x" | "y"
}

const Timeline = ({
  className, children, timeline, entryClass, flow = "y",
  ...props
}: TimelineProps) => {
  const renderTimeline = (timeline: TimelineEntry[], sub?: boolean) => {
    return (
      <ul
        className={classes(styles.wrapper, !sub && styles.root_wrapper, className)}
        data-flow={flow}
        {...props}
      >
        {
          timeline?.map((entry) => (
            <li key={entry.id} className={entryClass}>
              <div className={classes(sub ? styles.sub_entry : styles.entry)}>
                {entry.left ? (
                  <div className={styles.left}>
                    {entry.left}
                  </div>
                ) : null}
                <div className={styles.stop} data-status={entry.status}>
                  <div className={styles.mark}>
                    {
                      (entry.status === "success" && !sub) ? (
                        <CheckMarkIcon className={styles.check} />
                      ) : null
                    }
                    {
                      (entry.status === "fail" && !sub) ? (
                        <CrossIcon className={styles.cross} />
                      ) : null
                    }
                  </div>
                </div>
                {entry.right ? (
                  <div className={styles.right}>
                    {entry.right}
                  </div>
                ) : null}
              </div>
              {entry.subEntries ? renderTimeline(entry.subEntries, true) : null}
            </li>
          ))
        }
      </ul>
    );
  };

  return renderTimeline(timeline);
};

export default Timeline;
