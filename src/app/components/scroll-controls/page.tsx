import React from "react";

import { PageSetup } from "@/components/managers";
import { Scrollable } from "@/lib/ui/elements/scrollable";
import { classes } from "@/lib/utils/style.utils";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="scroll-controls" />

      <div className={classes(styles.list, "scroll_invisible")}>
        <Scrollable className={styles.scrollable}>
          {
            Array.from({ length: 15 }).map((_, idx) => (
              <div className={styles.item} key={idx}>{idx + 1}</div>
            ))
          }
        </Scrollable>
      </div>
    </main>
  );
};

export default Page;
