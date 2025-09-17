import React from "react";

import { PageSetup } from "@/components/managers";
import { geoChartData } from "@/data/dummy/geoChartData";
import { GeoChart } from "@/lib/ui/elements/charts";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="geo-chart" />

      <GeoChart
        margin={{ top: 6, right: 0, bottom: 6, left: 0 }}
        width={800}
        height={440}
        payload={geoChartData}
        fit
      />
    </main>
  );
};

export default Page;
