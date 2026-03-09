import { PageSetup } from "@/components/managers";
import { TextArea } from "@/lib/ui/elements/inputs/TextArea";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="textarea" />

      <TextArea rows={4} placeholder="Textarea with 4 rows by default & auto-resizable" aria-label="Textarea" />
      <TextArea rows={2} placeholder="Textarea with 2 rows by default & no-resize" autoResize={false} aria-label="Textarea" />
      <TextArea placeholder="Textarea with no multiline (wraps)" multiline={false} aria-label="Textarea" />
    </main>
  );
};

export default page;
