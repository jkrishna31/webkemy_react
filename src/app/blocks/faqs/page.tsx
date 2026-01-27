import { PageSetup } from "@/components/managers";
import { faqsData } from "@/data/dummy/faqsData";
import { FAQs } from "@/lib/ui/blocks/FAQs";

import styles from "./page.module.scss";

const Page = () => {

  return (
    <main className={styles.main}>
      <PageSetup pageKey="faqs" />

      <FAQs faqs={faqsData} className={styles.faqs} />
    </main>
  );
};

export default Page;
