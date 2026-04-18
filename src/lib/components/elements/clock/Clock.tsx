"use client";

import { CSSProperties } from "react";

import { useCurrentDateTime } from "@/lib/hooks/useCurrentTime";
import { useMounted } from "@/lib/hooks/useMounted";
import { classes } from "@/lib/utils/style";

import styles from "./Clock.module.scss";

const hrMajorMark = [12, 3, 6, 9];

export const Clock = () => {
  const currDateTime = useCurrentDateTime();
  const isMounted = useMounted();

  const hourAngle = 180 + (currDateTime.getHours() * 30) + (currDateTime.getMinutes() * .5);
  const minAngle = 180 + (currDateTime.getMinutes() * 6);
  const secAngle = 180 + currDateTime.getSeconds() * 6;

  return (
    <div className={styles.clock}>
      <div className={styles.center}></div>

      {isMounted && (
        <>
          <div
            className={styles.hour_hand}
            style={{ "--angle-hand": `${hourAngle}deg` } as CSSProperties}
          ><div></div></div>
          <div
            className={styles.min_hand}
            style={{ "--angle-hand": `${minAngle}deg` } as CSSProperties}
          ><div></div></div>
          <div
            className={styles.sec_hand}
            style={{ "--angle-hand": `${secAngle}deg` } as CSSProperties}
          ><div></div></div>
        </>
      )}

      {
        Array.from({ length: 60 }).map((_, idx) => {
          const markAngle = 180 + idx * 6;
          return (
            <div
              key={idx}
              className={classes(styles.mark)}
              data-active={isMounted && secAngle === markAngle}
              {...(
                (idx % 5 === 0)
                  ? {
                    "data-hour": idx % 15 === 0 ? "major" : "minor",
                  }
                  : {
                    "data-sec": true,
                  }
              )}
              style={{ "--angle-mark": `${markAngle}deg` } as CSSProperties}
            >
              {
                idx % 15 === 0
                  ? <p className={styles.label_hr} style={{ transform: `rotateZ(${-markAngle}deg)` }}>{hrMajorMark[idx / 15]}</p>
                  : null
              }
              <div></div>
            </div>
          );
        })
      }
    </div>
  );
};
