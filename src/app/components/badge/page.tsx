import React from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { BellIcon } from "@/lib/ui/svgs/icons";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="badge" />

      <Button variant="tertiary" className={styles.btn}>
        <BellIcon />
        <Badge className={styles.dot_badge} />
      </Button>
      <Button variant="tertiary" className={styles.btn}>
        <BellIcon />
        <Badge color="red" className={styles.dot_badge} />
      </Button>
      <Button variant="tertiary" className={styles.btn}>
        <BellIcon />
        <Badge color="green" className={styles.dot_badge} animate="ripple" />
      </Button>
      <Button variant="tertiary" className={styles.btn}>
        <BellIcon />
        <Badge color="blue" className={styles.dot_badge} />
      </Button>
      <Button variant="tertiary" className={styles.btn}>
        <BellIcon />
        <Badge color="yellow" className={styles.dot_badge} />
      </Button>
      <Button variant="tertiary" className={styles.btn}>
        <BellIcon />
        <Badge color="blue" className={styles.dot_badge}>{"99+"}</Badge>
      </Button>
    </main>
  );
};

export default Page;
