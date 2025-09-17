"use client";

import React from "react";

import { PageSetup } from "@/components/managers";
import { ToastType, useToastActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./styles.module.scss";

const Page = () => {
  const toastActions = useToastActions();

  const addToast = (type?: ToastType) => {
    const id = getUniqueId(4);
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

      <Button variant="secondary" className={styles.button} onClick={() => addToast()}>
        {"Add Toast"}
      </Button>
      <Button variant="secondary" className={styles.button} onClick={() => addToast("success")}>
        {"Add Success Toast"}
      </Button>
      <Button variant="secondary" className={styles.button} onClick={() => addToast("info")}>
        {"Add Info Toast"}
      </Button>
      <Button variant="secondary" className={styles.button} onClick={() => addToast("warn")}>
        {"Add Warn Toast"}
      </Button>
      <Button variant="secondary" className={styles.button} onClick={() => addToast("error")}>
        {"Add Error Toast"}
      </Button>
      <Button variant="secondary" className={styles.button} onClick={() => addToast("critical")}>
        {"Add Critical Toast"}
      </Button>
    </main>
  );
};

export default Page;
