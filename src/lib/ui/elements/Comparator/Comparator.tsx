import { ComponentProps } from "react";

import styles from "./Comparator.module.scss";

export interface ComparatorProps extends ComponentProps<"div"> {

}

const Comparator = ({

}: ComparatorProps) => {
  return (
    <div className={styles.wrapper}>
      {/* left */}
      {/* slider */}
      {/* right */}
    </div>
  );
};

export default Comparator;
