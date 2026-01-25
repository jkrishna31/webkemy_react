import { PageSetup } from "@/components/managers";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="faqs" />
    </main>
  );
};

export default Page;
