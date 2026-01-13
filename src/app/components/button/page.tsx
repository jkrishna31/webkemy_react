import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/ui/elements/butttons";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="button" />

      <Button variant="primary">
        {"Primary Button"}
      </Button>
      <Button variant="secondary">
        {"Secondary Button"}
      </Button>
      <Button variant="tertiary">
        {"Teritiary Button"}
      </Button>
      <Button variant="text">
        {"Text Button"}
      </Button>
    </main>
  );
};

export default Page;
