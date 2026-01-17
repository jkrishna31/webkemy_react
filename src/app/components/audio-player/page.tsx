import { PageSetup } from "@/components/managers";
import { AudioPlayer } from "@/lib/ui/elements/AudioPlayer";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="audio-player" />

      <AudioPlayer
        src="https://sampleswap.org/samples-ghost/VOCAL%20ACAPELLAS/Snowflake/9218[kb]snowflake-In-Peace-cc-by.mp3.mp3"
        rootClass={styles.player}
      />
      <AudioPlayer
        src="https://sampleswap.org/samples-ghost/PUBLIC%20DOMAIN%20SPOKEN%20WORD/7715[kb]Martin-Luther-King-I-Have-A-Dream.mp3.mp3"
        rootClass={styles.player}
      />
      <AudioPlayer
        src="https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/078%20gamelon%20bass%20groove/4249[kb]078_gamelan-bass-groove.wav.mp3"
        rootClass={styles.player}
      />
    </main>
  );
};

export default page;
