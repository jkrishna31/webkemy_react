"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { positions } from "@/constants/general.const";
import { Button } from "@/lib/components/elements/butttons";
import { Modal, ModalHeader } from "@/lib/components/elements/Modal";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";

import styles from "./page.module.scss";

const Page = () => {
  const [open, setOpen] = useState<(typeof positions)[keyof typeof positions]>();

  const handleClose = () => setOpen(undefined);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="modal" />

      <Button variant="outlined" onClick={() => setOpen(positions.TOP_CENTER)}>
        {"Open Top-Center Modal"}
      </Button>
      <Button variant="outlined" onClick={() => setOpen(positions.CENTER)}>
        {"Open Center Modal"}
      </Button>
      <Button variant="outlined" onClick={() => setOpen(positions.BOTTOM_CENTER)}>
        {"Open Bottom-Center Modal"}
      </Button>

      {
        open ? (
          <Modal pos={open} onClose={handleClose} overlay>
            <ModalHeader titleText="Dummy Title" className={styles.header}>
              <button className={styles.close_btn} onClick={handleClose} autoFocus>
                <CrossIcon />
              </button>
            </ModalHeader>
            <div className={styles.content}>
              {"Welcome!"}
            </div>
          </Modal>
        ) : null
      }
    </main>
  );
};

export default Page;
