import { PageSetup } from "@/components/managers";
import { pieChartData } from "@/data/dummy/pieChartData";
import { PieChart } from "@/lib/ui/elements/charts/PieChart";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="pie-chart" />

      <PieChart
        payload={pieChartData}
        margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
      />
    </main>
  );
};

export default Page;
