import React, { ComponentProps } from "react";

import styles from "./Framer.module.scss";

export interface FramerProps extends ComponentProps<"div"> {

}

const Framer = ({
  children, className,
  ...props
}: FramerProps) => {

  // how will it look in home screen, especially the prev frame navigation

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.frame_prev}>
        {/* prev page */}
      </div>
      <div className={styles.frame_curr}>
        {children}
      </div>
      <div className={styles.frame_next}>
        {/* next page */}
      </div>
    </div>
  );
};

export default Framer;
