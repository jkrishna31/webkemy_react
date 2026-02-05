import { useEffect, useEffectEvent, useRef } from "react";

export function useMediaStream(msConstraints?: MediaStreamConstraints) {
  // get media stream
  const mediaStreamRef = useRef<MediaStream>(null);
  const mediaRecorderRef = useRef<MediaRecorder>(null);

  const start = (event: Event) => {
    // console.log("=== on start ===", event);
  };

  const stop = (event: Event) => {
    // console.log("*** on stop ***", event);
  };

  const pause = (event: Event) => {
    // console.log("--- on pause ---", event);
  };

  const resume = (event: Event) => {
    // console.log("+++ on resume +++", event);
  };

  const listen = () => {
    if (!mediaStreamRef.current) return;

    const mediaRecorder = new MediaRecorder(mediaStreamRef.current);

    mediaRecorder.ondataavailable = (event => {
      console.log("=== on data ===", event);
    });

    mediaRecorder.onerror = (event => {
      console.log("xxx on error xxx", event);
    });

    mediaRecorder.onpause = pause;

    mediaRecorder.onresume = resume;

    mediaRecorder.onstart = start;

    mediaRecorder.onstop = stop;
  };

  const initialize = useEffectEvent(async () => {
    mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(msConstraints);
  });

  useEffect(() => {
    return () => {
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return {
    mediaStreamRef, mediaRecorderRef,
    start, stop, pause, resume,
  };
}
