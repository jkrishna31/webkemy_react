"use client";

import { ComponentProps, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/lib/components/elements/butttons";
import { Keys } from "@/lib/constants/keys";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKey } from "@/lib/hooks/useKey";
import { useMounted } from "@/lib/hooks/useMounted";
import ChevronLeftIcon from "@/lib/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/svgs/icons/ChevronRightIcon";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import ZoomInIcon from "@/lib/svgs/icons/ZoomInIcon";
import ZoomOutIcon from "@/lib/svgs/icons/ZoomOutIcon";
import { classes } from "@/lib/utils/style";

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
  onNav?: (offset: number) => void;
  usePortal?: boolean;
  rootClass?: string;
}

export const Lightbox = ({
  open, onClose, title, onNav,
  current, total,
  scaleStops = defaultScaleStops, defaultScaleStopPointer = 3, scale, onScaleChange,
  usePortal = true,
  rootClass,
  className, children,
  ...props
}: LightboxProps) => {
  const [scaleStopPointer, setScaleStopPointer] = useState(defaultScaleStopPointer);

  const ref = useRef<HTMLDivElement>(null);

  const isMounted = useMounted();

  useFocusTrap(ref, true);

  useKey((e: KeyboardEvent) => {
    if (e.key === Keys.ESC) onClose?.();
    else if (e.key === Keys.ARROW_LEFT) onNav?.(-1);
    else if (e.key === Keys.ARROW_RIGHT) onNav?.(1);
  });

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

  if (!open || !isMounted) return null;

  const render = () => {
    return (
      <div
        className={classes(styles.wrapper, rootClass)}
        ref={ref}
      >
        <div className={styles.header}>
          {/* <div className={styles.left}> */}
          <h3 className={styles.name}>{title}</h3>
          {/* </div> */}
          <div className={styles.right}>
            {/* download, print btns */}
            {/* dropdown */}
            <Button
              variant="muted"
              className={classes(styles.ctrl_btn, styles.close_btn)}
              onClick={onClose}
              data-autofocus={true}
              aria-label="Close" title="Close"
            >
              <CrossIcon />
            </Button>
          </div>
        </div>

        <div className={classes(styles.content, className)}>
          {children}
        </div>

        <div className={styles.controls}>
          {(total && total > 1 && onNav) && (
            <div className={styles.nav_controls}>
              <Button
                variant="muted"
                className={classes(styles.ctrl_btn, styles.prev_btn)}
                aria-label="Previous" title="Previous"
                disabled={current === 0}
                onClick={() => onNav(-1)}
              >
                <ChevronLeftIcon />
                {"Prev"}
              </Button>
              <span className={styles.showing}>
                {(current ?? 0) + 1}{" / "}{total}
              </span>
              <Button
                variant="muted"
                className={classes(styles.ctrl_btn, styles.next_btn)}
                aria-label="Next" title="Next"
                disabled={current === total - 1}
                onClick={() => onNav(1)}
              >
                {"Next"}
                <ChevronRightIcon />
              </Button>
            </div>
          )}

          {!!onScaleChange && (
            <div className={styles.zoom_controls}>
              <Button
                variant="muted"
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
                variant="muted"
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

  return usePortal ? createPortal(render(), document?.body) : render();
};
