import { useLayoutEffect, useRef, useState } from "react";

import styles from "./Progress.module.scss";

export interface CircularProgressProps {
  value?: number;
  padding?: number;
  indeterminate?: boolean;
}

const CircularProgress = ({
  indeterminate,
  value = 0, padding = 10,
}: CircularProgressProps) => {
  const ref = useRef<SVGSVGElement>(null);

  const [size, setSize] = useState<number>(0);

  const visibleSize = size - padding * 2;
  const radius = visibleSize / 2;

  const dasharray = 2 * Math.PI * radius;
  const dashoffset = dasharray - ((indeterminate ? 30 : value) / 100 * dasharray);

  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.width.baseVal.valueInSpecifiedUnits);
    }
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className={styles.circular_progress}
      data-indeterminate={indeterminate}
    // version="1.1"
    // xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r={radius}
        cx="50%" cy="50%"
        fill="transparent"
        strokeWidth="16"
        className={styles.track}
      ></circle>
      <circle
        r={radius}
        cx="50%" cy="50%"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDashoffset={dashoffset}
        strokeDasharray={`${dasharray} ${dasharray}`}
        className={styles.progress}
      ></circle>
    </svg>
  );
};

export default CircularProgress;
