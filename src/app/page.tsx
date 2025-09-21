import { Button } from "@/lib/ui/elements/butttons";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button<"a"> variant="primary" href="/components">{"Components"}</Button>
    </main>
  );
}
