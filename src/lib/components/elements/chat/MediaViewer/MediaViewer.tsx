import { useState } from "react";

import { AudioPlayer } from "@/lib/components/elements/audio-player";
import { Button } from "@/lib/components/elements/butttons";
import { MediaItem } from "@/lib/components/elements/chat/ChatMedia";
import { ImageViewer } from "@/lib/components/elements/image-viewer";
import { Lightbox } from "@/lib/components/elements/lightbox";
import { PDFViewer } from "@/lib/components/elements/pdf-viewer";
import { VideoPlayer } from "@/lib/components/elements/video-player";

import styles from "./MediaViewer.module.scss";

export interface MediaViewerProps {
  mediaId?: string;
  media: MediaItem[];
  open?: boolean;
  onClose?: () => void;
}

const MediaViewer = ({
  media, mediaId, open, onClose,
  ...restProps
}: MediaViewerProps) => {
  const [current, setCurrent] = useState<{ id?: string; index: number; }>(
    () => ({ index: mediaId ? media.findIndex(item => item.id === mediaId) : 0, id: mediaId ?? media[0].id })
  );

  const currentMedia = media[current.index];

  const handleNav = (offset: number) => {
    const newIndex = (media.length + current.index + offset) % media.length;
    const newMedia = media[newIndex];
    setCurrent({ index: newIndex, id: newMedia.id });
  };

  const renderMedia = () => {
    if (currentMedia.type === "image") {
      return (
        <ImageViewer media={currentMedia} />
      );
    } else if (currentMedia.type === "pdf") {
      return (
        <PDFViewer src={currentMedia.src} />
      );
    } else if (currentMedia.type === "audio") {
      return (
        <AudioPlayer src={currentMedia.src} />
      );
    } else if (currentMedia.type === "video") {
      return (
        <VideoPlayer src={currentMedia.src} rootClass={styles.video_player} />
      );
    } else {
      return (
        <div className={styles.unsupported}>
          <p>{"Unsupported File format. This file cannot be opened."}</p>
          <Button<"a">
            as="a"
            href={currentMedia.src}
            variant="solid"
            className={styles.download_btn}
          >
            {"Download File"}
          </Button>
        </div>
      );
    }
  };

  return (
    <Lightbox
      open={open}
      onClose={onClose}
      title={currentMedia.name}
      current={current.index}
      total={media.length}
      onNav={handleNav}
      className={styles.wrapper}
    >
      {renderMedia()}
    </Lightbox>
  );
};

export default MediaViewer;
