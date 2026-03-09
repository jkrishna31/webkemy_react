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
    </div>
  );
};

export default StarredPanel;
