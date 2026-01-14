"use client";

import { ComponentProps, useCallback, useEffect, useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import MicIcon from "@/lib/ui/svgs/icons/MicIcon";
import { hasDOM } from "@/lib/utils/client.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AudioListener.module.scss";

const texts = [
  {
    title: "Need Permission to Listen!",
    info: "Press \"Allow\" on the popup, if any, otherwise go to browser's setting to give permission."
  },
  {
    title: "Failed to listen. Try again!",
    info: "Tap on Mic below to listen."
  },
  {
    title: "Listening...",
    info: "Tap on Mic below to pause."
  }
];

export interface AudioListenerProps extends ComponentProps<"div"> {

}

const AudioListener = ({
  ...props
}: AudioListenerProps) => {
  const [status, setStatus] = useState<number>(0);

  const listen = (msObj: MediaStream) => {
    setStatus(2);
    const mediaRecorder = new MediaRecorder(msObj);
    // console.log('--- media recoder ---', mediaRecorder);
  };

  const start = useCallback(() => {
    if (hasDOM() && navigator.mediaDevices) {
      navigator
        .mediaDevices.getUserMedia({ audio: true })
        .then((mediaStreamObj) => {
          // console.log('+++ audio res +++', mediaStreamObj);
          listen(mediaStreamObj);
        })
        .catch(err => {
          // console.log('--- audio err ---', err);
          setStatus(0);
        });
    }
  }, []);

  const handleMicClick = () => {
    if (status === 0 || status === 1) {
      start();
    } else {
      setStatus(status === 1 ? 2 : 1);
    }
  };

  const getMicStatus = () => {
    switch (status) {
      case 0:
        return styles.d;
      case 1:
        return styles.p;
      case 2:
        return styles.l;
    }
  };

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className={styles.box}>
      <div className={styles.audio_ctrls}>
        <p className={styles.title}>{texts[status].title}</p>
        <p className={styles.info}>{texts[status].info}</p>
      </div>
      <div className={styles.mic_wrapper}>
        <Button
          className={classes(styles.mic_btn, getMicStatus())}
          icon={<MicIcon className={styles.mic_icon} />}
          onClick={handleMicClick}
        />
      </div>
    </div>
  );
};

export default AudioListener;
