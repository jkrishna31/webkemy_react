import React from "react";

import { PageSetup } from "@/components/managers";
import { VideoPlayer } from "@/lib/ui/elements/VideoPlayer";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="video-player" />

      <VideoPlayer
        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
        rootClass={styles.player}
      />
    </main>
  );
};

export default page;
