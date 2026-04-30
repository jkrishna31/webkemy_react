"use client";

import { ComponentProps, ReactNode, useEffect, useEffectEvent, useState } from "react";

import { Button, Variant } from "@/lib/components/elements/buttton";
import { Popover } from "@/lib/components/elements/popover";
import { useElementRef } from "@/lib/hooks/useElementRef";
import ExpandVerticalIcon from "@/lib/svgs/icons/ExpandVerticalIcon";
import { TColor } from "@/lib/types/general";
import { LayoutPosition } from "@/lib/utils/dom";
import { classes } from "@/lib/utils/style";

import styles from "./Dropdown.module.scss";

export interface DropdownProps extends ComponentProps<"div"> {
  dropdown?: ReactNode;
  placeholder?: ReactNode;
  hintIcon?: ReactNode | null;
  rootClass?: string;
  triggerClass?: string;
  dropdownClass?: string;
  placement?: Exclude<LayoutPosition, "center">;
  alignment?: LayoutPosition;
  triggerVariant?: Variant;
  triggerColor?: TColor;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown = ({
  open = false, onOpenChange, dropdown, hintIcon, placement, alignment, triggerVariant, triggerColor,
  rootClass, triggerClass, dropdownClass,
  className, children,
  ...restProps
}: DropdownProps) => {
  const [_open, setOpen] = useState(false);

  const { element: triggerElement, ref: triggerRef } = useElementRef<HTMLButtonElement>();

  const updateDropdownState = (isOpen?: boolean) => {
    let newState = false;
    if (isOpen) newState = true;
    else if (isOpen === false) newState = false;
    else newState = !_open;

    setOpen(newState);
    onOpenChange?.(newState);
  };

  const handleClose = () => {
    updateDropdownState(false);
  };

  const syncOpen = useEffectEvent((value: boolean) => {
    setOpen(value);
  });

  useEffect(() => syncOpen(open), [open]);

  return (
    <div className={classes(styles.wrapper, rootClass)}>
      <Button
        ref={triggerRef}
        className={classes(styles.dropdown_trigger, triggerClass)}
        onClick={() => updateDropdownState()}
        aria-pressed={restProps["aria-pressed"]}
        variant={triggerVariant}
        color={triggerColor}
      >
        {children}
        {
          hintIcon ?? (
            hintIcon !== null ? (
              <ExpandVerticalIcon className={styles.hint_icon} />
            ) : null
          )
        }
      </Button>
      {(_open && !!triggerElement) && (
        <Popover
          anchor={triggerElement}
          onClose={handleClose}
          anchorMargin={6}
          className={classes(styles.dropdown_popover, dropdownClass)}
          alignment={alignment}
          placement={placement}
          animation="slide"
        >
          {dropdown}
        </Popover>
      )}
    </div>
  );
};
