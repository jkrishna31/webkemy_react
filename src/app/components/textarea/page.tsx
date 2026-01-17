import { PageSetup } from "@/components/managers";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { TextArea } from "@/lib/ui/elements/inputs/TextArea";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="textarea" />

      <InputFieldWrapper className={styles.field_wrapper}>
        <TextArea rows={4} placeholder="Textarea with 4 rows by default & auto-resizable" aria-label="Textarea" />
      </InputFieldWrapper>

      <InputFieldWrapper className={styles.field_wrapper}>
        <TextArea rows={2} placeholder="Textarea with 2 rows by default & no-resize" autoResize={false} aria-label="Textarea" />
      </InputFieldWrapper>

      <InputFieldWrapper className={styles.field_wrapper}>
        <TextArea placeholder="Textarea with no multiline (wraps)" multiline={false} aria-label="Textarea" />
      </InputFieldWrapper>
    </main>
  );
};

export default page;
