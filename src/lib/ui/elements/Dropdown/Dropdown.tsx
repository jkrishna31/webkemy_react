"use client";

import React, { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Popover } from "@/lib/ui/elements/Popover";
import ExpandSolidIcon from "@/lib/ui/svgs/icons/ExpandSolidIcon";
import { LayoutPosition } from "@/lib/utils/dom.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Dropdown.module.scss";

export interface DropdownProps extends ComponentProps<"div"> {
  dropdown?: ReactNode;
  placeholder?: ReactNode;
  hintIcon?: ReactNode | null;
  triggerClass?: string;
  dropdownClass?: string;
  placement?: Exclude<LayoutPosition, "center">;
  alignment?: LayoutPosition;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dropdown = ({
  open = false, onOpenChange, dropdown, hintIcon, triggerClass, dropdownClass, placement, alignment,
  className, children,
  ...restProps
}: DropdownProps) => {
  const [_open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const updateDropdownState = (isOpen?: boolean) => {
    let newState = false;
    if (isOpen) newState = true;
    else if (isOpen === false) newState = false;
    else newState = !_open;

    setOpen(newState);
    onOpenChange?.(newState);

    if (!newState) triggerRef.current?.focus();
  };

  useEffect(() => setOpen(open), [open]);

  return (
    <div
      className={classes(styles.wrapper, className)}
    >
      <Button
        ref={triggerRef}
        className={classes(styles.trigger, triggerClass, "trigger")}
        onClick={() => updateDropdownState()}
      >
        {children}
        {
          hintIcon ?? (
            hintIcon !== null ? (
              <ExpandSolidIcon className={styles.hint_icon} />
            ) : null
          )
        }
      </Button>
      {(_open && !!triggerRef.current) && (
        <Popover
          anchor={triggerRef.current}
          onClose={() => updateDropdownState(false)}
          offset={6}
          closeOnEsc="capture"
          closeOnOutsideClick
          adjustOnScroll
          className={classes(styles.dropdown, dropdownClass)}
          alignment={alignment}
          placement={placement}
        >
          {dropdown}
        </Popover>
      )}
    </div>
  );
};

export default Dropdown;
