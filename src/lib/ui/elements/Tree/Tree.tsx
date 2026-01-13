import { ComponentProps, MouseEvent, ReactNode } from "react";

import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Tree.module.scss";

export interface TreeNode {
  render?: ReactNode | ((open: boolean) => ReactNode)
  expandIcon?: ReactNode
  children?: TreeNode[]
  id: string
  onExpand?: (id: string, e?: MouseEvent<HTMLButtonElement>) => void
}

export interface TreeViewProps extends ComponentProps<"ul"> {
  tree: TreeNode[];
  expandedIds: string[];
  renderWhileClosed?: boolean;
}

const Tree = ({
  children, className, tree, expandedIds, renderWhileClosed,
  ...props
}: TreeViewProps) => {
  const renderSection = (t?: TreeNode[]) => {
    if (!t?.length) return null;
    return t.map((item) => {
      const isExpanded = expandedIds.includes(item.id);
      return (
        <li
          key={item.id}
          className={styles.item}
        >
          <div className={styles.item_wrapper}>
            {
              item.children?.length ? (
                <button
                  className={styles.expand_btn}
                  onClick={(e) => item.onExpand?.(item.id, e)}
                  aria-expanded={isExpanded}
                >
                  <ChevronRightIcon />
                </button>
              ) : (
                <div className={styles.expand_btn_ph}></div>
              )
            }
            {typeof item.render === "function" ? item.render?.(isExpanded) : item.render}
          </div>
          <CollapsiblePanel<"ul"> as="ul" open={isExpanded} className={styles.details} renderWhileClosed={renderWhileClosed}>
            {renderSection(item.children)}
          </CollapsiblePanel>
        </li>
      );
    });
  };

  return (
    <ul className={classes(styles.wrapper, className)} role="group" {...props}>
      {renderSection(tree)}
    </ul>
  );
};

export default Tree;
