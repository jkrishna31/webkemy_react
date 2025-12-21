"use client";

import Image from "next/image";
import React, { ComponentProps, useEffect, useRef, useState } from "react";

import { clampNumber } from "@/lib/utils/math.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ImageCrop.module.scss";

export const imageCropDefaultProps = {
  FRAME: "fixed",
  SCALE: 1,
  TRANSLATE_STEP: 10,
} as const;

export type Transformation = {
  type: `translate${"X" | "Y" | "Z"}` | `rotate${"X" | "Y" | "Z"}` | "scale";
  value: number[] | number
}

export interface ImageCropProps extends ComponentProps<"div"> {
  frame?: "fixed" | "dynamic";
  scale?: number;
  rotate?: number;
  src: string;
  xFlip?: boolean;
  yFlip?: boolean;
  onScaleChange?: (newScale: number) => void;
  translateStep?: number;
}

const getTransform = (translate: number[], scale: number, rotate: number[]) => {
  return `
  translate3d(${translate[0]}px, ${translate[1]}px, 0) 
  rotateX(${rotate[0]}deg) rotateY(${rotate[1]}deg) rotateZ(${rotate[2]}deg)
  scaleX(${scale}) scaleY(${scale}) 
  `;
};

const ImageCrop = ({
  src,
  frame = imageCropDefaultProps.FRAME,
  translateStep = imageCropDefaultProps.TRANSLATE_STEP,
  scale = imageCropDefaultProps.SCALE,
  xFlip, yFlip, rotate,
  onScaleChange,
  className,
  ...props
}: ImageCropProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [_translate, setTranslate] = useState([0, 0, 0]);

  const translate = useRef<number[]>([0, 0, 0]);

  // rotation
  // double tap zoom cycle
  // touch zoom

  // fix: jitter on first swipe after changing zoom/flip
  // fix: min size allowed = the stencil size
  // fix: refactor

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      let startCoords = [0, 0];
      const frame = container.querySelector("[data-frame]");
      const img = container.querySelector("[data-crop]");

      if (!img || !frame) return;

      let imgDim = img.getBoundingClientRect();
      let frameDim = frame.getBoundingClientRect();
      let prevOffset = [0, 0]; // will to used to remove the offset addition on each move; we only need to add offset once

      const handlePointerMove = (e: PointerEvent) => {
        const imgOgDim = [(img as HTMLElement).offsetWidth, (img as HTMLElement).offsetHeight];
        const change = [e.pageX - startCoords[0], e.pageY - startCoords[1]];
        const offset = [
          (imgOgDim[0] - imgDim.width) / 2,
          (imgOgDim[1] - imgDim.height) / 2,
        ];

        const spanWidth = imgDim.width - frameDim.width;
        const spanHeight = imgDim.height - frameDim.height;

        const newTranslate = [
          clampNumber(translate.current[0] + change[0] - offset[0] + prevOffset[0], -spanWidth - offset[0], 0 - offset[0]),
          clampNumber(translate.current[1] + change[1] - offset[1] + prevOffset[1], -spanHeight - offset[1], 0 - offset[1]),
          0
        ];
        prevOffset = offset;

        (img as HTMLElement).style.transform = getTransform(newTranslate, scale, [yFlip ? 180 : 0, xFlip ? 180 : 0, 0]);
        translate.current = newTranslate;
        startCoords = [e.pageX, e.pageY];
      };

      const handlePointerUp = (e: PointerEvent) => {
        e.preventDefault();
        window.removeEventListener("pointermove", handlePointerMove);
      };

      const handlePointerDown = (e: PointerEvent) => {
        e.preventDefault();
        startCoords = [e.pageX, e.pageY];
        imgDim = img.getBoundingClientRect();
        frameDim = frame.getBoundingClientRect();

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp, { once: true });
      };

      const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        const zoomSpeed = .01;
        onScaleChange?.(clampNumber(scale + (-e.deltaY * zoomSpeed), .5, 3));
      };

      container.addEventListener("pointerdown", handlePointerDown);
      container.addEventListener("wheel", handleScroll);

      return () => {
        container.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("wheel", handleScroll);
      };
    }
  }, [onScaleChange, scale, xFlip, yFlip]);

  useEffect(() => {
    const container = containerRef.current;
    const img = container?.querySelector("[data-crop]");
    const frame = container?.querySelector("[data-frame]");

    if (!container || !img || !frame) return;

    const frameDim = frame.getBoundingClientRect();
    let prevOffset = [0, 0];

    const translateBy = (by: number[]) => {
      const imgOgDim = [(img as HTMLElement).offsetWidth, (img as HTMLElement).offsetHeight];
      const imgDim = img.getBoundingClientRect();
      const currTranslate = translate.current;
      const offset = [
        (imgOgDim[0] - imgDim.width) / 2,
        (imgOgDim[1] - imgDim.height) / 2,
      ];

      const spanWidth = (imgDim.width) - frameDim.width;
      const spanHeight = (imgDim.height) - frameDim.height;

      const newTranslate = [
        clampNumber(currTranslate[0] + by[0] - offset[0] + prevOffset[0], -spanWidth - offset[0], 0 - offset[0]),
        clampNumber(currTranslate[1] + by[1] - offset[1] + prevOffset[1], -spanHeight - offset[1], 0 - offset[1]),
        0
      ];
      prevOffset = offset;

      (img as HTMLElement).style.transform = getTransform(newTranslate, scale, [yFlip ? 180 : 0, xFlip ? 180 : 0, 0]);
      translate.current = newTranslate;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          translateBy([translateStep, 0]);
          break;
        case "ArrowRight":
          translateBy([-translateStep, 0]);
          break;
        case "ArrowUp":
          e.preventDefault();
          translateBy([0, translateStep]);
          break;
        case "ArrowDown":
          e.preventDefault();
          translateBy([0, -translateStep]);
          break;
      }
    };

    const handleFocus = () => {
      window.addEventListener("keydown", handleKeyDown);
    };

    const handleBlur = () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

    container.addEventListener("focus", handleFocus);
    container.addEventListener("blur", handleBlur);

    return () => {
      container.removeEventListener("focus", handleFocus);
      container.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scale, translateStep, xFlip, yFlip]);

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      className={classes(styles.wrapper, className)}
    >
      <div className={styles.box}>
        <div data-frame className={classes(styles.selection, "selection")}></div>
        <Image
          src={src}
          alt="image to crop"
          width={200} height={200}
          data-crop
          className={styles.img}
          style={{
            transform: getTransform([...translate.current], scale, [yFlip ? 180 : 0, xFlip ? 180 : 0, 0]),
          }}
        />
      </div>
    </div>
  );
};

export default ImageCrop;
