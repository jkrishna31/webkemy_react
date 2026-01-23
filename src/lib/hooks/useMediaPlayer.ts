import { RefObject, useEffect, useEffectEvent, useState } from "react";

export function useMediaPlayer<T extends HTMLAudioElement | HTMLVideoElement>(ref: RefObject<T | null>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState(100);
  const [pace, setPace] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  const play = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    ref.current?.play();
  };

  const pause = () => {
    if (!isPlaying) return;
    setIsPlaying(false);
    ref.current?.pause();
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  const mute = () => {
    setIsMute(true);
    if (ref.current) ref.current.muted = true;
  };

  const unmute = () => {
    setIsMute(false);
    if (ref.current) ref.current.muted = false;
  };

  const toggleMute = () => {
    if (isMute) unmute();
    else mute();
  };

  const seekBy = () => {

  };

  const seekTo = () => {

  };

  const handleLoadedMetadata = (elem: HTMLAudioElement) => {
    setIsLoading(false);
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

  const updateCurrentTime = (newCurrTime: number, trusted?: boolean) => {
    if (!ref.current) return;
    if (trusted) {
      ref.current.currentTime = newCurrTime;
    }
    setCurrentTime(Math.ceil(newCurrTime));
  };

  const updateVolume = (newVolume: number) => {
    if (!ref.current) return;
    ref.current.volume = newVolume / 100;
    setVolume(newVolume);
  };

  const updatePace = (newPace: number) => {
    if (!ref.current) return;
    ref.current.playbackRate = newPace;
    setPace(newPace);
  };

  const initialize = useEffectEvent(() => {
    setIsLoading(true);
    if (!ref.current) return;
    const elem = ref.current;
    if (elem.readyState >= 1) {
      handleLoadedMetadata(elem);
    }
  });

  useEffect(() => {
    initialize();
  }, []);

  return {
    isLoading, isPlaying, isMute, duration,
    currentTime, volume, pace,
    updateCurrentTime, updateVolume, updatePace,
    handleLoadedMetadata,
    play, pause, togglePlay,
    mute, unmute, toggleMute,
    seekBy, seekTo,
  };
}
