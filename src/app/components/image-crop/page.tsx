"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/ui/elements/butttons";
import { ImageCrop } from "@/lib/ui/elements/crop";
import { FlipHorizontalIcon, FlipVerticalIcon, ZoomInIcon, ZoomOutIcon } from "@/lib/ui/svgs/icons";
import { clampNumber } from "@/lib/utils/math.utils";

import styles from "./styles.module.scss";

const Page = () => {
  const [scale, setScale] = useState(1.5);
  const [rotate, setRotate] = useState(0);
  const [xFlipped, setXFlipped] = useState(false);
  const [yFlipped, setYFlipped] = useState(false);

  const updateScale = (change: "inc" | "dec") => {
    setScale(currScale => clampNumber(currScale + (change === "dec" ? -.25 : .25), .5, 3));
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="image-crop" />

      <ImageCrop scale={scale} />
      <div className={styles.controls}>
        <Button
          variant="tertiary"
          className={styles.ctrl_btn}
          aria-label="Zoom Out" title="Zoom Out"
          disabled={scale === .5}
          onClick={() => updateScale("dec")}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          variant="tertiary"
          className={styles.ctrl_btn}
          aria-label="Zoom In" title="Zoom In"
          disabled={scale === 3}
          onClick={() => updateScale("inc")}
        >
          <ZoomInIcon />
        </Button>
        <Button
          variant="tertiary"
          className={styles.ctrl_btn}
          aria-label="Flip Horizontally" title="Flip Horizontally"
          aria-pressed={xFlipped}
          onClick={() => setXFlipped(!xFlipped)}
        >
          <FlipHorizontalIcon />
        </Button>
        <Button
          variant="tertiary"
          className={styles.ctrl_btn}
          aria-label="Flip Vertically" title="Flip Vertically"
          aria-pressed={yFlipped}
          onClick={() => setYFlipped(!yFlipped)}
        >
          <FlipVerticalIcon />
        </Button>
      </div>
    </main>
  );
};

export default Page;
