import React from "react";

import { PageSetup } from "@/components/managers";
import { radarChartData } from "@/data/dummy/radarChartData";
import { RadarChart } from "@/lib/ui/elements/charts";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="radar-chart" />

      <RadarChart
        margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
        width={500}
        height={500}
        payload={radarChartData}
        fit
      />
    </main>
  );
};

export default Page;
