import { PageSetup } from "@/components/managers";
import { testimonialsData } from "@/data/dummy/testimonialsData";
import { Testimonials } from "@/lib/ui/blocks/Testimonials";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="testimonials" />

      <Testimonials
        className={styles.testimonials}
        testimonials={testimonialsData}
      // direction="up"
      />
      <Testimonials
        className={styles.testimonials}
        testimonials={testimonialsData}
        direction="right"
      />
    </main>
  );
};

export default Page;
