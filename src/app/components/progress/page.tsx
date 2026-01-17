"use client";

import { useEffect, useRef, useState } from "react";

import { PageSetup } from "@/components/managers";
import { Progress } from "@/lib/ui/elements/Progress";

import styles from "./page.module.scss";

const Page = () => {
  const [value, setValue] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setValue(oldVal => oldVal + 1 >= 100 ? 0 : oldVal + 1);
    }, 200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
