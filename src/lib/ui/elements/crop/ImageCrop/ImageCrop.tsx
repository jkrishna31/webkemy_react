"use client";

import Image from "next/image";
import React, { ComponentProps, useEffect, useRef } from "react";

import { clampNumber } from "@/lib/utils/math.utils";

import styles from "./ImageCrop.module.scss";

export const imageCropDefaultProps = {
  FRAME: "fixed",
  SCALE: 1,
} as const;

export interface ImageCropProps extends ComponentProps<"div"> {
  frame?: "fixed" | "dynamic";
  scale?: number;
  rotate?: number;
  src: string;
  flipX?: boolean;
  flipY?: boolean;
  onScaleChange?: (newScale: number) => void;
}

const getTransform = (translate: number[], scale: number, rotate: number[]) => {
  return `translate3d(${translate[0]}px, ${translate[1]}px, 0) scale(${scale}) rotateX(${rotate[0]}) rotateY(${rotate[1]}) rotateZ(${rotate[2]})`;
};

const ImageCrop = ({
  frame = imageCropDefaultProps.FRAME,
  scale = imageCropDefaultProps.SCALE,
  src,
  flipX, flipY, rotate,
  onScaleChange,
  className,
  ...props
}: ImageCropProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const translate = useRef<number[]>([0, 0, 0]);
  const _rotate = useRef<number[]>([0, 0, 0]);

  // free rotation; flip (h/v)
  // keyboard support for translate

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      let startCoords = [0, 0];
      const frame = container.querySelector("[data-frame]");
      const img = container.querySelector("[data-crop]");

      if (!img || !frame) return;

      let imgDim = img.getBoundingClientRect();
      let frameDim = frame.getBoundingClientRect();

      const handlePointerMove = (e: PointerEvent) => {
        const change = [e.pageX - startCoords[0], e.pageY - startCoords[1]];
        const newTranslate = [
          clampNumber(translate.current[0] + change[0], -imgDim.width + frameDim.width, 0),
          clampNumber(translate.current[1] + change[1], -imgDim.height + frameDim.height, 0),
          0
        ];
        translate.current = newTranslate;
        (img as HTMLElement).style.transform = getTransform(newTranslate, scale, _rotate.current);
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
        onScaleChange?.(clampNumber(scale + (e.deltaY * zoomSpeed), .5, 3));
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
  }, [onScaleChange, scale]);

  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${className}`}
    >
      <div className={styles.box}>
        <div data-frame className={`${styles.selection} selection`}></div>
        <Image
          src={src}
          alt="image to crop"
          width={200} height={200}
          data-crop
          className={`${styles.img}`}
          style={{
            transform: getTransform([...translate.current], scale, _rotate.current),
          }}
        />
      </div>
    </div>
  );
};

export default ImageCrop;
