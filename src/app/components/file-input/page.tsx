"use client";


import { PageSetup } from "@/components/managers";
import { FilesPreview } from "@/lib/components/elements/FilesPreview";
import { FileInput } from "@/lib/components/elements/inputs/FileInput";
import { useFiles } from "@/lib/hooks/useFiles";

import styles from "./page.module.scss";

const Page = () => {
  const { filelist, setFilelist, deleteFileByName } = useFiles();

  return (
    <main className={styles.main}>
      <PageSetup pageKey="file-input" />

      <FileInput
        className={styles.input}
        files={filelist}
        multiple
        onInput={(e) => setFilelist((e.target as HTMLInputElement)?.files ?? undefined)}
        aria-label="Choose File(s)"
      />
      <FilesPreview
        files={filelist?.length ? Array.from(filelist) : []}
        onDelete={deleteFileByName}
        className={styles.preview}
      />
    </main>
  );
};

export default Page;
