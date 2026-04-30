import { MouseEvent } from "react";

import { Button } from "@/lib/components/elements/buttton";
import AddEmojiIcon from "@/lib/svgs/icons/AddEmojiIcon";

import styles from "./Reactions.module.scss";

export interface ReactionsProps {
  reactions?: { key: string; emoji: string; count: number }[];
  onClick?: (e: MouseEvent, key?: string) => void;
}

const Reactions = ({
  reactions, onClick,
}: ReactionsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.reactions}>
        {
          reactions?.map((item, idx) => (
            <Button<"div">
              as="div"
              key={item.key}
              className={styles.item}
              aria-pressed={idx === 2}
            >
              <span>{item.emoji}</span>
              <span>{item.count}</span>
            </Button>
          ))
        }
      </div>
      <Button
        variant="muted"
        className={styles.add_reaction_btn}
        onClick={onClick}
      >
        <AddEmojiIcon />
      </Button>
    </div>
  );
};

export default Reactions;
