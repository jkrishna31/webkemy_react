"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/ui/elements/butttons";
import { Lightbox } from "@/lib/ui/elements/Lightbox";

import styles from "./styles.module.scss";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="lightbox" />

      <Button variant="secondary" onClick={() => setOpen(true)}>
        {"Open Lightbox"}
      </Button>

      {
        open ? (
          <Lightbox open={open} onClose={() => setOpen(false)} />
        ) : null
      }
    </main>
  );
};

export default Page;
