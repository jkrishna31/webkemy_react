import { Button } from "@/lib/ui/elements/butttons";
import { Text } from "@/lib/ui/elements/text";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Text<"h1"> as="h1" className={styles.title}>{"WEBKEMY"}</Text>
      <Text<"p"> as="p" className={styles.desc}>{"Minimal. Accessible. Easily-Extensible. React/NextJS Components."}</Text>
      <Button<"a"> variant="primary" href="/components">{"Components"}</Button>
    </main>
  );
}
