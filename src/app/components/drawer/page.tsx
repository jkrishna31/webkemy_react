"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/components/elements/butttons";
import { Drawer, DrawerBody, DrawerHeader } from "@/lib/components/elements/Drawer";

import styles from "./page.module.scss";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="drawer" />

      <Button variant="outlined" onClick={() => setOpen(true)}>
        {"Open Drawer in Center"}
      </Button>
      {
        open ? (
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            className={styles.drawer}
          >
            <DrawerHeader
              titleText="Drawer Title"
              onClose={() => setOpen(false)}
            >

            </DrawerHeader>
            <DrawerBody>

            </DrawerBody>
          </Drawer>
        ) : null
      }
    </main>
  );
};

export default Page;
