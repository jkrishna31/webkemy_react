import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/components/elements/badge";
import { Button } from "@/lib/components/elements/butttons";
import BellIcon from "@/lib/svgs/icons/BellIcon";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="badge" />

      <Button variant="muted" className={styles.btn} aria-label="Notifications">
        <BellIcon />
        <Badge className={styles.dot_badge} />
      </Button>
      <Button variant="muted" className={styles.btn} aria-label="Notifications">
        <BellIcon />
        <Badge color="red" className={styles.dot_badge} />
      </Button>
      <Button variant="muted" className={styles.btn} aria-label="Notifications">
        <BellIcon />
        <Badge color="green" className={styles.dot_badge} animate="ripple" />
      </Button>
      <Button variant="muted" className={styles.btn} aria-label="Notifications">
        <BellIcon />
        <Badge color="blue" className={styles.dot_badge} />
      </Button>
      <Button variant="muted" className={styles.btn} aria-label="Notifications">
        <BellIcon />
        <Badge color="yellow" className={styles.dot_badge} />
      </Button>
      <Button variant="muted" className={styles.btn} aria-label="Notifications">
        <BellIcon />
        <Badge color="blue" className={styles.dot_badge}>{"99+"}</Badge>
      </Button>
    </main>
  );
};

export default Page;
