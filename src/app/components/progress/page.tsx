"use client";

import { useEffect, useState } from "react";

import { PageSetup } from "@/components/managers";
import { Progress } from "@/lib/ui/elements/Progress";

import styles from "./styles.module.scss";

const Page = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValue(oldVal => oldVal + 1);
    }, 200);
  }, []);

  useEffect(() => {
    if (value >= 100) {
      setValue(0);
    }
  }, [value]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="progress" />

      <Progress variant="circular" />
      <Progress variant="linear" />
      <Progress variant="circular" value={value} />
      <Progress variant="linear" value={value} />
    </main>
  );
};

export default Page;
