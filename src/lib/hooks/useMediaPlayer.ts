import { RefObject, useEffect, useState } from "react";

export function useMediaPlayer(
  target: RefObject<HTMLAudioElement | HTMLVideoElement | null>
) {
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [pace, setPace] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTogglePlayState = () => {
    if (isPlaying) {
      setIsPlaying(false);
      target.current?.pause();
    } else {
      setIsPlaying(true);
      target.current?.play();
    }
  };

  const handleLoadedMetadata = (elem: HTMLAudioElement) => {
    setLoading(false);
    const duration = Math.ceil(elem.duration);
    setDuration(duration);
    // todo: show buffered and seekable hint
    // console.log("--- audio buffered ---",
    //   target.current?.buffered.length,
    //   target.current?.buffered.start(0),
    //   target.current?.buffered.end(0),
    //   target.current?.seekable.length,
    //   target.current?.seekable.start(0),
    //   target.current?.seekable.end(0),
    //   target.current?.seeking,
    // );
  };

  const updateCurrTime = (newCurrTime: number, trusted?: boolean) => {
    if (target.current) {
      if (trusted) {
        target.current.currentTime = newCurrTime;
      }
      setCurrTime(Math.ceil(newCurrTime));
    }
  };

  const updateVolume = (newVolume: number) => {
    if (target.current) {
      target.current.volume = newVolume / 100;
      setVolume(newVolume);
    }
  };

  const updatePace = (newPace: number) => {
    if (target.current) {
      target.current.playbackRate = newPace;
      setPace(newPace);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (target.current) {
      const elem = target.current;
      if (elem.readyState >= 1) {
        handleLoadedMetadata(elem);
      }
    }
  }, [target]);

  return {
    loading, setLoading,
    duration, setDuration,
    isPlaying, setIsPlaying,
    isMute, setIsMute,
    currTime, setCurrTime,
    volume, setVolume,
    pace, setPace,
    togglePlayState: handleTogglePlayState,
    updateCurrTime,
    updateVolume,
    updatePace,
    handleLoadedMetadata,
  };
}
