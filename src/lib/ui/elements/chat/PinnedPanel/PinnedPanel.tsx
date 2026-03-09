import styles from "./PinnedPanel.module.scss";

export interface PinnedPanelProps {
  onClose?: () => void;
}

const PinnedPanel = ({
  onClose,
  ...restProps
}: PinnedPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Pinned"}</h3>
      </div>
    </div>
  );
};

export default PinnedPanel;
