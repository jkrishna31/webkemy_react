import { useLayoutEffect, useRef, useState } from "react";

import styles from "./Progress.module.scss";

export interface CircularProgressProps {
  size?: number;
  value?: number;
  padding?: number;
  indeterminate?: boolean;
}

const CircularProgress = ({
  indeterminate, size = 0,
  value = 0, padding = 10,
}: CircularProgressProps) => {
  const ref = useRef<SVGSVGElement>(null);

  const [_size, setSize] = useState<number>(size);

  const visibleSize = _size - padding * 2;
  const radius = visibleSize / 2;

  const dasharray = 2 * Math.PI * radius;
  const dashoffset = dasharray - ((indeterminate ? 30 : value) / 100 * dasharray);

  const centerX = _size / 2;
  const centerY = _size / 2;
  const startAngle = 0;
  const endAngle = 359.99;
  const progressAngle = startAngle + ((indeterminate ? 30 : value) / 100) * (endAngle - startAngle);

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.width.baseVal.valueInSpecifiedUnits);
    }
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${_size} ${_size}`}
      className={styles.circular_progress}
      data-indeterminate={indeterminate}
    // version="1.1"
    // xmlns="http://www.w3.org/2000/svg"
    >
      {/* <circle
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
        strokeWidth="16"
        strokeLinecap="round"
        strokeDashoffset={dashoffset}
        strokeDasharray={`${dasharray} ${dasharray}`}
        className={styles.progress}
      ></circle> */}

      <path
        className={styles.track}
        fill="none"
        stroke="currentColor"
        strokeWidth={16}
        strokeLinecap="round"
        d={describeArc(centerX, centerY, radius, startAngle, endAngle)}
      />
      <path
        className={styles.progress}
        fill="none"
        stroke="currentColor"
        strokeWidth={16}
        strokeLinecap="round"
        d={describeArc(centerX, centerY, radius, startAngle, progressAngle)}
      />
    </svg>
  );
};

export default CircularProgress;
