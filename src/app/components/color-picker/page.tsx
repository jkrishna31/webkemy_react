import React from "react";

import { PageSetup } from "@/components/managers";
import { ColorPicker } from "@/lib/ui/elements/inputs/ColorPicker";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="color-picker" />

      <ColorPicker />
    </main>
  );
};

export default page;
