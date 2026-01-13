import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./RippleLoader.module.scss";

export interface CircularLoaderProps extends ComponentProps<"div"> {

}

const RippleLoader = ({ className, ...props }: CircularLoaderProps) => {
  return (
    <div className={classes(styles.loader, className)} {...props}></div>
  );
};

export default RippleLoader;
