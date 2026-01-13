import { PageSetup } from "@/components/managers";
import { EmojiPicker } from "@/lib/ui/elements/EmojiPicker";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="emoji-picker" />

      <EmojiPicker />
    </main>
  );
};

export default page;
