"use client";

import React, { ComponentProps, useRef } from "react";

import { useMediaPlayer } from "@/lib/hooks";
import { Button } from "@/lib/ui/elements/butttons";
import { GeneralDropdown } from "@/lib/ui/elements/dropdowns";
import { Slider } from "@/lib/ui/elements/inputs";
import { PauseIcon, PlayIcon, VolumeHighIcon, VolumenMuteIcon } from "@/lib/ui/svgs/icons";
import { breakdownTime, TimeField } from "@/lib/utils/datetime.utils";
import { getFormattedTime } from "@/lib/utils/format.utils";

import { PaceControl, VolumeControl } from "..";
import styles from "./AudioPlayer.module.scss";

export interface AudioPlayerProps extends ComponentProps<"audio"> {
  sources?: ComponentProps<"source">[]
  rootClass?: string
}

const AudioPlayer = ({
  children, sources, rootClass,
  ...props
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    duration, isMute, isPlaying, currTime, pace, volume,
    setIsPlaying, setIsMute,
    updateCurrTime, updatePace, updateVolume,
    handleLoadedMetadata,
    togglePlayState,
  } = useMediaPlayer(audioRef);

  const durationParts: { [key in TimeField | "day"]?: number } = breakdownTime(duration, "second");

  return (
    <div className={`${styles.wrapper} ${rootClass}`}>
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
        >
          {
            isPlaying ? <PauseIcon /> : <PlayIcon />
          }
        </Button>
        <div className={styles.player}>
          <div className={styles.duration}>
            <p className={styles.curr_timestamp}>{duration ? getFormattedTime(breakdownTime(currTime, "second", "hour")) : "--:--"}</p>
            <span className={styles.separator}>{"/"}</span>
            <p className={styles.total_duration}>{durationParts ? getFormattedTime(durationParts) : "--:--"}</p>
          </div>
          <Slider
            min={0} max={duration ?? 0} step={1}
            value={currTime}
            onInput={(e) => updateCurrTime((e.target as HTMLInputElement).valueAsNumber, e.isTrusted)}
            className={styles.slider}
            variant="rod"
            asProgress={true}
          />
        </div>
        <GeneralDropdown
          value={`${pace}x`}
          dropdownContent={
            <PaceControl pace={pace} updatePace={updatePace} />
          }
          ddClass={styles.speed_dropdown}
          btnClass={styles.speed_btn}
          noIcon
          xPos="right"
        />
        <GeneralDropdown
          dropdownContent={
            <VolumeControl mute={isMute} setMute={setIsMute} volume={volume} updateVolume={updateVolume} />
          }
          ddClass={styles.vol_dropdown}
          btnClass={styles.mute_btn}
          noIcon
          xPos="right"
        >
          {isMute ? <VolumenMuteIcon /> : <VolumeHighIcon />}
        </GeneralDropdown>
      </div>
    </div>
  );
};

export default AudioPlayer;
