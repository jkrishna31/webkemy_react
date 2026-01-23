"use client";

import { ComponentProps, useMemo, useRef, useState } from "react";

import { useMediaPlayer } from "@/lib/hooks/useMediaPlayer";
import { Button } from "@/lib/ui/elements/butttons";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Slider } from "@/lib/ui/elements/inputs/Slider";
import { RippleLoader } from "@/lib/ui/elements/loaders";
import { PaceControl } from "@/lib/ui/elements/PaceControl";
import { VolumeControl } from "@/lib/ui/elements/VolumeControl";
import PauseIcon from "@/lib/ui/svgs/icons/PauseIcon";
import PlayIcon from "@/lib/ui/svgs/icons/PlayIcon";
import VolumeHighIcon from "@/lib/ui/svgs/icons/VolumeHighIcon";
import VolumenMuteIcon from "@/lib/ui/svgs/icons/VolumenMuteIcon";
import { breakdownTime, TimeField } from "@/lib/utils/datetime.utils";
import { getFormattedTime } from "@/lib/utils/format.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AudioPlayer.module.scss";

export interface AudioPlayerProps extends ComponentProps<"audio"> {
  sources?: ComponentProps<"source">[];
  rootClass?: string;
}

const AudioPlayer = ({
  children, sources, rootClass,
  ...props
}: AudioPlayerProps) => {
  const ref = useRef<HTMLAudioElement>(null);
  const [progressMode, setProgressMode] = useState<"elapsed" | "remaining">("elapsed");

  const {
    play, pause, toggleMute, togglePlay, seekTo,
    isMute, isPlaying, currentTime, isLoading,
    duration, pace, volume,
    updateCurrentTime, updatePace, updateVolume,
    handleLoadedMetadata,
  } = useMediaPlayer<HTMLAudioElement>(ref);

  const durationParts: { [key in TimeField | "day"]?: number } = breakdownTime(duration, "second");
  const progressDisplay = useMemo(() => {
    return (progressMode === "remaining" ? "- " : "") + getFormattedTime(breakdownTime(progressMode === "elapsed" ? currentTime : duration - currentTime, "second", "hour"));
  }, [currentTime, duration, progressMode]);

  return (
    <div className={classes(styles.audio_player, rootClass)}>
      <audio
        {...props}
        muted={isMute}
        ref={ref}
        onLoadedMetadata={e => handleLoadedMetadata(e.target as HTMLAudioElement)}
        onPlay={play}
        onPause={pause}
        onTimeUpdate={
          (e: React.SyntheticEvent<HTMLAudioElement, Event>) => updateCurrentTime((e.target as HTMLAudioElement).currentTime)
        }
      >
        {
          sources?.map(source => (
            <source key={source.id} {...source}></source>
          ))
        }
        {children}
      </audio>
      <div>
        <Button
          variant='tertiary'
          className={styles.ap_play_btn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={isLoading}
        >
          {
            isLoading
              ? <RippleLoader className={styles.bi} />
              : (isPlaying ? <PauseIcon className={styles.bi} /> : <PlayIcon className={styles.bi} />)
          }
        </Button>
        <div className={styles.player}>
          <button
            aria-pressed={progressMode === "remaining"}
            onClick={() => setProgressMode(progressMode === "remaining" ? "elapsed" : "remaining")}
            className={styles.ap_btn_dur}
          >
            <p className={styles.curr_timestamp}>{duration ? progressDisplay : "--:--"}</p>
            <span className={styles.separator}>{"/"}</span>
            <p className={styles.total_duration}>{durationParts ? getFormattedTime(durationParts) : "--:--"}</p>
          </button>
          <Slider
            min={0} max={duration ?? 0} step={1}
            value={currentTime}
            onInput={(e) => updateCurrentTime((e.target as HTMLInputElement).valueAsNumber, e.isTrusted)}
            className={styles.ap_slider}
            variant="rod"
            showFill={true}
            aria-label="Seek"
          />
        </div>
        <Dropdown
          dropdown={
            <PaceControl pace={pace} updatePace={updatePace} />
          }
          hintIcon={null}
          triggerClass={styles.ap_speed_btn}
          dropdownClass={styles.ap_speed_popover}
          alignment="right"
        >
          {pace}{"x"}
        </Dropdown>
        <Dropdown
          dropdown={
            <VolumeControl mute={isMute} setMute={toggleMute} volume={volume} updateVolume={updateVolume} />
          }
          triggerClass={styles.ap_mute_btn}
          dropdownClass={styles.ap_vol_popover}
          hintIcon={null}
          alignment="right"
        >
          {isMute ? <VolumenMuteIcon /> : <VolumeHighIcon />}
        </Dropdown>
      </div>
    </div>
  );
};

export default AudioPlayer;
