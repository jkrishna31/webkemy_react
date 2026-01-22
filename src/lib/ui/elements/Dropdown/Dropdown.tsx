"use client";

import { ComponentProps, ReactNode, useEffect, useEffectEvent, useState } from "react";

import { useElementRef } from "@/lib/hooks/useElementRef";
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
    <>
      <Button
        ref={triggerRef}
        className={classes(styles.dropdown_trigger, triggerClass)}
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
      {(_open && !!triggerElement) && (
        <Popover
          anchor={triggerElement}
          onClose={handleClose}
          offset={6}
          className={classes(styles.dropdown_popover, dropdownClass)}
          alignment={alignment}
          placement={placement}
          animation="slide"
        >
          {dropdown}
        </Popover>
      )}
    </>
  );
};

export default Dropdown;
