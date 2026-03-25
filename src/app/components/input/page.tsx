import { PageSetup } from "@/components/managers";
import { GeneralInput } from "@/lib/components/elements/inputs/GeneralInput";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="input" />

      <GeneralInput placeholder="Write here..." className={styles.input} />
    </main>
  );
};

export default page;
