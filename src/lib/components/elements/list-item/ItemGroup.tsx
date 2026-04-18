"use client";

import { ComponentProps, ReactNode, useRef } from "react";

import { Button } from "@/lib/components/elements/butttons";
import { CollapsiblePanel } from "@/lib/components/elements/collapsible-panel";
import ChevronRightIcon from "@/lib/svgs/icons/ChevronRightIcon";
import { mergeRefs } from "@/lib/utils/react";
import { classes } from "@/lib/utils/style";

import styles from "./ItemGroup.module.scss";

export interface ItemGroupProps extends ComponentProps<"div"> {
  item?: ReactNode;
  group?: ReactNode;
  collapsible?: boolean;
  open?: boolean;
  onCollapsibleChange?: () => void;
  minimized?: boolean;
  headerClass?: string;
}

export const ItemGroup = ({
  item, group, collapsible, open, onCollapsibleChange, minimized, headerClass,
  className, children, ref,
  ...restProps
}: ItemGroupProps) => {
  const _ref = useRef<HTMLDivElement>(null);

  const renderHeader = () => {
    return (
      <div
        className={classes(styles.header, !item && styles.group_header, headerClass, "group_header")}
      // role="presentation"
      >
        {item ?? group}
        {!!collapsible && (
          <Button
            variant="muted"
            aria-expanded={open}
            aria-pressed={open}
            className={styles.trigger_btn}
            onClick={onCollapsibleChange}
          >
            <ChevronRightIcon />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      ref={mergeRefs(_ref, ref)}
      className={classes(styles.group, className)}
      data-minimized={minimized}
      {...(collapsible ? { "aria-expanded": open } : {})}
      {...restProps}
    >
      {renderHeader()}
      {collapsible ? (
        <CollapsiblePanel open={open}>
          {children}
        </CollapsiblePanel>
      ) : children}
    </div>
  );
};
