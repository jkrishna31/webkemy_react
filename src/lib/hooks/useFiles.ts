import { useState } from "react";

export default function useFiles() {
  const [filelist, setFilelist] = useState<FileList | null>(null);

  // todo: handle json object for uploaded files

  const deleteFileByName = (filename: string) => {
    const dt = new DataTransfer();
    if (filelist?.length) {
      for (let i = 0; i < filelist.length; i++) {
        if (filelist[i].name !== filename) {
          dt.items.add(filelist[i]);
        }
      }
    }
    setFilelist(dt.files);
  };

  return {
    filelist,
    setFilelist,
    deleteFileByName,
  };
}
