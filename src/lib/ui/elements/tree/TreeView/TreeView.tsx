import React, { ComponentProps, MouseEvent, ReactNode } from "react";

import { Collapsible } from "@/lib/ui/elements/collapsible";
import { ChevronRightIcon } from "@/lib/ui/svgs/icons";

import styles from "./TreeView.module.scss";

export interface Tree {
  render?: ReactNode | ((open: boolean) => ReactNode)
  expandIcon?: ReactNode
  children?: Tree[]
  id: string
  onExpand?: (id: string, e?: MouseEvent<HTMLButtonElement>) => void
}

export interface TreeViewProps extends ComponentProps<"ul"> {
  tree: Tree[]
  expandedIds: string[]
}

const TreeView = ({
  children, className, tree, expandedIds,
  ...props
}: TreeViewProps) => {
  const renderSection = (t?: Tree[]) => {
    if (!t?.length) return null;
    return t.map((item) => {
      const isExpanded = expandedIds.includes(item.id);
      return (
        <Collapsible<"li", "ul">
          key={item.id}
          open={isExpanded}
          detailsAs="ul"
          wrapperAs="li"
          className={styles.item}
          detailsClass={styles.details}
          renderWhileClosed={false}
          summary={
            <div className={styles.item_wrapper}>
              {
                item.children?.length ? (
                  <button
                    className={styles.expand_btn}
                    onClick={(e) => item.onExpand?.(item.id, e)}
                    data-expanded={isExpanded}
                  >
                    <ChevronRightIcon />
                  </button>
                ) : (
                  <div className={styles.expand_btn_ph}></div>
                )
              }
              {typeof item.render === "function" ? item.render?.(isExpanded) : item.render}
            </div>
          }
        >
          {renderSection(item.children)}
        </Collapsible>
      );
    });
  };

  return (
    <ul className={styles.wrapper} {...props}>
      {renderSection(tree)}
    </ul>
  );
};

export default TreeView;
