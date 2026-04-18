"use client";

import { useState } from "react";

import { usePreferredLang } from "@/data/stores";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { Popover } from "@/lib/components/elements/popover";
import { useElementRef } from "@/lib/hooks/useElementRef";
import GlobeIcon from "@/lib/svgs/icons/GlobeIcon";
import { classes } from "@/lib/utils/style";

import styles from "./LangSelector.module.scss";

export interface LangSelectorProps {
  className?: string;
}

const LangSelector = ({
  className,
}: LangSelectorProps) => {
  const { element: triggerElement, ref: triggerRef } = useElementRef<HTMLButtonElement>();

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
      {(open && !!triggerElement) && (
        <Popover
          anchor={triggerElement}
          onClose={() => setOpen(!open)}
          animation="slide"
          className={styles.popover}
          closeOnScroll
        >
          <ItemList>
            <Item label="English" className={styles.item} selected={lang === "english"} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

export default LangSelector;
