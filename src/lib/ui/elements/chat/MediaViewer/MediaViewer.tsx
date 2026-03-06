import { useState } from "react";

import { MediaItem } from "@/lib/ui/elements/chat/ChatMedia";
import { ImageViewer } from "@/lib/ui/elements/ImageViewer";
import { Lightbox } from "@/lib/ui/elements/Lightbox";
import { PDFViewer } from "@/lib/ui/elements/PDFViewer";

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
    const _media = currentMedia;

    if (_media.type === "image") {
      return (
        <ImageViewer media={_media} />
      );
    } else if (_media.type === "pdf") {
      return <PDFViewer src={currentMedia.src} />;
    } else if (_media.type === "audio") {

    } else if (_media.type === "video") {

    } else {
      return (
        <div>
          <p>{"Unsupported File Type. This file cannot be opened."}</p>
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
    >
      {renderMedia()}
    </Lightbox>
  );
};

export default MediaViewer;
