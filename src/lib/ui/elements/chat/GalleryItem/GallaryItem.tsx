import Image from "next/image";

import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { MediaItem } from "@/lib/ui/elements/chat/ChatMedia";
import { Checkbox } from "@/lib/ui/elements/inputs/Checkbox";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import PlayIcon from "@/lib/ui/svgs/icons/PlayIcon";
import { formatDate } from "@/lib/utils/datetime.utils";

import styles from "./GallaryItem.module.scss";

export interface GallaryItemProps {
  media: MediaItem;
  user?: any;
  datetime?: string;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onUserClick?: () => void;
}

const GallaryItem = ({
  media, user, datetime, selectable, selected, onSelect, onUserClick, onClick,
  ...restProps
}: GallaryItemProps) => {
  const isImage = media.type?.includes("image");
  const isAudio = !isImage && media.type?.includes("audio");
  const isVideo = !isAudio && media.type?.includes("video");

  if (!isImage) return null;
  // if video, use thumbnail
  // if audio, ...

  return (
    <div
      className={styles.wrapper}
      title={media.name}
    >
      <Image src={media.src} alt={media.name || media.id} width={80} height={80} unoptimized className={styles.thumbnail} />

      <div className={styles.overlay}>
        <div className={styles.header}>
          {!!user?.profile && (
            <div className={styles.user}>
              <Avatar className={styles.user_avatar}>
                <Image src={user.profile} alt={user.name ?? user.id} width={30} height={30} />
              </Avatar>
              <p className={styles.username}>{user.name}</p>
            </div>
          )}
          {!!selectable && <Checkbox className={styles.checkbox} />}
        </div>
        {!!isVideo && (
          <div className={styles.body}>
            <PlayIcon className={styles.play_icon} />
          </div>
        )}
        <div className={styles.footer}>
          <div className={styles.details}>
            <p className={styles.filename}>{media.name}</p>
            {!!datetime && (
              <p className={styles.datetime}>{formatDate(datetime)}</p>
            )}
          </div>
          <Button
            variant="tertiary"
            className={styles.actions_btn}
          >
            <EllipsisHIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GallaryItem;
