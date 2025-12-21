"use client";

import React from "react";

import { PageSetup } from "@/components/managers";
import useFiles from "@/lib/hooks/useFiles";
import { FilesPreview } from "@/lib/ui/elements/FilesPreview";
import { FileInput } from "@/lib/ui/elements/inputs/FileInput";

import styles from "./styles.module.scss";

const Page = () => {
  const { filelist, setFilelist, deleteFileByName } = useFiles();

  return (
    <main className={styles.main}>
      <PageSetup pageKey="file-input" />

      <FileInput
        className={styles.input}
        files={filelist}
        multiple
        onInput={(e) => setFilelist((e.target as HTMLInputElement)?.files)}
        aria-label="Choose File(s)"
      />
      <FilesPreview
        mode="file"
        files={filelist?.length ? Array.from(filelist) : []}
        onDelete={deleteFileByName}
        className={styles.preview}
      />
    </main>
  );
};

export default Page;
