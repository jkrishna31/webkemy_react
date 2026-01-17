import { PageSetup } from "@/components/managers";
import { heatMapData } from "@/data/dummy/heatMapData";
import { HeatMap } from "@/lib/ui/elements/charts/HeatMap";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="heatmap" />

      <HeatMap
        payload={heatMapData}
        margin={{ top: 6, right: 6, bottom: 30, left: 30 }}
        height={260}
        width={460}
      // fit
      />
    </main>
  );
};

export default Page;
