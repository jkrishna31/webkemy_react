import { classes } from "@/lib/utils/style";

import styles from "./PDFViewer.module.scss";

export interface PDFViewerProps {
  className?: string
  src?: string
}

export const PDFViewer = ({
  className, src,
  ...props
}: PDFViewerProps) => {
  return (
    <div className={classes(styles.wrapper, className)} {...props}>
      <iframe src={src}></iframe>
    </div>
  );
};
