import { SearchForm } from "@/components/common/forms";

import styles from "./StarredPanel.module.scss";

export interface StarredPanelProps {
  onClose?: () => void;
}

const StarredPanel = ({
  onClose,
  ...restProps
}: StarredPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Starred"}</h3>
      </div>

      <SearchForm className={styles.search_form} placeholder="Search..." />

    </div>
  );
};

export default StarredPanel;
