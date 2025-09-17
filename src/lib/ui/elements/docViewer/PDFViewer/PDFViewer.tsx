import React from "react";

import styles from "./PDFViewer.module.scss";

export interface PDFViewerProps {
  className?: string
  src?: string
}

const PDFViewer = ({
  className, src,
  ...props
}: PDFViewerProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`} {...props}>
      <iframe src={src}></iframe>
    </div>
  );
};

export default PDFViewer;
