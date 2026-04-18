import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ComponentProps, CSSProperties, MouseEvent, ReactNode } from "react";

import { CollapsiblePanel } from "@/lib/components/elements/collapsible-panel";
import ChevronRightIcon from "@/lib/svgs/icons/ChevronRightIcon";
import { classes } from "@/lib/utils/style";

import styles from "./Tree.module.scss";

export interface TreeNode<T> {
  id: string;
  label?: ReactNode;
  expandIcon?: ReactNode;
  children?: T[];
  href?: Url;
  onClick?: (e: MouseEvent) => void;
}

export interface TreeViewProps<T> extends ComponentProps<"ul"> {
  tree: T[];
  expandedIds: string[];
  renderWhileClosed?: boolean;
  duration?: number;
  expanderClass?: string;
  itemClass?: string;
  onExpand?: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
  onNodeExpand?: (id: string, e?: MouseEvent) => void;
  renderNode?: (node: T, options?: { isExpanded?: boolean; depth?: number }) => ReactNode;
}

export const Tree = <T extends TreeNode<T>>({
  tree, expandedIds, renderWhileClosed, duration, expanderClass, itemClass, onExpand, onNodeExpand, renderNode,
  children, className,
  ...props
}: TreeViewProps<T>) => {
  const renderExpander = (item: T, isExpanded: boolean) => {
    return (item.children?.length && onExpand) ? (
      <button
        className={classes(styles.expand_btn, expanderClass)}
        onClick={(e) => onExpand?.(item.id, e)}
        aria-expanded={isExpanded}
      >
        <ChevronRightIcon />
      </button>
    ) : (
      <div
        className={classes(styles.expand_hint, expanderClass)}
        aria-expanded={isExpanded}
      >
        <ChevronRightIcon />
      </div>
    );
  };

  const _renderNode = (item: T, isExpanded: boolean, depth: number) => {
    const Element = item.href ? Link : item.onClick ? "button" : "div";

    const dynamicProps: ComponentProps<any> = {};
    if (Element === Link) dynamicProps.href = item.href;
    if (Element === "button") dynamicProps.onClick = (e: MouseEvent) => item.onClick?.(e);

    if (item.children?.length && onNodeExpand) dynamicProps.onClick = (e: MouseEvent) => onNodeExpand(item.id, e);

    return (
      <Element
        {...dynamicProps}
        className={classes(styles.item_wrapper, "item_header")}
        tabIndex={0}
      >
        {
          item.children?.length ? (
            renderExpander(item, isExpanded)
          ) : (
            <div className={styles.expand_btn_ph}></div>
          )
        }
        {renderNode ? renderNode?.(item, { isExpanded, depth }) : item.label}
      </Element>
    );
  };

  const renderSection = (t?: T[], depth = 0) => {
    if (!t?.length) return null;
    return t.map((item) => {
      const isExpanded = expandedIds.includes(item.id);
      return (
        <li
          key={item.id}
          className={classes(styles.item, itemClass)}
          style={{ "--depth": depth } as CSSProperties}
          tabIndex={1}
        >
          {_renderNode(item, isExpanded, depth)}
          <CollapsiblePanel<"ul">
            as="ul"
            open={isExpanded}
            className={styles.details}
            renderWhileClosed={renderWhileClosed}
            duration={duration}
          >
            {renderSection(item.children, depth + 1)}
          </CollapsiblePanel>
        </li>
      );
    });
  };

  return (
    <ul
      className={classes(styles.wrapper, className)}
      role="group"
      {...props}
    >
      {renderSection(tree)}
    </ul>
  );
};
