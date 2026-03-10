import { SearchForm } from "@/components/common/forms";

import styles from "./ThreadsPanel.module.scss";

export interface ThreadsPanelProps {
  onClose?: () => void;
}

const ThreadsPanel = ({
  onClose,
  ...restProps
}: ThreadsPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"All Threads"}</h3>
      </div>

      <SearchForm className={styles.search_form} placeholder="Search thread..." />

    </div>
  );
};

export default ThreadsPanel;
