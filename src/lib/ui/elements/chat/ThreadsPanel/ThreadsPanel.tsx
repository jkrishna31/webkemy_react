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
    </div>
  );
};

export default ThreadsPanel;
