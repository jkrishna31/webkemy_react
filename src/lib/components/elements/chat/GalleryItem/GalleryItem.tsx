import Image from "next/image";

import { Avatar } from "@/lib/components/elements/avatar";
import { Button } from "@/lib/components/elements/buttton";
import { MediaItem } from "@/lib/components/elements/chat/ChatMedia";
import { Checkbox } from "@/lib/components/elements/checkbox";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import PlayIcon from "@/lib/svgs/icons/PlayIcon";
import { breakdownTime, formatDate, formatTime } from "@/lib/utils/datetime";

import styles from "./GalleryItem.module.scss";

export interface GalleryItemProps {
  media: MediaItem;
  showTime?: boolean;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onUserClick?: () => void;
  onOptions?: () => void;
}

const GalleryItem = ({
  media, showTime, selectable, selected, onSelect, onUserClick, onClick, onOptions,
  ...restProps
}: GalleryItemProps) => {
  const isImage = media.type?.includes("image");
  const isAudio = !isImage && media.type?.includes("audio");
  const isVideo = !isAudio && media.type?.includes("video");

  if (isAudio) return null;

  const src = isImage ? media.src : isVideo ? media?.thumbnails?.[0]?.src : "";
  const duration = breakdownTime(media.thumbnails?.[0].duration ?? 0, "second");

  return (
    <div
      className={styles.wrapper}
      title={media.name}
      onClick={onClick}
    >
      <Image src={src ?? ""} alt={media.name || media.id} width={80} height={80} unoptimized className={styles.thumbnail} />

      <div className={styles.overlay}>
        <div className={styles.header}>
          {!!media.user?.profile && (
            <div className={styles.user}>
              <Avatar className={styles.user_avatar} src={media.user?.profile} alt={media.user?.name ?? media.user?.id} />
              <p className={styles.username}>{media.user?.name}</p>
            </div>
          )}
          {!!selectable && <Checkbox className={styles.checkbox} />}
        </div>
        {!!isVideo && (
          <>
            <div className={styles.body}>
              <PlayIcon className={styles.play_icon} />
            </div>
            <div className={styles.duration}>{duration.minute}{":"}{duration.second}</div>
          </>
        )}
        <div className={styles.footer}>
          <div className={styles.details}>
            <p className={styles.filename}>{media.name}</p>
            {!!media.createdOn && (
              <p className={styles.datetime}>{showTime ? formatTime(media.createdOn) : formatDate(media.createdOn)}</p>
            )}
          </div>
          <Button
            variant="muted"
            className={styles.actions_btn}
            onClick={onOptions}
          >
            <EllipsisHIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
