import React from "react";

import { PageSetup } from "@/components/managers";
import { Rate } from "@/lib/ui/elements/rate";
import { CircleIcon, DiamondIcon } from "@/lib/ui/svgs/icons";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="rate" />

      <Rate aria-label="Rate" />
      <Rate max={7} color="blue" icon={<DiamondIcon />} aria-label="Rate" />
      <Rate max={3} noStroke aria-label="Rate" />
      <Rate rating={2.5} color="orange" noStroke readonly aria-label="Rate" />
      <Rate rating={4.35} color="green" readonly aria-label="Rate" />
      <Rate rating={3} color="red" disabled icon={<CircleIcon />} aria-label="Rate" />
    </main>
  );
};

export default page;
