import { Button } from "@/lib/components/elements/butttons";
import { Slider } from "@/lib/components/elements/inputs/Slider";
import MinusIcon from "@/lib/svgs/icons/MinusIcon";
import PlusIcon from "@/lib/svgs/icons/PlusIcon";

import styles from "./VolumeControl.module.scss";

export interface VolumeControlProps {
  volume: number
  mute?: boolean
  setMute?: (isMute: boolean) => void
  updateVolume: (volume: number) => void
}

export const VolumeControl = ({
  mute, setMute,
  volume, updateVolume,
}: VolumeControlProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p className={styles.curr_vol}>{volume}{"%"}</p>
        <Button
          variant="outlined"
          aria-label="Mute"
          className={styles.speed_ctrl_btn}
          onClick={() => setMute?.(!mute)}
        >
          {mute ? "Unmute" : "Mute"}
        </Button>
      </div>
      <div className={styles.vol_controls}>
        <Button
          variant="muted"
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
          variant="muted"
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
