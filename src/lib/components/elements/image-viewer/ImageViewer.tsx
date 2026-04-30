import Image from "next/image";
import { CSSProperties, useEffect, useEffectEvent, useRef, useState } from "react";

import { Button } from "@/lib/components/elements/buttton";
import { MediaItem } from "@/lib/components/elements/chat/ChatMedia";
import { HueSlider } from "@/lib/components/elements/color-picker";
import { Input } from "@/lib/components/elements/input";
import { Popover } from "@/lib/components/elements/popover";
import { Slider } from "@/lib/components/elements/slider";
import ClockwiseIcon from "@/lib/svgs/icons/ClockwiseIcon";
import CounterClockwiseIcon from "@/lib/svgs/icons/CounterClockwiseIcon";
import FlipHorizontalIcon from "@/lib/svgs/icons/FlipHorizontalIcon";
import FlipVerticalIcon from "@/lib/svgs/icons/FlipVerticalIcon";
import MediaFiltersIcon from "@/lib/svgs/icons/MediaFiltersIcon";
import ScribbleIcon from "@/lib/svgs/icons/ScribbleIcon";
import ZoomInIcon from "@/lib/svgs/icons/ZoomInIcon";
import ZoomOutIcon from "@/lib/svgs/icons/ZoomOutIcon";

import styles from "./ImageViewer.module.scss";

export const DEFAULT_SCALE_RANGE = [1, 5];

const defaultEdit = {
  scale: 1,
  xFlip: false,
  yFlip: false,
  rotate: 0,
};

const rotatedBoundingBox = (width: number, height: number, deg: number) => {
  const _deg = deg * Math.PI / 180;
  const _width = Math.abs(width * Math.cos(_deg)) + Math.abs(height * Math.sin(_deg));
  const _height = Math.abs(width * Math.sin(_deg)) + Math.abs(height * Math.cos(_deg));
  return [_width, _height];
};

export interface Filters {
  brightness: number;
  contrast: number;
  grayscale: number;
  hue_rotate: number;
  invert: number;
  saturate: number;
  sepia: number;
  opacity: number;
}

const allowedFilters = [
  { id: "brightness", label: "Brightness", unit: "%", min: 0, max: 100, step: 1 },
  { id: "contrast", label: "Contrast", unit: "%", min: 0, max: 100, step: 1 },
  { id: "grayscale", label: "Grayscale", unit: "%", min: 0, max: 100, step: 1 },
  { id: "hue_rotate", label: "Hue Rotate", unit: <>&deg;</>, min: 0, max: 360, step: 1 },
  { id: "invert", label: "Invert", unit: "%", min: 0, max: 100, step: 1 },
  { id: "saturate", label: "Saturate", unit: "%", min: 0, max: 100, step: 1 },
  { id: "sepia", label: "Sepia", unit: "%", min: 0, max: 100, step: 1 },
  { id: "opacity", label: "Opacity", unit: "%", min: 0, max: 100, step: 1 },
];

export interface ImageViewerProps {
  media: MediaItem;
  scaleRange?: number[];
}

export const ImageViewer = ({
  media, scaleRange = DEFAULT_SCALE_RANGE,
  ...restProps
}: ImageViewerProps) => {
  const [edit, setEdit] = useState(defaultEdit);
  const [pan, setPan] = useState();
  const [filters, setFilters] = useState<Partial<Filters>>();
  const [draw, setDraw] = useState();
  const [showFilters, setShowFilters] = useState<HTMLElement>();
  const [transitionDuration, setTransitionDuration] = useState(500);

  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // ways to update scale:
  // = set directly from input field
  // = 2-finger gesture inc/dec, same as above
  // = toggle scale step by step

  const resetEdit = useEffectEvent(() => setEdit(defaultEdit));

  const handleScale = (e?: React.MouseEvent, offset = 1) => {
    const _offset = e?.shiftKey ? -offset : offset;
    let newScale = Math.max(scaleRange[0], Math.min(scaleRange[1], edit.scale + _offset));
    if (edit.scale === scaleRange[1] && newScale === edit.scale) newScale = scaleRange[0];
    else if (edit.scale === scaleRange[0] && newScale === edit.scale) newScale = scaleRange[1];
    setEdit({ ...edit, scale: newScale });
  };

  const handleRotation = (offset = 90) => {
    const newRotation = (edit.rotate + offset) % 360;
    setEdit({ ...edit, rotate: newRotation });
  };

  const getFilters = () => {
    const _filters: { [key: string]: string } = {};
    if (filters?.brightness) _filters["--brightness"] = `${filters?.brightness}%`;
    if (filters?.contrast) _filters["--contrast"] = `${filters?.contrast}%`;
    if (filters?.grayscale) _filters["--grayscale"] = `${filters?.grayscale}%`;
    if (filters?.hue_rotate) _filters["--hue-rotate"] = `${filters?.hue_rotate}deg`;
    if (filters?.invert) _filters["--invert"] = `${filters?.invert}%`;
    if (filters?.saturate) _filters["--saturate"] = `${filters?.saturate}%`;
    if (filters?.sepia) _filters["--sepia"] = `${filters?.sepia}%`;
    return _filters as CSSProperties;
  };

  // todo:
  // draw - stroke color, stroke thickness, stroke style [full, dashed, dotted]

  // crop = 
  // swipe to zoom in [allow overflow visible but copy rest panning around inside the img_wrapper from the image-crop comp.]
  // double tab to cycle between zoom feature

  useEffect(() => resetEdit(), [media]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={frameRef}
        className={styles.img_wrapper}
      >
        <Image
          ref={imgRef}
          src={media.src}
          alt={media.name || media.id}
          width={200}
          height={200}
          unoptimized
          onDoubleClick={handleScale}
          style={{
            // ...getFilters(),
            transitionDuration: `${0}ms`,
            transform: `scale(${edit.scale}) rotateZ(${edit.rotate}deg) rotateX(${edit.xFlip ? "180deg" : 0}) rotateY(${edit.yFlip ? "180deg" : 0})`,
          }}
        />
      </div>

      <div className={styles.toolbar}>
        <Button
          variant="muted"
          onClick={() => handleScale(undefined, -1)}
          disabled={edit.scale === scaleRange[0]}
        >
          <ZoomOutIcon />
        </Button>
        {/* <p>{"100%"}</p> */}
        <Button
          variant="muted"
          onClick={handleScale}
          disabled={edit.scale === scaleRange[1]}
        >
          <ZoomInIcon />
        </Button>
        <Button
          variant="muted"
          onClick={() => setEdit({ ...edit, yFlip: !edit.yFlip })}
          aria-pressed={edit.yFlip}
        >
          <FlipHorizontalIcon />
        </Button>
        <Button
          variant="muted"
          onClick={() => setEdit({ ...edit, xFlip: !edit.xFlip })}
          aria-pressed={edit.xFlip}
        >
          <FlipVerticalIcon />
        </Button>
        <Button
          variant="muted"
          onClick={() => handleRotation(-45)}
        >
          <CounterClockwiseIcon />
        </Button>
        {/* <p>{"0"}&deg;</p> */}
        <Button
          variant="muted"
          onClick={() => handleRotation(45)}
        >
          <ClockwiseIcon />
        </Button>

        <Button
          variant="muted"
          disabled
          onClick={e => setShowFilters(showFilters ? undefined : e.currentTarget)}
        >
          <MediaFiltersIcon />
        </Button>
        <Button
          variant="muted"
          disabled
        >
          <ScribbleIcon />
        </Button>
      </div>

      {showFilters && (
        <Popover
          anchor={showFilters}
          animation="slide"
          onClose={() => setShowFilters(undefined)}
          className={styles.filters_popover}
        >
          <div className={styles.filters_list}>
            {allowedFilters.map(item => (
              <div key={item.id} className={styles.filter_item}>
                <div className={styles.row}>
                  <p className={styles.label}>{item.label}</p>
                  <Input
                    value={filters?.[item.id as keyof Filters] ?? 0}
                    onChange={(e) => setFilters({ ...filters, [item.id]: e.target.valueAsNumber })}
                  />
                  <p className={styles.unit}>{item.unit}</p>
                </div>
                {item.id === "hue_rotate" ? (
                  <HueSlider
                    style={{ "--hue": (filters?.hue_rotate ?? 0) } as CSSProperties}
                    value={filters?.[item.id as keyof Filters] ?? 0}
                    onChange={(e) => setFilters({ ...filters, [item.id]: e.target.valueAsNumber })}
                  />
                ) : (
                  <Slider
                    variant="rod"
                    value={filters?.[item.id as keyof Filters] ?? 0}
                    onChange={(e) => setFilters({ ...filters, [item.id]: e.target.valueAsNumber })}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    showFill
                  />
                )}
              </div>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
};
