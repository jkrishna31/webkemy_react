import Image from "next/image";
import Link from "next/link";
import { ComponentProps, MouseEvent } from "react";

import { AudioPlayer } from "@/lib/components/elements/AudioPlayer";
import { Button } from "@/lib/components/elements/butttons";
import { ChatControls } from "@/lib/components/elements/chat/ChatItem";
import { Progress } from "@/lib/components/elements/Progress";
import { VideoPreview } from "@/lib/components/elements/VideoPlayer";
import { Characters } from "@/lib/constants/characters";
import ClockwiseIcon from "@/lib/svgs/icons/ClockwiseIcon";
import DownloadIcon from "@/lib/svgs/icons/DownloadIcon";
import { formatSize } from "@/lib/utils/format";
import { classes } from "@/lib/utils/style";

import styles from "./ChatMedia.module.scss";

export interface MediaItem {
  id: string;
  name?: string;
  src: string;
  type?: string;
  size?: number;
  thumbnails?: MediaItem[];
  createdOn?: string;
  updatedOn?: string;
  user?: any;
  duration?: number;
  status?: string;
}

export interface ChatMediaProps extends ComponentProps<"div"> {
  chatId: string;
  media?: MediaItem[];
  onMediaClick?: (chatId: string, mediaId?: string) => void;
  useVideoPreview?: boolean;
  onQuickActionClick?: (e: MouseEvent, key: string) => void;
}

const ChatMedia = ({
  chatId, media, onMediaClick, useVideoPreview,
  className,
  ...restProps
}: ChatMediaProps) => {
  const images: MediaItem[] = [], audio: MediaItem[] = [], video: MediaItem[] = [], others: MediaItem[] = [];


  media?.forEach(item => {
    if (item.type === "image") images.push(item);
    else if (item.type === "audio") audio.push(item);
    else if (item.type === "video") video.push(item);
    else others.push(item);
  });

  const renderStatus = (_media: MediaItem[]) => {
    return (
      <div className={styles.gallery_controls}>
        {
          images.length > 1 ? (
            <Button
              variant="muted"
              color="red"
              className={styles.retry_btn}
            >
              <ClockwiseIcon className={styles.retry} />
            </Button>
          ) : (
            <Progress variant="circular" thickness={12} className={styles.progress} />
          )
        }
      </div>
    );
  };

  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      {!!audio.length && (
        <div className={styles.audios}>
          {audio.map(item => (
            <div key={item.id} className={styles.audio_item_wrapper}>
              {item.status === "failed" && <ChatControls retry />}
              <AudioPlayer
                data-id={item.id}
                src={item.src}
                rootClass={styles.audio_player}
                allowVolumeControl={false}
              />
            </div>
          ))}
        </div>
      )}
      {images.length >= 1 && (
        <div className={classes(styles.gallery, images.length === 1 && styles.individual)}>
          {images.slice(0, images.length > 4 ? 4 : undefined).map((item, idx) => (
            <div
              key={item.id}
              data-id={item.id}
              className={classes(styles.img_item, idx === 3 && styles.more)}
              onClick={() => onMediaClick?.(chatId, item.id)}
            >
              <Image src={item.src} width={80} height={80} alt={item.name || item.id} unoptimized />
              {(idx === 3 && images.length > 4) && (
                <Button variant="muted" className={styles.img_more}>
                  {"+"}{images.length - 3}
                </Button>
              )}
            </div>
          ))}
          {renderStatus(images)}
        </div>
      )}
      {!!video.length && (
        <div className={styles.videos}>
          {video.map(item => (
            <div key={item.id} className={styles.video_item_wrapper}>
              {item.status === "failed" && <ChatControls />}
              <VideoPreview
                data-id={item.id}
                thumbnails={item.thumbnails}
                className={styles.video_player}
                onClick={() => onMediaClick?.(chatId, item.id)}
              />
            </div>
          ))}
          {/* {renderStatus(video)} */}
        </div>
      )}
      {!!others.length && (
        <div className={styles.others}>
          {others.map(item => (
            <div key={item.id} className={styles.other_item_wrapper}>
              <div
                key={item.id}
                data-id={item.id}
                className={styles.other_item}
              >
                <div className={styles.controls}>
                  {item.status === "uploading" && (
                    <Progress variant="circular" thickness={12} className={styles.other_progress} />
                  )}
                  {item.status === "failed" && (
                    <Button variant="muted" color="red" className={styles.retry_file_btn} aria-label="Retry" title="Retry">
                      <ClockwiseIcon />
                    </Button>
                  )}
                  {!item.status && (
                    <Button<"a">
                      as="a"
                      href={item.src ?? "#"}
                      variant="muted"
                      className={styles.dl_file_btn}
                      download={item.src ?? "#"}
                    >
                      <DownloadIcon />
                    </Button>
                  )}
                </div>
                <Link href={item.src ?? "#"} target="_blank" className={styles.details}>
                  <p className={styles.filename}>{item.name}</p>
                  <p className={styles.meta}>
                    <span className={styles.size}>{formatSize(item.size ?? 0)}</span>
                    <span className={styles.separator}>{Characters.BULLET}</span>
                    <span className={styles.type}>{item.type}</span>
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMedia;
