"use client";


import { PageSetup } from "@/components/managers";
import { ToastType, useToastActions } from "@/data/stores";
import { Button } from "@/lib/components/elements/buttton";
import { generateId } from "@/lib/utils/crypto";

import styles from "./page.module.scss";

const Page = () => {
  const toastActions = useToastActions();

  const addToast = (type?: ToastType) => {
    const id = generateId(4);
    toastActions.addToast({
      id: id,
      message: "Dummy Toast: " + id + ". Auto closes after 5s.",
      timeout: 5000,
      type,
    });
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="toast" />

      <Button variant="outlined" className={styles.button} onClick={() => addToast()}>
        {"Add Toast"}
      </Button>
      <Button variant="outlined" className={styles.button} onClick={() => addToast("success")}>
        {"Add Success Toast"}
      </Button>
      <Button variant="outlined" className={styles.button} onClick={() => addToast("info")}>
        {"Add Info Toast"}
      </Button>
      <Button variant="outlined" className={styles.button} onClick={() => addToast("warn")}>
        {"Add Warn Toast"}
      </Button>
      <Button variant="outlined" className={styles.button} onClick={() => addToast("error")}>
        {"Add Error Toast"}
      </Button>
      <Button variant="outlined" className={styles.button} onClick={() => addToast("critical")}>
        {"Add Critical Toast"}
      </Button>
    </main>
  );
};

export default Page;
