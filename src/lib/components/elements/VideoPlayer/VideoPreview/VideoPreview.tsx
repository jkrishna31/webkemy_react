import Image from "next/image";
import { ComponentProps } from "react";

import { MediaItem } from "@/lib/components/elements/chat/ChatMedia";
import PlayIcon from "@/lib/svgs/icons/PlayIcon";
import { breakdownTime } from "@/lib/utils/datetime";
import { classes } from "@/lib/utils/style";

import styles from "./VideoPreview.module.scss";

export interface VideoPreviewProps extends Omit<ComponentProps<"video">, "onClick"> {
  thumbnails?: MediaItem[];
  onClick?: () => void;
}

const VideoPreview = ({
  thumbnails,
  className,
  onClick,
  ...restProps
}: VideoPreviewProps) => {
  const duration = breakdownTime(thumbnails?.[0]?.duration ?? 0, "second");
  return (
    <div
      className={classes(styles.wrapper, className)}
      onClick={onClick}
    >
      {!!thumbnails?.length && (
        <Image
          src={thumbnails[0].src}
          alt={thumbnails[0].name || thumbnails[0].id}
          width={100}
          height={100}
          unoptimized
        />
      )}
      <div className={styles.play_btn}>
        <PlayIcon />
      </div>
      <div className={styles.duration}>
        {duration.minute}{":"}{duration.second}
      </div>
    </div>
  );
};

export default VideoPreview;
