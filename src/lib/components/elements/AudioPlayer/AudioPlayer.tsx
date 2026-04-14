"use client";

import { ComponentProps, useMemo, useRef, useState } from "react";

import { Button } from "@/lib/components/elements/butttons";
import { Dropdown } from "@/lib/components/elements/Dropdown";
import { Slider } from "@/lib/components/elements/inputs/Slider";
import { DotsLoader } from "@/lib/components/elements/loaders";
import { PaceControl } from "@/lib/components/elements/PaceControl";
import { VolumeControl } from "@/lib/components/elements/VolumeControl";
import { useMediaPlayer } from "@/lib/hooks/useMediaPlayer";
import PauseIcon from "@/lib/svgs/icons/PauseIcon";
import PlayIcon from "@/lib/svgs/icons/PlayIcon";
import VolumeHighIcon from "@/lib/svgs/icons/VolumeHighIcon";
import VolumenMuteIcon from "@/lib/svgs/icons/VolumenMuteIcon";
import { breakdownTime, getFormattedTime, TimeField } from "@/lib/utils/datetime";
import { classes } from "@/lib/utils/style";

import styles from "./AudioPlayer.module.scss";

export interface AudioPlayerProps extends ComponentProps<"audio"> {
  sources?: ComponentProps<"source">[];
  rootClass?: string;
  allowVolumeControl?: boolean;
  allowPaceControl?: boolean;
}

const AudioPlayer = ({
  allowVolumeControl = true, allowPaceControl = true,
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
          variant='muted'
          className={classes(styles.ap_play_btn, "ap_play_btn")}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={isLoading}
        >
          {
            isLoading
              ? <DotsLoader />
              : isPlaying
                ? <PauseIcon />
                : <PlayIcon />
          }
        </Button>
        <div className={styles.player}>
          <button
            aria-pressed={progressMode === "remaining"}
            onClick={() => setProgressMode(progressMode === "remaining" ? "elapsed" : "remaining")}
            className={classes(styles.ap_btn_dur, "ap_dur_btn")}
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
        {!!allowPaceControl && (
          <Dropdown
            dropdown={
              <PaceControl pace={pace} updatePace={updatePace} />
            }
            hintIcon={null}
            triggerVariant="muted"
            triggerClass={classes(styles.ap_pace_btn, "ap_pace_btn")}
            dropdownClass={styles.ap_pace_popover}
            alignment="right"
          >
            {pace}{"x"}
          </Dropdown>
        )}
        {!!allowVolumeControl && (
          <Dropdown
            dropdown={
              <VolumeControl mute={isMute} setMute={toggleMute} volume={volume} updateVolume={updateVolume} />
            }
            triggerVariant="muted"
            triggerClass={classes(styles.ap_vol_btn, "ap_vol_btn")}
            dropdownClass={styles.ap_vol_popover}
            hintIcon={null}
            alignment="right"
          >
            {isMute ? <VolumenMuteIcon /> : <VolumeHighIcon />}
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
