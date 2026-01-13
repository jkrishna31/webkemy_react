"use client";

import { ComponentProps, ReactNode, useRef } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

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

const ItemGroup = ({
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
            variant="tertiary"
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

export default ItemGroup;
