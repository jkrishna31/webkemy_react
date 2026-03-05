"use client";

import Image from "next/image";
import { ComponentProps, useEffect, useEffectEvent, useState } from "react";

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
  type: "file" | "src" | "image";
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

  const isAllImages = previews.every(item => item.type === "image");

  const updatePeviews = useEffectEvent((_previews: IPreview[]) => {
    setPreviews(_previews);
  });

  useEffect(() => {
    const pLocal: IPreview[] = [];
    if (hasDOM() && files?.length) {
      for (let i = 0; i < files.length; i++) {
        const fileType = files[i].type;
        // first 5 chars of name + .ext (split on last .)
        const nameParts = files[i].name.split(".");
        const formattedName = (nameParts[0].length <= 10 ? nameParts[0] : nameParts[0].substring(0, 10)) + "..." + nameParts.at(-1);
        const isImage = fileType.startsWith("image/");
        const payload: IPreview = {
          name: files[i].name,
          label: formattedName,
          size: files[i].size,
          type: isImage ? "image" : "file",
        };
        if (isImage) {
          payload.src = URL.createObjectURL(files[i]);
        }
        pLocal.push(payload);
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
    updatePeviews(pLocal);
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
            if (isAllImages) {
              return (
                <li
                  key={preview.name}
                  className={styles.pi_img}
                >
                  <Image width={60} height={60} src={preview?.src ?? ""} alt={preview.name} className={styles.img} />
                  <Button
                    className={styles.pii_db}
                    icon={<CrossIcon className={styles.del_icon} />}
                    onClick={() => handleDelete(preview)}
                  />
                </li>
              );
            } else {
              return (
                <li
                  key={preview.name}
                  className={styles.pi_file}
                >
                  {preview.type === "image" && (
                    <div>
                      <Image width={60} height={60} src={preview?.src ?? ""} alt={preview.name} className={styles.img} />
                    </div>
                  )}
                  <div className={styles.pi_left}>
                    <p className={styles.filename}>{preview.label}</p>
                    <p className={styles.filesize}>{formatSize(preview.size ?? 0)}</p>
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
