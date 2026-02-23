"use client";

import { CSSProperties } from "react";

import { useCurrentDateTime } from "@/lib/hooks/useCurrentTime";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Clock.module.scss";

const Clock = () => {
  const currDateTime = useCurrentDateTime();

  return (
    <div className={styles.clock}>
      <div className={styles.center}></div>

      <div
        className={styles.hour_hand}
        style={{ "--angle": `${180 + currDateTime.getHours() * 30}deg` } as CSSProperties}
      ><div></div></div>
      <div
        className={styles.min_hand}
        style={{ "--angle": `${180 + currDateTime.getMinutes() * 6}deg` } as CSSProperties}
      ><div></div></div>
      <div
        className={styles.sec_hand}
        style={{ "--angle": `${180 + currDateTime.getSeconds() * 6}deg` } as CSSProperties}
      ><div></div></div>

      {
        Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className={classes(styles.hr_mark)}
            style={{ "--angle": `${idx * 30}deg` } as CSSProperties}
          >
            <div></div>
          </div>
        ))
      }

      {
        Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className={classes(styles.min_mark)}
            style={{ "--angle": `${15 + (idx * 30)}deg` } as CSSProperties}
          >
            <div></div>
          </div>
        ))
      }
    </div>
  );
};

export default Clock;
