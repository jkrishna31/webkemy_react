import { PageSetup } from "@/components/managers";
import { Chatbot } from "@/lib/ui/elements/chatbot";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="chatbot" />

      <Chatbot />
    </main>
  );
};

export default Page;
