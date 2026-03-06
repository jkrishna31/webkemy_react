import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

import { characters } from "@/constants/characters.const";
import { AudioPlayer } from "@/lib/ui/elements/AudioPlayer";
import { Button } from "@/lib/ui/elements/butttons";
import { VideoPlayer } from "@/lib/ui/elements/VideoPlayer";
import DownloadIcon from "@/lib/ui/svgs/icons/DownloadIcon";
import { formatSize } from "@/lib/utils/format.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatMedia.module.scss";

export interface MediaItem {
  id: string;
  name?: string;
  src: string;
  type?: string;
  size?: number;
}

export interface ChatMediaProps extends ComponentProps<"div"> {
  chatId: string;
  media?: MediaItem[];
  onMediaClick?: (chatId: string, mediaId?: string) => void;
}

const ChatMedia = ({
  chatId, media, onMediaClick,
  className,
  ...restProps
}: ChatMediaProps) => {
  const images: MediaItem[] = [], audio: MediaItem[] = [], video: MediaItem[] = [], others: MediaItem[] = [];

  media?.forEach(item => {
    if (item.type === "image") images.push(item);
    else if (item.type === "video") video.push(item);
    else if (item.type === "audio") audio.push(item);
    else others.push(item);
  });

  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      {images.length >= 1 && (
        <div className={classes(styles.gallary, images.length === 1 && styles.individual)}>
          {images.slice(0, images.length > 4 ? 4 : undefined).map((item, idx) => (
            <div
              key={item.id}
              className={classes(styles.img_item, idx === 3 && styles.more)}
              onClick={() => onMediaClick?.(chatId, item.id)}
            >
              <Image src={item.src} width={80} height={80} alt={item.name || item.id} unoptimized />
              {(idx === 3 && images.length > 4) && (
                <Button variant="tertiary" className={styles.img_more}>
                  {"+"}{images.length - 3}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
      {!!audio.length && (
        <div className={styles.audios}>
          {audio.map(item => (
            <AudioPlayer key={item.id} src={item.src} rootClass={styles.audio_player} />
          ))}
        </div>
      )}
      {!!video.length && (
        <div className={styles.videos}>
          {video.map(item => (
            <VideoPlayer key={item.id} src={item.src} />
          ))}
        </div>
      )}
      {!!others.length && (
        <div className={styles.others}>
          {others.map(item => (
            <div key={item.id} className={styles.other_item}>
              <div className={styles.controls}>
                <Button variant="tertiary">
                  <DownloadIcon />
                </Button>
              </div>
              <Link href={item.src ?? "#"} target="_blank" className={styles.details}>
                <p className={styles.filename}>{item.name}</p>
                <p className={styles.meta}>
                  <span className={styles.size}>{formatSize(item.size ?? 0)}</span>
                  <span className={styles.separator}>{characters.BULLET}</span>
                  <span className={styles.type}>{item.type}</span>
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMedia;
