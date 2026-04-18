"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/components/elements/butttons";
import { Modal } from "@/lib/components/elements/modal";
import { Positions } from "@/lib/constants/position";

import styles from "./page.module.scss";

const Page = () => {
  const [open, setOpen] = useState<(typeof Positions)[keyof typeof Positions]>();

  const handleClose = () => setOpen(undefined);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="modal" />

      <Button variant="outlined" onClick={() => setOpen(Positions.TOP_CENTER)}>
        {"Open Top-Center Modal"}
      </Button>
      <Button variant="outlined" onClick={() => setOpen(Positions.CENTER)}>
        {"Open Center Modal"}
      </Button>
      <Button variant="outlined" onClick={() => setOpen(Positions.BOTTOM_CENTER)}>
        {"Open Bottom-Center Modal"}
      </Button>

      {
        open ? (
          <Modal pos={open} onClose={handleClose} overlay>
            <Modal.Header title="Dummy Title" className={styles.header} onClose={handleClose} />
            <div className={styles.content}>{"Welcome!"}</div>
          </Modal>
        ) : null
      }
    </main>
  );
};

export default Page;
