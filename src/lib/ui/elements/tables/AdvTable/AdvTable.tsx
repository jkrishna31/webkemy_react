import { ComponentProps } from "react";

import styles from "./AdvTable.module.scss";

export interface AdvTableProps extends ComponentProps<"div"> {

}

const AdvTable = ({
  ...props
}: AdvTableProps) => {

  const renderCell = () => {
    return (
      <div></div>
    );
  };

  const renderRow = () => {
    return (
      <div></div>
    );
  };

  return (
    <div className={styles.wrapper}>

    </div>
  );
};

export default AdvTable;
