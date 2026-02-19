import { PageSetup } from "@/components/managers";
import { Virtualizer } from "@/lib/ui/elements/Virtualizer";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="virtualizer" />

      {/* <Virtualizer /> */}
    </main>
  );
};

export default Page;
