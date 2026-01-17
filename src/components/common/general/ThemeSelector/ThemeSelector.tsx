"use client";

import { useRef, useState } from "react";

import { usePreferredTheme } from "@/data/stores";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import ComputerIcon from "@/lib/ui/svgs/icons/ComputerIcon";
import MoonIcon from "@/lib/ui/svgs/icons/MoonIcon";
import SunIcon from "@/lib/ui/svgs/icons/SunIcon";
import ThemeIcon from "@/lib/ui/svgs/icons/ThemeIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ThemeSelector.module.scss";

export interface ThemeSelectorProps {
  className?: string;
}

const ThemeSelector = ({
  className,
}: ThemeSelectorProps) => {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

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
      {(open && !!triggerRef.current) && (
        <Popover
          anchor={triggerRef.current as HTMLElement}
          onClose={() => setOpen(!open)}
          animation="slide"
          className={styles.popover}
        >
          <ItemList>
            <Item primary="Light" icon={<SunIcon />} className={styles.item} selected={theme === "light"} disabled />
            <Item primary="Dark" icon={<MoonIcon />} className={styles.item} selected={theme === "dark"} disabled />
            <Item primary="System" icon={<ComputerIcon />} className={styles.item} selected={theme === "system"} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

export default ThemeSelector;
