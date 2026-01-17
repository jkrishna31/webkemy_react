"use client";

import { useRef, useState } from "react";

import { usePreferredLang } from "@/data/stores";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import GlobeIcon from "@/lib/ui/svgs/icons/GlobeIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./LangSelector.module.scss";

export interface LangSelectorProps {
  className?: string;
}

const LangSelector = ({
  className,
}: LangSelectorProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const lang = usePreferredLang();

  return (
    <>
      <button
        ref={triggerRef}
        aria-label="change language"
        className={classes(className)}
        title="Change Language"
        onClick={() => setOpen(!open)}
      >
        <GlobeIcon />
      </button>
      {(open && !!triggerRef.current) && (
        <Popover
          anchor={triggerRef.current as HTMLElement}
          onClose={() => setOpen(!open)}
          animation="slide"
          className={styles.popover}
        >
          <ItemList>
            <Item primary="English" className={styles.item} selected={lang === "english"} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

export default LangSelector;
