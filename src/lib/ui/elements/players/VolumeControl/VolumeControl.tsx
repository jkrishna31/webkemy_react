import React from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Slider } from "@/lib/ui/elements/inputs";
import { MinusIcon, PlusIcon } from "@/lib/ui/svgs/icons";

import styles from "./VolumeControl.module.scss";

export interface VolumeControlProps {
  volume: number
  mute?: boolean
  setMute?: (isMute: boolean) => void
  updateVolume: (volume: number) => void
}

const VolumeControl = ({
  mute, setMute,
  volume, updateVolume,
}: VolumeControlProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p className={styles.curr_vol}>{volume}{"%"}</p>
        <Button
          variant="secondary"
          aria-label="Mute"
          className={styles.speed_ctrl_btn}
          onClick={() => setMute?.(!mute)}
        >
          {mute ? "Unmute" : "Mute"}
        </Button>
      </div>
      <div className={styles.vol_controls}>
        <Button
          className={styles.vol_dec_btn}
          onClick={() => updateVolume(Math.max(0, volume - 5))}
          disabled={mute}
        >
          <MinusIcon />
        </Button>
        <Slider
          min={0} max={100} step={1}
          value={volume}
          onInput={(e) => updateVolume((e.target as HTMLInputElement).valueAsNumber)}
          className={styles.volume_slider}
          disabled={mute}
          showFill
          variant="rod"
        />
        <Button
          className={styles.vol_inc_btn}
          onClick={() => updateVolume(Math.min(100, volume + 5))}
          disabled={mute}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default VolumeControl;
