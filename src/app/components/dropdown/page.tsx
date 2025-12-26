import React from "react";

import { PageSetup } from "@/components/managers";
import { SOURCE_CODE } from "@/constants/general.const";
import { months, monthsOrder } from "@/data/general/datetime";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import PopoverLeftIcon from "@/lib/ui/svgs/icons/PopoverLeftIcon";
import PuzzleIcon from "@/lib/ui/svgs/icons/PuzzleIcon";
import { GithubLogo } from "@/lib/ui/svgs/logos";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="dropdown" />

      <Dropdown
        dropdown={
          <ItemList>
            {
              monthsOrder.map(key => (
                <Item key={key} primary={months[key].label} />
              ))
            }
          </ItemList>
        }
      >
        {"Month"}
      </Dropdown>

      <Dropdown
        dropdown={
          <ItemList>
            <Item<"a">
              as="a" href="/components"
              primary="All Components"
              icon={<PuzzleIcon />}
            />
            <Item<"a">
              as="a" href="/components/dropdown"
              primary="Dropdown"
              icon={<PopoverLeftIcon />}
            />
            <Item<"a">
              as="a" href="/components/popover"
              primary="Popover"
              icon={<PopoverLeftIcon />}
            />
            <Item<"a">
              as="a" href={SOURCE_CODE}
              primary="Source Code"
              icon={<GithubLogo />}
            />
          </ItemList>
        }
        hintIcon={null}
        className={styles.dd2}
      >
        <EllipsisHIcon className={styles.ellipsis_icon} />
      </Dropdown>
    </main>
  );
};

export default Page;
