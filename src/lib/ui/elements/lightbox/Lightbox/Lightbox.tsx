"use client";

import React, { ComponentProps, useRef, useState } from "react";

import { useFocusTrap } from "@/lib/hooks";
import { Button } from "@/lib/ui/elements/butttons";
import { CrossIcon, ZoomInIcon, ZoomOutIcon } from "@/lib/ui/svgs/icons";

import styles from "./Lightbox.module.scss";

const defaultScaleStops = [.25, .5, .75, 1, 1.5, 2, 2.5, 3];

export interface LightboxProps extends ComponentProps<"div"> {
  open?: boolean
  onClose?: () => void
  scaleStops?: number[]
  defaultScaleStopPointer?: number
}

const Lightbox = ({
  open, onClose, scaleStops = defaultScaleStops, defaultScaleStopPointer = 3,
  className, children,
  ...props
}: LightboxProps) => {
  const [scaleStopPointer, setScaleStopPointer] = useState(defaultScaleStopPointer);

  const ref = useRef<HTMLDivElement>(null);

  useFocusTrap(ref, true);

  const updateScale = (change: "inc" | "dec") => {
    if (change === "dec") {
      setScaleStopPointer(currScaleStopPointer => {
        return currScaleStopPointer - (currScaleStopPointer > 0 ? 1 : 0);
      });
    } else {
      setScaleStopPointer(currScaleStopPointer => {
        return currScaleStopPointer + (currScaleStopPointer < scaleStops.length - 1 ? 1 : 0);
      });
    }
  };

  if (!open) return null;

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.controls}>
        <Button
          variant="tertiary"
          className={styles.ctrl_btn}
          aria-label="Zoom Out" title="Zoom Out"
          disabled={!scaleStopPointer}
          onClick={() => updateScale("dec")}
        >
          <ZoomOutIcon />
        </Button>
        <div className={styles.curr_zoom}>
          {`${scaleStops[scaleStopPointer] * 100}%`}
        </div>
        <Button
          variant="tertiary"
          className={styles.ctrl_btn}
          aria-label="Zoom In" title="Zoom In"
          disabled={scaleStopPointer === (scaleStops.length - 1)}
          onClick={() => updateScale("inc")}
        >
          <ZoomInIcon />
        </Button>
        <Button
          variant="tertiary"
          className={`${styles.ctrl_btn} ${styles.close_btn}`}
          onClick={onClose}
          data-autofocus={true}
          aria-label="Close" title="Close"
        >
          <CrossIcon />
        </Button>
      </div>
      {children}
    </div>
  );
};

export default Lightbox;
