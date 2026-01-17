import { PageSetup } from "@/components/managers";
import { scatterChartData } from "@/data/dummy/scatterChartData";
import { ScatterChart } from "@/lib/ui/elements/charts/ScatterChart";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="scatter-chart" />

      <ScatterChart
        payload={scatterChartData}
        margin={{ top: 12, right: 12, bottom: 48, left: 60 }}
        width={400}
        height={400}
        fit
      />
    </main>
  );
};

export default Page;
