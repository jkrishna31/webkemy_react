import { PageSetup } from "@/components/managers";
import { Scrollable } from "@/lib/components/elements/Scrollable";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="scroll-controls" />

      <Scrollable rootClass={styles.list} className={styles.scrollable}>
        {
          Array.from({ length: 15 }).map((_, idx) => (
            <div className={styles.item} key={idx}>{idx + 1}</div>
          ))
        }
      </Scrollable>
    </main>
  );
};

export default Page;
