"use client";

import { useState } from "react";

import { usePreferredTheme } from "@/data/stores";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { Popover } from "@/lib/components/elements/popover";
import { useElementRef } from "@/lib/hooks/useElementRef";
import ComputerIcon from "@/lib/svgs/icons/ComputerIcon";
import MoonIcon from "@/lib/svgs/icons/MoonIcon";
import SunIcon from "@/lib/svgs/icons/SunIcon";
import ThemeIcon from "@/lib/svgs/icons/ThemeIcon";
import { classes } from "@/lib/utils/style";

import styles from "./ThemeSelector.module.scss";

export interface ThemeSelectorProps {
  className?: string;
}

const ThemeSelector = ({
  className,
}: ThemeSelectorProps) => {
  const [open, setOpen] = useState(false);

  const { element: triggerElement, ref: triggerRef } = useElementRef<HTMLButtonElement>();

  const theme = usePreferredTheme();

  // faro.api?.pushLog(
  //   ["Theme popup opened"],
  //   {
  //     level: LogLevel.LOG,
  //     context: {
  //       desc: "Theme Popup Opened"
  //     }
  //   }
  // );

  return (
    <>
      <button
        ref={triggerRef}
        aria-label="change theme"
        className={classes(styles.trigger, className)}
        title="Change Theme"
        onClick={() => setOpen(!open)}
      >
        <ThemeIcon />
      </button>
      {(open && !!triggerElement) && (
        <Popover
          anchor={triggerElement}
          onClose={() => setOpen(!open)}
          animation="slide"
          className={styles.popover}
          closeOnScroll
        >
          <ItemList>
            {/* <Item label="Light" icon={<SunIcon />} selected={theme === "light"} disabled /> */}
            {/* <Item label="Dark" icon={<MoonIcon />} selected={theme === "dark"} disabled /> */}
            <Item label="System" icon={<ComputerIcon />} selected={theme === "system"} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

export default ThemeSelector;
