"use client";

import React, { ComponentProps, useEffect, useRef, useState } from "react";

import { PageMore } from "@/components/common/general";
import { useToastActions } from "@/data/stores";
import { useDebouncedCallback, useMediaPlayer } from "@/lib/hooks";
import { GeneralDropdown } from "@/lib/ui/elements/dropdowns";
import { Slider } from "@/lib/ui/elements/inputs";
import { PaceControl } from "@/lib/ui/elements/players/PaceControl";
import { VolumeControl } from "@/lib/ui/elements/players/VolumeControl";
import { ClosedCaptionIcon, EllipsisHIcon, FastForwardIcon, MaximizeIcon, PauseIcon, PictureInPictureIcon, PlayIcon, RewindIcon, SkipBackIcon, SkipForwardIcon, VolumeHighIcon, VolumenMuteIcon } from "@/lib/ui/svgs/icons";
import { getUniqueId } from "@/lib/utils/crypto.utils";
import { breakdownTime, TimeField } from "@/lib/utils/datetime.utils";
import { getFormattedTime } from "@/lib/utils/format.utils";

import styles from "./VideoPlayer.module.scss";

export interface VideoPlayerProps extends ComponentProps<"video"> {
  sources?: ComponentProps<"source">[];
  rootClass?: string;
}

const VideoPlayer = ({
  sources, rootClass,
  ...props
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [overlay, setOverlay] = useState(false);

  const { addToast } = useToastActions();

  const {
    duration, isMute, isPlaying, currTime, pace, volume,
    setIsPlaying, setIsMute,
    updateCurrTime, updatePace, updateVolume,
    handleLoadedMetadata,
    togglePlayState,
  } = useMediaPlayer(videoRef);

  const durationParts: { [key in TimeField | "day"]?: number } = breakdownTime(duration, "second");

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
      updateCurrTime(currTime + (e.clientX < xMid ? -5 : 5), true);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen()
        .catch(() => {
          addToast({
            id: getUniqueId(4),
            message: "Fullscreen not supported.",
            timeout: 3000,
            type: "error",
          });
        });
    }
  };

  const togglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (typeof videoRef.current?.requestPictureInPicture === "function") {
      videoRef.current?.requestPictureInPicture()
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
  };

  const playerMoreOptions = [
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
  ];

  useEffect(() => {
    if (overlay && containerRef.current) {
      const elem = containerRef.current;
      const handleClick = (e: MouseEvent) => {
        if (!e.composedPath().includes(elem)) {
          hideOverlay();
        }
      };
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [overlay]);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const elem = containerRef.current;
  //     const abortController = new AbortController();

  //     const handleMouseEnter = () => {
  //       const handleMouseMove = () => {
  //         showOverlay();
  //         debouncedHideOverlay();
  //       };

  //       const handleMouseLeave = (e?: PointerEvent) => {
  //         if (!elem.contains(e?.target as HTMLElement)) {
  //           hideOverlay();
  //           elem.removeEventListener("pointermove", handleMouseMove);
  //           elem.removeEventListener("pointerleave", handleMouseLeave);
  //           elem.removeEventListener("touchstart", handleTouchStart);
  //         }
  //       };

  //       const handleTouchStart = (e: TouchEvent) => {
  //         if (elem.contains(e.target as HTMLElement)) {
  //           handleMouseMove();
  //         } else {
  //           handleMouseLeave();
  //         }
  //       };

  //       elem.addEventListener("pointermove", handleMouseMove, { signal: abortController.signal });
  //       elem.addEventListener("touchstart", handleTouchStart, { signal: abortController.signal });
  //       elem.addEventListener("pointerleave", handleMouseLeave, { signal: abortController.signal });
  //     };

  //     elem.addEventListener("pointerenter", handleMouseEnter, { signal: abortController.signal });

  //     return () => {
  //       abortController.abort();
  //     };
  //   }
  // }, [debouncedHideOverlay]);

  return (
    <div
      className={`${styles.wrapper} ${rootClass}`}
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
      </video>
      <div className={styles.controls_wrapper} data-id="overlay">
        <div className={styles.center}>
          {/* <button
            className={styles.prev_btn}
          >
            <SkipBackIcon />
          </button> */}
          <button
            className={styles.rewind_btn}
            onClick={() => updateCurrTime(currTime - 5, true)}
          >
            <RewindIcon />
          </button>
          <button
            className={styles.main_play_btn}
            onClick={togglePlayState}
          >
            {
              isPlaying ? <PauseIcon /> : <PlayIcon />
            }
          </button>
          <button
            className={styles.forward_btn}
            onClick={() => updateCurrTime(currTime + 5, true)}
          >
            <FastForwardIcon />
          </button>
          {/* <button
            className={styles.next_btn}
          >
            <SkipForwardIcon />
          </button> */}
        </div>
        <div className={styles.all_controls}>
          <div className={styles.top}>
            <Slider
              min={0} max={duration} step={1}
              value={currTime}
              onInput={(e) => updateCurrTime((e.target as HTMLInputElement).valueAsNumber, e.isTrusted)}
              className={styles.slider}
              variant="rod"
              asProgress={true}
            />
          </div>
          <div className={styles.bottom}>
            <button
              className={styles.play_btn}
              onClick={togglePlayState}
            >
              {
                isPlaying ? <PauseIcon /> : <PlayIcon />
              }
            </button>
            <div className={styles.duration_info}>
              <p className={styles.curr_timestamp}>{duration ? getFormattedTime(breakdownTime(currTime, "second", "hour")) : "--:--"}</p>
              <span className={styles.separator}>{"/"}</span>
              <p className={styles.total_duration}>{durationParts ? getFormattedTime(durationParts) : "--:--"}</p>
            </div>
            <GeneralDropdown
              value={`${pace}x`}
              dropdownContent={
                <PaceControl pace={pace} updatePace={updatePace} />
              }
              ddClass={styles.speed_dropdown}
              btnClass={styles.pace_btn}
              noIcon
              xPos="right"
            />
            <GeneralDropdown
              dropdownContent={
                <VolumeControl
                  mute={isMute} volume={volume}
                  setMute={setIsMute} updateVolume={updateVolume}
                />
              }
              ddClass={styles.speed_dropdown}
              btnClass={styles.vol_btn}
              noIcon
              xPos="right"
            >
              {isMute ? <VolumenMuteIcon /> : <VolumeHighIcon />}
            </GeneralDropdown>
            <PageMore
              options={playerMoreOptions}
              onSelect={() => { }}
              btnClass={styles.fullscreen_btn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
