import { useState } from "react";

import { MediaItem } from "@/lib/ui/elements/chat/ChatMedia";
import { Lightbox } from "@/lib/ui/elements/Lightbox";

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
  const [current, setCurrent] = useState(mediaId);

  const getMedia = () => {
    return media[0];
  };

  const renderMedia = () => {
    const _media = getMedia();

    if (_media.type === "image") {

    } else if (_media.type === "pdf") {

    } else if (_media.type === "audio") {

    } else if (_media.type === "video") {

    } else {
      // filename, filesize, filetype, and desc "This file can be opened"
    }
  };

  return (
    <Lightbox
      open={open}
      onClose={onClose}
      title="ADA Health History.pdf"
      current={1}
      total={media.length}
    >
      {/* {renderMedia()} */}
    </Lightbox>
  );
};

export default MediaViewer;
