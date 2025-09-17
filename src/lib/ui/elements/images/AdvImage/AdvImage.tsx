import Image, { ImageProps } from "next/image";
import React from "react";

import styles from "./AdvImage.module.scss";

export interface AdvImageProps extends ImageProps {

}

const AdvImage = ({
  ...props
}: AdvImageProps) => {
  return (
    <Image {...props} alt={props.alt} />
  );
};

export default AdvImage;
