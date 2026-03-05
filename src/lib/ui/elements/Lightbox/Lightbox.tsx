"use client";

import { ComponentProps, useRef, useState } from "react";

import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { Button } from "@/lib/ui/elements/butttons";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import ZoomInIcon from "@/lib/ui/svgs/icons/ZoomInIcon";
import ZoomOutIcon from "@/lib/ui/svgs/icons/ZoomOutIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Lightbox.module.scss";

const defaultScaleStops = [.25, .5, .75, 1, 1.5, 2, 2.5, 3];

export interface LightboxProps extends ComponentProps<"div"> {
  open?: boolean;
  onClose?: () => void;
  scaleStops?: number[];
  defaultScaleStopPointer?: number;
  title?: string;
  scale?: number;
  onScaleChange?: (value: number) => void;
  current?: number;
  total?: number;
}

const Lightbox = ({
  open, onClose, title,
  current, total,
  scaleStops = defaultScaleStops, defaultScaleStopPointer = 3, scale, onScaleChange,
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
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.name}>
            {title}
          </div>
        </div>
        <div className={styles.right}>
          {/* download, print btns */}
          {/* dropdown */}
          <Button
            variant="tertiary"
            className={classes(styles.ctrl_btn, styles.close_btn)}
            onClick={onClose}
            data-autofocus={true}
            aria-label="Close" title="Close"
          >
            <CrossIcon />
          </Button>
        </div>
      </div>

      {children}

      <div className={styles.controls}>
        {(total && total > 1) && (
          <div className={styles.nav_controls}>
            <Button
              variant="tertiary"
              className={classes(styles.ctrl_btn, styles.prev_btn)}
              aria-label="Previous" title="Previous"
              disabled={current === 1}
            >
              <ChevronLeftIcon />
              {"Prev"}
            </Button>
            <Button
              variant="tertiary"
              className={classes(styles.ctrl_btn, styles.next_btn)}
              aria-label="Next" title="Next"
              disabled={current === total}
            >
              {"Next"}
              <ChevronRightIcon />
            </Button>
          </div>
        )}

        {!!onScaleChange && (
          <div className={styles.zoom_controls}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
