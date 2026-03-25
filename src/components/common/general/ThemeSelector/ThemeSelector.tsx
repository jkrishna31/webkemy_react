"use client";

import { useState } from "react";

import { usePreferredTheme } from "@/data/stores";
import { Item } from "@/lib/components/elements/Item";
import { ItemList } from "@/lib/components/elements/ItemList";
import { Popover } from "@/lib/components/elements/Popover";
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
            {/* <Item primary="Light" icon={<SunIcon />} scope="list" selected={theme === "light"} disabled /> */}
            {/* <Item primary="Dark" icon={<MoonIcon />} scope="list" selected={theme === "dark"} disabled /> */}
            <Item primary="System" icon={<ComputerIcon />} scope="list" selected={theme === "system"} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

export default ThemeSelector;
