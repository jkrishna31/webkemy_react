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
}

const getTransform = (translate: number[], scale: number) => {
  return `translate3d(${translate[0]}px, ${translate[1]}px, 0) scale(${scale}) rotate(${0}) `;
};

const ImageCrop = ({
  frame = imageCropDefaultProps.FRAME,
  scale = imageCropDefaultProps.SCALE,
  className,
  ...props
}: ImageCropProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const translate = useRef<number[]>([0, 0, 0]);
  const rotate = useRef<number[]>([0, 0, 0]);

  // pinch for zoom
  // drag to move the image
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
        // console.log("+++ move +++", translate.current, change, newTranslate);
        translate.current = newTranslate;
        (img as HTMLElement).style.transform = getTransform(newTranslate, scale);
      };

      const handlePointerUp = (e: PointerEvent) => {
        e.preventDefault();
        // console.log("--- UP ---",);
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

      container.addEventListener("pointerdown", handlePointerDown);

      return () => {
        container.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [scale]);

  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${className}`}
    >
      <div className={styles.box}>
        <div data-frame className={`${styles.selection} selection`}></div>
        <Image
          src="https://images.unsplash.com/photo-1742201949659-ce186667aaaf?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image to crop"
          width={200} height={200}
          data-crop
          className={`${styles.img}`}
          style={{
            transform: getTransform([...translate.current], scale),
          }}
        />
      </div>
    </div>
  );
};

export default ImageCrop;
