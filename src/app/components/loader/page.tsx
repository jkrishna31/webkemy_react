import React from "react";

import { PageSetup } from "@/components/managers";
import { BarsLoader, DotsLoader, LineLoader, RippleLoader, SkeletonLoader } from "@/lib/ui/elements/loaders";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="loader" />

      <RippleLoader />
      <BarsLoader />
      <DotsLoader />
      <SkeletonLoader />
      {/* <LineLoader /> */}
    </main>
  );
};

export default page;
