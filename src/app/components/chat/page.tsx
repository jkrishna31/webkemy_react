import { PageSetup } from "@/components/managers";
import { Chatbot } from "@/lib/components/elements/chatbot";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="chat" />

      <Chatbot />
    </main>
  );
};

export default Page;
