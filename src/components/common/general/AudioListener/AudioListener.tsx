"use client";

import { ComponentProps, useEffect, useEffectEvent, useState } from "react";

import useMediaStream from "@/lib/hooks/useMediaStream";
import { Button } from "@/lib/ui/elements/butttons";
import MicIcon from "@/lib/ui/svgs/icons/MicIcon";
import { hasDOM } from "@/lib/utils/client.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AudioListener.module.scss";

export type MicStatus = "pending" | "failed" | "listen" | "paused";

const statusDetails: { [key: string]: { title?: string; info?: string; } } = {
  pending: {
    title: "Need Permission to Listen!",
    info: "Press \"Allow\" on the popup, if any, otherwise go to browser's setting to give permission."
  },
  failed: {
    title: "Permission Denied or Blocked!",
    info: "Press \"Allow\" on the popup, if any, otherwise go to browser's setting to give permission."
  },
  paused: {
    title: "Failed to listen. Try again!",
    info: "Tap on Mic below to listen.",
  },
  listen: {
    title: "Listening...",
    info: "Tap on Mic below to pause."
  }
};

export interface AudioListenerProps extends ComponentProps<"div"> {

}

const AudioListener = ({
  ...props
}: AudioListenerProps) => {
  const [status, setStatus] = useState<MicStatus>("pending");

  const { mediaRecorderRef, mediaStreamRef } = useMediaStream();

  const start = useEffectEvent(async () => {
    if (hasDOM() && navigator.mediaDevices) {
      try {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        // listen(mediaStreamRef.current);
      } catch (error) {
        setStatus("failed");
      }
    }
  });

  const handleMicClick = () => {
    if (status === "listen") {
      setStatus("paused");
    } else if (status === "paused") setStatus("listen");
  };

  const getMicStatus = () => {
    switch (status) {
      case "pending":
        return styles.d;
      case "failed":
      case "paused":
        return styles.p;
      case "listen":
        return styles.l;
    }
  };

  useEffect(() => {
    start();
    return () => {
      mediaStreamRef.current?.getAudioTracks().forEach(item => item.stop());
    };
  }, [mediaStreamRef]);

  return (
    <div className={styles.box}>
      <div className={styles.audio_ctrls}>
        <p className={styles.title}>{statusDetails[status].title}</p>
        <p className={styles.info}>{statusDetails[status].info}</p>
      </div>
      <div className={styles.mic_wrapper}>
        <Button
          className={classes(styles.mic_btn, getMicStatus())}
          icon={<MicIcon className={styles.mic_icon} />}
          onClick={handleMicClick}
          disabled={status === "failed" || status === "pending"}
        />
      </div>
    </div>
  );
};

export default AudioListener;
