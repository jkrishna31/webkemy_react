import { PageSetup } from "@/components/managers";
import { VideoPlayer } from "@/lib/ui/elements/VideoPlayer";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="video-player" />

      <VideoPlayer
        src="https://www.shutterstock.com/shutterstock/videos/3922523297/preview/stock-footage--k-blue-glitter-particle-explosion-abstract-light-burst-background-animation-video-purple.webm"
        rootClass={styles.player}
      />
      <VideoPlayer
        src="https://www.pexels.com/download/video/7213891/"
        rootClass={styles.player}
      />
      <VideoPlayer
        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
        rootClass={styles.player}
      />
    </main>
  );
};

export default page;
