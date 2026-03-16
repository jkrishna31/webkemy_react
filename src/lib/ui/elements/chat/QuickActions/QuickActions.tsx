import { ComponentProps, MouseEvent } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Divider } from "@/lib/ui/elements/Divider";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import { classes } from "@/lib/utils/style.utils";

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
          variant="quaternary"
          key={item}
          onClick={onClick ? e => onClick(e, item) : undefined}
        >
          {item}
        </Button>
      ))}
      <Divider orientation="vertical" style={{ margin: ".4rem" }} />
      <Button
        variant="quaternary"
        onClick={onClick ? e => onClick(e, "ADD_REACTION") : undefined}
      >
        <AddEmojiIcon />
      </Button>
      <Button
        variant="quaternary"
        onClick={onClick ? e => onClick(e, "MORE") : undefined}
      >
        <EllipsisHIcon />
      </Button>
    </div>
  );
};

export default QuickActions;
