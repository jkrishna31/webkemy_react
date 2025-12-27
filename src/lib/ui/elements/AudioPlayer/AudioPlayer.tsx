"use client";

import React, { ComponentProps, useMemo, useRef, useState } from "react";

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
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progressMode, setProgressMode] = useState<"elapsed" | "remaining">("elapsed");

  const {
    duration, isMute, isPlaying, currTime, pace, volume, loading,
    setIsPlaying, setIsMute,
    updateCurrTime, updatePace, updateVolume,
    handleLoadedMetadata,
    togglePlayState,
  } = useMediaPlayer(audioRef);

  const durationParts: { [key in TimeField | "day"]?: number } = breakdownTime(duration, "second");
  const progressDisplay = useMemo(() => {
    return (progressMode === "remaining" ? "- " : "") + getFormattedTime(breakdownTime(progressMode === "elapsed" ? currTime : duration - currTime, "second", "hour"));
  }, [currTime, duration, progressMode]);

  return (
    <div className={classes(styles.wrapper, rootClass)}>
      <audio
        {...props}
        muted={isMute}
        ref={audioRef}
        onLoadedMetadata={e => handleLoadedMetadata(e.target as HTMLAudioElement)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={
          (e: React.SyntheticEvent<HTMLAudioElement, Event>) => updateCurrTime((e.target as HTMLAudioElement).currentTime)
        }
      >
        {
          sources?.map(source => (
            <source key={source.id} {...source}></source>
          ))
        }
        {children}
      </audio>
      <div className={styles.row}>
        <Button
          variant='tertiary'
          className={styles.play_btn}
          onClick={togglePlayState}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={loading}
        >
          {
            loading
              ? <RippleLoader className={styles.btn_icon} />
              : (isPlaying ? <PauseIcon className={styles.btn_icon} /> : <PlayIcon className={styles.btn_icon} />)
          }
        </Button>
        <div className={styles.player}>
          <button
            aria-pressed={progressMode === "remaining"}
            onClick={() => setProgressMode(progressMode === "remaining" ? "elapsed" : "remaining")}
            className={styles.duration}
          >
            <p className={styles.curr_timestamp}>{duration ? progressDisplay : "--:--"}</p>
            <span className={styles.separator}>{"/"}</span>
            <p className={styles.total_duration}>{durationParts ? getFormattedTime(durationParts) : "--:--"}</p>
          </button>
          <Slider
            min={0} max={duration ?? 0} step={1}
            value={currTime}
            onInput={(e) => updateCurrTime((e.target as HTMLInputElement).valueAsNumber, e.isTrusted)}
            className={styles.slider}
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
          triggerClass={styles.speed_btn}
          dropdownClass={styles.speed_dropdown}
        >
          {pace}{"x"}
        </Dropdown>
        <Dropdown
          dropdown={
            <VolumeControl mute={isMute} setMute={setIsMute} volume={volume} updateVolume={updateVolume} />
          }
          triggerClass={styles.mute_btn}
          dropdownClass={styles.vol_dropdown}
          hintIcon={null}
        >
          {isMute ? <VolumenMuteIcon /> : <VolumeHighIcon />}
        </Dropdown>
      </div>
    </div>
  );
};

export default AudioPlayer;
