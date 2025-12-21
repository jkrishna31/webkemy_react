"use client";

import Image from "next/image";
import React, { ComponentProps, useEffect, useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import { hasDOM } from "@/lib/utils/client.utils";
import { formatSize } from "@/lib/utils/format.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./FilesPreview.module.scss";


interface IPreview {
  id?: number | string
  name: string
  src?: string
  size?: number
  label?: string
  type: "file" | "src"
}

export interface FilesPreviewProps extends ComponentProps<"ul"> {
  mode?: "file" | "img" | "mixed";
  files?: File[];
  srcs?: string[];
  onDelete?: any;
  noHeading?: boolean;
}

const FilesPreview = ({
  mode, files, srcs, className, onDelete, noHeading,
  ...props
}: FilesPreviewProps) => {
  const [previews, setPreviews] = useState<IPreview[]>([]);

  useEffect(() => {
    const pLocal: IPreview[] = [];
    if (hasDOM() && files?.length) {
      for (let i = 0; i < files.length; i++) {
        if (mode !== "file" && files[i].type.startsWith("image")) {
          pLocal.push({
            name: files[i].name,
            src: URL.createObjectURL(files[i]),
            type: "file",
          });
        } else if (mode === "file" && files[i].type !== "application/json") {
          // first 5 chars of name + .ext (split on last .)
          const nameParts = files[i].name.split(".");
          const formattedName = (nameParts[0].length <= 10 ? nameParts[0] : nameParts[0].substring(0, 10)) + "..." + nameParts.at(-1);
          pLocal.push({
            name: files[i].name,
            label: formattedName,
            size: files[i].size,
            type: "file",
          });
        }
      }
    }
    if (srcs?.length) {
      if (mode !== "file") {
        srcs.forEach((src: string) => {
          pLocal.push({
            name: src,
            src: src,
            type: "src",
          });
        });
      } else if (mode === "file") {

      }
    }
    setPreviews(pLocal);
  }, [files, mode, srcs]);

  const handleDelete = (item: IPreview) => {
    onDelete?.(item.name, item.type === "src");
  };

  return previews.length ? (
    <div className={classes(styles.wrapper, className)}>
      {
        (previews.length > 1 && !noHeading) ? (
          <p className={styles.count}>{previews.length}{" "}{srcs?.length ? "Image(s)" : "File(s)"}</p>
        ) : null
      }
      <ul className={styles.pc} {...props}>
        {
          previews?.map((preview) => {
            if (mode !== "file") {
              return (
                <li className={styles.pi_img} key={preview.name}>
                  <Image width={60} height={60} src={preview?.src ?? ""} alt={preview.name} className={styles.img} />
                  <Button
                    className={styles.pii_db} icon={<CrossIcon className={styles.del_icon} />}
                    onClick={() => handleDelete(preview)}
                  />
                </li>
              );
            } else if (mode === "file") {
              return (
                <li className={styles.pi_file} key={preview.name}>
                  <div className={styles.pi_left}>
                    <b className={styles.fn}>{preview.label}</b>
                    <p className={styles.fs}>{formatSize(preview.size ?? 0)}</p>
                  </div>
                  <div className={styles.pi_right}>
                    <Button
                      className={styles.pif_db} icon={<CrossIcon className={styles.del_icon} />}
                      onClick={() => handleDelete(preview)}
                    />
                  </div>
                </li>
              );
            }
          })
        }
      </ul>
    </div>
  ) : null;
};

export default FilesPreview;
