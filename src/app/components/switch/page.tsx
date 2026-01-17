import { PageSetup } from "@/components/managers";
import { Switch } from "@/lib/ui/elements/inputs/Switch";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="switch" />

      <Switch switchSize="sm" aria-label="Switch" />
      <Switch switchSize="md" aria-label="Switch" />
      <Switch switchSize="lg" aria-label="Switch" />
    </main>
  );
};

export default page;
