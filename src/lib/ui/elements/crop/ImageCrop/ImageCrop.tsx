import Image from "next/image";
import React, { ComponentProps } from "react";

import styles from "./ImageCrop.module.scss";

export interface ImageCropProps extends ComponentProps<"div"> {
}

const ImageCrop = ({
  className,
  ...props
}: ImageCropProps) => {
  // pinch for zoom
  // drag to move the image

  // free rotation
  // flip h/v

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={`${styles.selection} selection`}></div>
      <Image
        src="https://images.unsplash.com/photo-1742201949659-ce186667aaaf?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image to crop"
        width={200} height={200}
        className={`${styles.img} img`}
        style={{
          // scale
          // transform - translate, rotate
        }}
      />
    </div>
  );
};

export default ImageCrop;
