import Image from "next/image";
import React from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { CrossIcon } from "@/lib/ui/svgs/icons";

import styles from "./RenderCoverImg.module.scss";

const RenderCoverImg = ({
  edit, src, alt, onDelete,
}: {
  edit?: boolean, src: string, alt: string, onDelete?: any
}) => {
  return src ? (
    <div className={styles.wrapper}>
      <Image src={src} width={800} height={450} alt={alt} className={styles.img} />
      {
        edit ? (
          <Button
            className={styles.pii_db} icon={<CrossIcon className={styles.del_icon} />}
            onClick={onDelete}
          />
        ) : null
      }
    </div>
  ) : null;
};

export default RenderCoverImg;
