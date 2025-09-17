"use client";

import React, { ComponentProps, ReactNode, useEffect, useState } from "react";

import { ExpandSolidIcon } from "@/lib/ui/svgs/icons";

import { Dropdown } from "..";
import styles from "./GeneralDropdown.module.scss";

export interface GeneralDropdownProps extends ComponentProps<"div"> {
  wrapperClass?: string
  btnClass?: string
  ddClass?: string
  iconClass?: string
  closeOnLeave?: boolean
  onClose?: () => void
  xPos?: "left" | "right"
  yPos?: "top" | "bottom"
  value?: string | number
  dropdownContent?: ReactNode
  noIcon?: boolean
}

const GeneralDropdown = ({
  xPos, yPos, value, closeOnLeave, onClose, children,
  wrapperClass, btnClass, ddClass, iconClass, dropdownContent, noIcon,
  ...props
}: GeneralDropdownProps) => {
  const [open, setOpen] = useState(false);

  const openDropdown = () => {
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      onClose?.();
    }
  }, [open, onClose]);

  return (
    <Dropdown
      open={open}
      onOpen={openDropdown}
      onClose={closeDropdown}
      className={`${styles.container} ${wrapperClass}`}
      btnClass={`${styles.dropdown_btn} ${btnClass}`}
      dropdownClass={`${styles.dd_list} ${ddClass}`}
      onMouseLeave={closeOnLeave ? closeDropdown : undefined}
      xPos={xPos} yPos={yPos}
      dropdown={dropdownContent}
    >
      {
        value ? (
          <span className={styles.dropdown_label}>
            {value}
          </span>
        ) : null
      }
      {children}
      {
        !noIcon ? (
          <ExpandSolidIcon className={`${styles.dropdown_icon} ${iconClass}`} />
        ) : null
      }
    </Dropdown>
  );
};

export default GeneralDropdown;
