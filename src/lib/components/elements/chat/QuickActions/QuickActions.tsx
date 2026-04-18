import { ComponentProps, MouseEvent } from "react";

import { Button } from "@/lib/components/elements/butttons";
import { Divider } from "@/lib/components/elements/divider";
import AddEmojiIcon from "@/lib/svgs/icons/AddEmojiIcon";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import { classes } from "@/lib/utils/style";

import styles from "./QuickActions.module.scss";

export interface QuickActionsProps extends Omit<ComponentProps<"div">, "onClick"> {
  quickReactions?: string[];
  onClick?: (e: MouseEvent, key: string) => void;
}

const QuickActions = ({
  quickReactions, onClick,
  className, children,
  ...restProps
}: QuickActionsProps) => {
  return (
    <div
      className={classes(styles.wrapper, className)}
      {...restProps}
    >
      {quickReactions?.map((item) => (
        <Button
          variant="muted"
          key={item}
          onClick={onClick ? e => onClick(e, item) : undefined}
        >
          {item}
        </Button>
      ))}
      <Divider orientation="vertical" style={{ margin: ".4rem" }} />
      <Button
        variant="muted"
        onClick={onClick ? e => onClick(e, "ADD_REACTION") : undefined}
      >
        <AddEmojiIcon />
      </Button>
      <Button
        variant="muted"
        onClick={onClick ? e => onClick(e, "MORE") : undefined}
      >
        <EllipsisHIcon />
      </Button>
    </div>
  );
};

export default QuickActions;
