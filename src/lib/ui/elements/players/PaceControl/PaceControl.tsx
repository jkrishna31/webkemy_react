import React from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Slider } from "@/lib/ui/elements/inputs";
import { MinusIcon, PlusIcon } from "@/lib/ui/svgs/icons";

import styles from "./PaceControl.module.scss";

const recommendedPaceOpts = [.25, .5, 1.5, 2];

export interface PaceControlProps {
  pace: number
  updatePace: (pace: number) => void
}

const PaceControl = ({
  pace, updatePace,
}: PaceControlProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p className={styles.curr_pace}>{pace}{"x"}</p>
        <Button
          variant="secondary"
          onClick={() => updatePace(1)}
          disabled={pace === 1}
        >
          {"Reset"}
        </Button>
      </div>
      <div className={styles.slider_controls}>
        <Button
          className={styles.speed_dec_btn}
          onClick={() => updatePace(Math.max(.2, parseFloat((pace - .1).toFixed(2))))}
        >
          <MinusIcon />
        </Button>
        <Slider
          min={.2} max={3} step={.05}
          value={pace}
          onInput={(e) => updatePace((e.target as HTMLInputElement).valueAsNumber)}
          className={styles.speed_slider}
          variant="rod"
        />
        <Button
          className={styles.speed_inc_btn}
          onClick={() => updatePace(Math.min(3, parseFloat((pace + .1).toFixed(2))))}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className={styles.common_pace}>
        {
          recommendedPaceOpts.map((pace) => (
            <Button key={pace} variant="secondary" onClick={() => updatePace(pace)}>
              {pace === 1 ? "Reset" : `${pace.toString()}x`}
            </Button>
          ))
        }
      </div>
    </div>
  );
};

export default PaceControl;
