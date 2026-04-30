import { PageSetup } from "@/components/managers";
import { Input } from "@/lib/components/elements/input";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="input" />

      <Input placeholder="Write here..." className={styles.input} />
    </main>
  );
};

export default page;
