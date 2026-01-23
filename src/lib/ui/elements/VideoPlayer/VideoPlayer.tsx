"use client";

import { ComponentProps, useCallback, useEffect, useMemo, useState } from "react";

import { useToastActions } from "@/data/stores";
import { useDebouncedCallback } from "@/lib/hooks/useDebouncedCallback";
import { useElementRef } from "@/lib/hooks/useElementRef";
import { useMediaPlayer } from "@/lib/hooks/useMediaPlayer";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Slider } from "@/lib/ui/elements/inputs/Slider";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { RippleLoader } from "@/lib/ui/elements/loaders";
import { PaceControl } from "@/lib/ui/elements/PaceControl";
import { VolumeControl } from "@/lib/ui/elements/VolumeControl";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import FastForwardIcon from "@/lib/ui/svgs/icons/FastForwardIcon";
import PauseIcon from "@/lib/ui/svgs/icons/PauseIcon";
import PlayIcon from "@/lib/ui/svgs/icons/PlayIcon";
import RewindIcon from "@/lib/ui/svgs/icons/RewindIcon";
import VolumeHighIcon from "@/lib/ui/svgs/icons/VolumeHighIcon";
import VolumenMuteIcon from "@/lib/ui/svgs/icons/VolumenMuteIcon";
import { getUniqueId } from "@/lib/utils/crypto.utils";
import { breakdownTime, TimeField } from "@/lib/utils/datetime.utils";
import { getFormattedTime } from "@/lib/utils/format.utils";
import { clampNumber } from "@/lib/utils/math.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./VideoPlayer.module.scss";

export interface VideoPlayerProps extends ComponentProps<"video"> {
  sources?: ComponentProps<"source">[];
  rootClass?: string;
}

const VideoPlayer = ({
  sources, rootClass,
  ...props
}: VideoPlayerProps) => {
  const { element: videoElement, ref: videoRef } = useElementRef<HTMLVideoElement>();
  const { element: containerElement, ref: containerRef } = useElementRef<HTMLDivElement>();

  const [overlay, setOverlay] = useState(false);
  const [progressMode, setProgressMode] = useState<"elapsed" | "remaining">("elapsed");

  const { addToast } = useToastActions();

  const {
    play, pause, toggleMute, togglePlay, seekTo,
    isMute, isPlaying, currentTime, isLoading,
    pace, volume, duration,
    updateCurrentTime, updatePace, updateVolume,
    handleLoadedMetadata,
  } = useMediaPlayer<HTMLVideoElement>(videoRef);

  const durationParts: { [key in TimeField | "day"]?: number } = breakdownTime(duration, "second");

  const progressDisplay = useMemo(() => {
    return (progressMode === "remaining" ? "- " : "") + getFormattedTime(breakdownTime(progressMode === "elapsed" ? currentTime : duration - currentTime, "second", "hour"));
  }, [currentTime, duration, progressMode]);

  const hideOverlay = () => {
    setOverlay(false);
  };

  const showOverlay = () => {
    setOverlay(true);
  };

  const handleClick = useDebouncedCallback((e: React.MouseEvent) => {
    if (e.nativeEvent.detail > 1) return;
    if (!overlay) {
      showOverlay();
    } else {
      const dataId = (e.target as HTMLElement).getAttribute("data-id") || (e.target as HTMLElement).parentElement?.getAttribute("data-id");
      if (dataId !== "overlay") return;
      hideOverlay();
    }
  }, 200);

  const handleDoubleClick = (e: React.MouseEvent) => {
    const containerRect = (containerRef.current)?.getBoundingClientRect();
    if (containerRect) {
      const xMid = containerRect.x + (containerRect.width / 2);
      updateCurrentTime(clampNumber(currentTime + (e.clientX < xMid ? -5 : 5), 0, duration), true);
      hideOverlay();
    }
  };

  const toggleFullscreen = useCallback(() => {
    if (!containerElement) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerElement.requestFullscreen()
        .catch(() => {
          addToast({
            id: getUniqueId(4),
            message: "Fullscreen not supported.",
            timeout: 3000,
            type: "error",
          });
        });
    }
  }, [addToast, containerElement]);

  const togglePictureInPicture = useCallback(() => {
    if (!videoElement) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (typeof videoElement.requestPictureInPicture === "function") {
      videoElement.requestPictureInPicture()
        .catch(() => {
          addToast({
            id: getUniqueId(4),
            message: "Picture-in-picture not supported.",
            timeout: 3000,
            type: "error",
          });
        });
    } else {
      addToast({
        id: getUniqueId(4),
        message: "Picture-in-picture not supported.",
        timeout: 3000,
        type: "error",
      });
    }
  }, [addToast, videoElement]);

  const playerMoreOptions = useMemo(() => [
    {
      label: "Subtitles/Closed Captions", value: 0,
      // onClick: () => { },
      disabled: true,
    },
    {
      label: "Fullscreen", value: 1,
      onClick: toggleFullscreen,
    },
    {
      label: "Picture in Picture", value: 2,
      onClick: togglePictureInPicture,
    },
  ], [toggleFullscreen, togglePictureInPicture]);

  useEffect(() => {
    if (overlay && containerElement) {
      const handleClick = (e: MouseEvent) => {
        if (!e.composedPath().includes(containerElement)) {
          hideOverlay();
        }
      };
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [containerElement, overlay]);

  return (
    <div
      className={classes(styles.video_player, rootClass)}
      ref={containerRef}
      data-overlay={overlay}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <video
        {...props}
        ref={videoRef}
        muted={isMute}
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
      </video>
      <div className={styles.vp_controls_wrapper} data-id="overlay">
        <div className={styles.vp_controls_center}>
          {/* <button
            className={"prev_btn"}
          >
            <SkipBackIcon />
          </button> */}
          <button
            className={styles.vp_rewind_btn}
            onClick={() => updateCurrentTime(clampNumber(currentTime - 5, 0, duration), true)}
          >
            <RewindIcon />
          </button>
          <button
            className={styles.vp_main_play_btn}
            onClick={togglePlay}
            disabled={isLoading}
          >
            {
              isLoading
                ? <RippleLoader className={styles.btn_icon} />
                : (isPlaying ? <PauseIcon /> : <PlayIcon />)
            }
          </button>
          <button
            className={styles.vp_forward_btn}
            onClick={() => updateCurrentTime(clampNumber(currentTime + 5, 0, duration), true)}
          >
            <FastForwardIcon />
          </button>
          {/* <button
            className={"next_btn"}
          >
            <SkipForwardIcon />
          </button> */}
        </div>
        <div className={styles.vp_all_controls}>
          <div className={styles.top}>
            <Slider
              min={0} max={duration} step={1}
              value={currentTime}
              onInput={(e) => updateCurrentTime((e.target as HTMLInputElement).valueAsNumber, e.isTrusted)}
              className={styles.vp_slider}
              variant="rod"
              showFill={true}
            />
          </div>
          <div className={styles.bottom}>
            <button
              className={styles.vp_play_btn}
              onClick={togglePlay}
              disabled={isLoading}
            >
              {
                isLoading
                  ? <RippleLoader className={styles.btn_icon} />
                  : (isPlaying ? <PauseIcon /> : <PlayIcon />)
              }
            </button>
            <button
              aria-pressed={progressMode === "remaining"}
              onClick={() => setProgressMode(progressMode === "remaining" ? "elapsed" : "remaining")}
              className={styles.duration_info}
            >
              <p className={styles.curr_timestamp}>{duration ? progressDisplay : "--:--"}</p>
              <span className={styles.separator}>{"/"}</span>
              <p className={styles.total_duration}>{durationParts ? getFormattedTime(durationParts) : "--:--"}</p>
            </button>
            <Dropdown
              dropdown={
                <PaceControl pace={pace} updatePace={updatePace} />
              }
              hintIcon={null}
              triggerClass={styles.vp_pace_btn}
              dropdownClass={styles.vp_speed_popover}
              alignment="right"
            >
              {pace}{"x"}
            </Dropdown>
            <Dropdown
              dropdown={
                <VolumeControl
                  mute={isMute} volume={volume}
                  setMute={toggleMute} updateVolume={updateVolume}
                />
              }
              hintIcon={null}
              triggerClass={styles.vp_vol_btn}
              dropdownClass={styles.vp_vol_popover}
              alignment="right"
            >
              {isMute ? <VolumenMuteIcon /> : <VolumeHighIcon />}
            </Dropdown>
            <Dropdown
              dropdown={
                <ItemList>
                  {
                    playerMoreOptions.map(item => (
                      <Item<"button"> as="button" key={item.label} primary={item.label} onClick={item.onClick} disabled={item.disabled} />
                    ))
                  }
                </ItemList>
              }
              hintIcon={null}
              triggerClass={styles.vp_more_btn}
              alignment="right"
            >
              <EllipsisHIcon />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
