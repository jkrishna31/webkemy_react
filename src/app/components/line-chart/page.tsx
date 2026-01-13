import { PageSetup } from "@/components/managers";
import { lineChartData2 } from "@/data/dummy/lineChartData";
import { LineChart } from "@/lib/ui/elements/charts/LineChart";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="line-chart" />

      <LineChart
        payload={lineChartData2}
        margin={{ top: 12, right: 12, bottom: 50, left: 50 }}
        width={800}
        height={400}
        axes={{ y: { title: "Marks" } }}
      // fit
      />
    </main>
  );
};

export default Page;
