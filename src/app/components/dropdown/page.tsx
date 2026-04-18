"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { SOURCE_CODE } from "@/constants/app.const";
import { Dropdown } from "@/lib/components/elements/dropdown";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { months, monthsOrder } from "@/lib/data/datetime";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import PopoverLeftIcon from "@/lib/svgs/icons/PopoverLeftIcon";
import PuzzleIcon from "@/lib/svgs/icons/PuzzleIcon";
import { GithubLogo } from "@/lib/svgs/logos";

import styles from "./page.module.scss";

const Page = () => {
  const [selected, setSelected] = useState<string>();
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="dropdown" />

      <Dropdown
        open={open}
        onOpenChange={setOpen}
        dropdown={
          <ItemList>
            {
              monthsOrder.map(key => (
                <Item
                  key={key}
                  label={months[key].label}
                  selected={selected === key}
                  onClick={() => {
                    setSelected(key);
                    setOpen(false);
                  }}
                />
              ))
            }
          </ItemList>
        }
      >
        {selected ? months[selected]?.label : "Month"}
      </Dropdown>

      <Dropdown
        dropdown={
          <ItemList>
            <Item<"a">
              as="a" href="/components"
              label="All Components"
              icon={<PuzzleIcon />}
            />
            <Item<"a">
              as="a" href="/components/dropdown"
              label="Dropdown"
              icon={<PopoverLeftIcon />}
              disabled
            />
            <Item<"a">
              as="a" href="/components/popover"
              label="Popover"
              icon={<PopoverLeftIcon />}
            />
            <Item<"a">
              as="a" href={SOURCE_CODE}
              label="Source Code"
              icon={<GithubLogo />}
            />
          </ItemList>
        }
        hintIcon={null}
        triggerClass={styles.trigger}
      >
        <EllipsisHIcon className={styles.ellipsis_icon} />
      </Dropdown>
    </main>
  );
};

export default Page;
