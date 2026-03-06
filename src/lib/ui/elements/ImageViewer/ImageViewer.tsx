import Image from "next/image";

import { Button } from "@/lib/ui/elements/butttons";
import { MediaItem } from "@/lib/ui/elements/chat/ChatMedia";
import BrushIcon from "@/lib/ui/svgs/icons/BrushIcon";
import ClockwiseIcon from "@/lib/ui/svgs/icons/ClockwiseIcon";
import CounterClockwiseIcon from "@/lib/ui/svgs/icons/CounterClockwiseIcon";
import FlipHorizontalIcon from "@/lib/ui/svgs/icons/FlipHorizontalIcon";
import FlipVerticalIcon from "@/lib/ui/svgs/icons/FlipVerticalIcon";
import MediaFiltersIcon from "@/lib/ui/svgs/icons/MediaFiltersIcon";
import ZoomInIcon from "@/lib/ui/svgs/icons/ZoomInIcon";
import ZoomOutIcon from "@/lib/ui/svgs/icons/ZoomOutIcon";

import styles from "./ImageViewer.module.scss";

export interface ImageViewerProps {
  media: MediaItem;
}

const ImageViewer = ({
  media,
  ...restProps
}: ImageViewerProps) => {
  // todo:
  // filters - brightness[%], contrast[%], grayscale[%], hue-rotate[deg], invert[%], opacity[%], saturate[%], sepia[%]; blur[px], drop-shadow
  // draw - stroke color, stroke thickness, stroke style [full, dashed, dotted]

  return (
    <div className={styles.wrapper}>
      <div className={styles.img_wrapper}>
        <Image src={media.src} alt={media.name || media.id} width={200} height={200} unoptimized />
      </div>
      <div className={styles.toolbar}>
        <Button variant="quaternary" disabled>
          <ZoomOutIcon />
        </Button>
        {/* <p>{"100%"}</p> */}
        <Button variant="quaternary" disabled>
          <ZoomInIcon />
        </Button>
        <Button variant="quaternary" disabled>
          <FlipHorizontalIcon />
        </Button>
        <Button variant="quaternary" disabled>
          <FlipVerticalIcon />
        </Button>
        <Button variant="quaternary" disabled>
          <CounterClockwiseIcon />
        </Button>
        {/* <p>{"0"}&deg;</p> */}
        <Button variant="quaternary" disabled>
          <ClockwiseIcon />
        </Button>

        <Button variant="quaternary" disabled>
          <MediaFiltersIcon />
        </Button>
        <Button variant="quaternary" disabled>
          <BrushIcon />
        </Button>
      </div>
    </div>
  );
};

export default ImageViewer;
