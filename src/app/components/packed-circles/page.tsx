import { PageSetup } from "@/components/managers";
import { pcData } from "@/data/dummy/pcData";
import { PackedCircles } from "@/lib/ui/elements/charts/PackedCircles";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="packed-circles" />

      <PackedCircles
        margin={{ top: 6, right: 0, bottom: 6, left: 0 }}
        width={500}
        height={400}
        payload={pcData}
      // fit
      />
    </main>
  );
};

export default Page;
