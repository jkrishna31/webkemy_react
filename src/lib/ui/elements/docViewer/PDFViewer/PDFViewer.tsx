import React from "react";

import { classes } from "@/lib/utils/style.utils";

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
    <div className={classes(styles.wrapper, className)} {...props}>
      <iframe src={src}></iframe>
    </div>
  );
};

export default PDFViewer;
