import { PageSetup } from "@/components/managers";
import { barChartData } from "@/data/dummy/barChartData";
import { BarChart } from "@/lib/ui/elements/charts/BarChart";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="bar-chart" />

      <BarChart
        id="v"
        payload={barChartData}
        margin={{ top: 12, right: 50, bottom: 40, left: 50 }}
        axes={{ y: { title: "Marks" } }}
        width={800}
        height={400}
      />
      <BarChart
        id="h"
        payload={barChartData}
        margin={{ top: 35, right: 12, bottom: 52, left: 35 }}
        orient="h"
        axes={{ x: { title: "Marks" } }}
        height={800}
        width={460}
      // fit
      />
    </main>
  );
};

export default Page;
