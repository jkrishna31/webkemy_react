"use client";

import { CSSProperties } from "react";

import { useCurrentDateTime } from "@/lib/hooks/useCurrentTime";
import { useMounted } from "@/lib/hooks/useMounted";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Clock.module.scss";

const hrMajorMark = [6, 9, 12, 3];

const Clock = () => {
  const currDateTime = useCurrentDateTime();
  const isMounted = useMounted();

  return (
    <div className={styles.clock}>
      <div className={styles.center}></div>

      {isMounted && (
        <>
          <div
            className={styles.hour_hand}
            style={{ "--angle-hand": `${180 + (currDateTime.getHours() * 30) + (currDateTime.getMinutes() * .5)}deg` } as CSSProperties}
          ><div></div></div>
          <div
            className={styles.min_hand}
            style={{ "--angle-hand": `${180 + (currDateTime.getMinutes() * 6)}deg` } as CSSProperties}
          ><div></div></div>
          <div
            className={styles.sec_hand}
            style={{ "--angle-hand": `${180 + currDateTime.getSeconds() * 6}deg` } as CSSProperties}
          ><div></div></div>
        </>
      )}

      {
        Array.from({ length: 60 }).map((_, idx) => (
          <div
            key={idx}
            className={classes(styles.mark)}
            {...(
              (idx % 5 === 0)
                ? {
                  "data-hour": idx % 15 === 0 ? "major" : "minor"
                }
                : {
                  "data-sec": true
                }
            )}
            style={{ "--angle-mark": `${idx * 6}deg` } as CSSProperties}
          >
            {
              idx % 15 === 0
                ? <p className={styles.label_hr} style={{ transform: `rotateZ(${-idx * 6}deg)` }}>{hrMajorMark[idx / 15]}</p>
                : null
            }
            <div></div>
          </div>
        ))
      }
    </div>
  );
};

export default Clock;
