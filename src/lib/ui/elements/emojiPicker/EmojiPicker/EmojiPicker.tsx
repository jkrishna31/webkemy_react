"use client";

import React, { ComponentProps, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { skinTones } from "@/constants/characters.const";
import { categories, categoriesOrder } from "@/data/general/emojis";
import emojisJSON from "@/data/json/emojis.json";
import { useDebouncedCallback } from "@/lib/hooks";
import { SelectDropdown } from "@/lib/ui/elements/dropdowns";
import { GeneralInput, InputFieldWrapper } from "@/lib/ui/elements/inputs";
import { Popover } from "@/lib/ui/elements/popper";
import { TabList } from "@/lib/ui/elements/tablist";
import { EmojiSmileIcon } from "@/lib/ui/svgs/emojis";
import { BulbIcon, BusFrontIcon, CatIcon, CrossIcon, FlagIcon, HistoryIcon, PopcornIcon, SearchIcon, StarIcon, VolleyBallIcon } from "@/lib/ui/svgs/icons";
import { throttle } from "@/lib/utils/general.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./EmojiPicker.module.scss";

export interface EmojiPickerProps extends ComponentProps<"div"> {
  onEmojiSelect?: () => void
}

const skinToneOptions = skinTones.map((sk, idx) => ({ label: sk, value: idx }));

// move to locales
const i18nNames: { [key: string]: string } = {
  recent: "Recent",
  smileys_people: "Smileys and People",
  animals_nature: "Animals and Nature",
  food_drink: "Food and Drink",
  activity: "Activity",
  travel_places: "Travel and Places",
  objects: "Objects",
  symbols: "Symbols",
  flags: "Flags",
};

const categoryIcons: { [key: string]: ReactNode } = {
  recent: <HistoryIcon className={styles.category_icon} />,
  smileys_people: <EmojiSmileIcon className={styles.category_icon} />,
  animals_nature: <CatIcon className={styles.category_icon} />,
  food_drink: <PopcornIcon className={styles.category_icon} />,
  activity: <VolleyBallIcon className={styles.category_icon} />,
  travel_places: <BusFrontIcon className={styles.category_icon} />,
  objects: <BulbIcon className={styles.category_icon} />,
  symbols: <StarIcon className={styles.category_icon} />,
  flags: <FlagIcon className={styles.category_icon} />,
};

const categoryTabs = categoriesOrder.map((id: string) => ({
  id, title: i18nNames[id], render: () => categoryIcons[id],
}));

const EmojiPicker = ({
  onEmojiSelect,
  className, children,
  ...restProps
}: EmojiPickerProps) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSkinTone, setActiveSkinTone] = useState<string | number>(skinToneOptions[0].value);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [variationPicker, setVariationPicker] = useState<{
    emojiId: string; anchor: HTMLElement;
  }>();

  const containerRef = useRef<HTMLUListElement>(null);
  const explicitRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const scrollToElem = (elem: HTMLElement, behavior: ScrollBehavior = "smooth") => {
    const elemRect = elem.getBoundingClientRect();
    const containerRect = (containerRef.current as HTMLElement).getBoundingClientRect();
    (containerRef.current)?.scrollTo({
      top: elemRect.top - containerRect.top + (containerRef.current as HTMLElement).scrollTop,
      behavior,
    });
    explicitRef.current = false;
  };

  const handleTabClick = (id: string) => {
    setActiveCategory(id);
    const elem: HTMLElement | null = (containerRef.current as HTMLElement)?.querySelector(`[data-category="${id}"]`);
    if (elem) {
      explicitRef.current = true;
      scrollToElem(elem, "instant");
    }
  };

  const handleSearch = useDebouncedCallback(
    (val: string) => {
      if (!!val) {
        const newCategories: { [key: string]: { emojis: string[] } } = {};
        for (let i = 1; i < categoriesOrder.length; i++) {
          newCategories[categoriesOrder[i]] = { emojis: [] };
          newCategories[categoriesOrder[i]].emojis = categories[categoriesOrder[i]].emojis.filter(emoji => {
            const name: string = (emojisJSON.emojis as any)[emoji].name;
            const keywords = (emojisJSON.emojis as any)[emoji].keywords;
            const normalizedVal = val.toLocaleLowerCase();
            return name.toLocaleLowerCase().includes(normalizedVal) || keywords.some((kw: string) => kw.toLocaleLowerCase().includes(normalizedVal));
          });
        }
        setFilteredCategories(newCategories);
      } else {
        setFilteredCategories(categories);
      }
    },
    300,
  );

  const clearAnchor = (immediate?: boolean, e?: any) => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      throttledHandleMouseMove.cancel();
      setAnchor(null);
    }, immediate ? 0 : 180);
  };

  const throttledHandleMouseMove = useMemo(() => {
    return throttle((e: any) => {
      if (!e.isTrusted) return;
      clearTimeout(timeoutIdRef.current);
      const emojiBtn = (e.target as HTMLElement).closest("button");
      if (emojiBtn) {
        setAnchor(emojiBtn);
      } else {
        setAnchor(null);
      }
    }, 180);
  }, []);

  const handleMouseMove = useCallback(throttledHandleMouseMove, [throttledHandleMouseMove]);

  const handleDoubleClick = (e: MouseEvent) => {
    const emojiBtn = (e.target as HTMLButtonElement).closest("button");
    const hasVariation = emojiBtn?.getAttribute("data-skin-tone");
    const emojiId = emojiBtn?.getAttribute("data-id");
    if (hasVariation === "true" && emojiBtn && emojiId) {
      e.preventDefault();
      e.stopPropagation();
      setVariationPicker({ emojiId, anchor: emojiBtn });
      clearAnchor(true);
    } else {
      setVariationPicker(undefined);
    }
  };

  const observeCategoryIntersection = () => {
    const categoriesVisibility = new Map();
    const categoryElems = (containerRef.current as HTMLElement)?.querySelectorAll("[data-category]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const category = (entry.target as HTMLElement).getAttribute("data-category");
          if (category) {
            categoriesVisibility.set(category, entry.intersectionRatio);
          }
        }
        const visibilityArr = Array.from(categoriesVisibility);
        if (explicitRef.current) return;
        const fullyVisible = visibilityArr.find(category => category[1] === 1);
        if (fullyVisible) {
          return setActiveCategory(fullyVisible[0]);
        }
        for (const [id, ratio] of visibilityArr) {
          if (ratio) {
            setActiveCategory(id);
            return;
          }
        }
      },
      {
        root: containerRef.current,
        threshold: [0, 1],
      }
    );
    categoryElems.forEach(elem => observer.observe(elem));
  };

  useEffect(() => {
    handleSearch(query);
  }, [handleSearch, query]);

  useEffect(() => {
    observeCategoryIntersection();
    (containerRef.current as HTMLElement).scrollTo({
      behavior: "instant",
      top: 0,
    });
  }, [filteredCategories]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.search_wrapper}>
        <InputFieldWrapper className={styles.search_input_wrapper}>
          <GeneralInput
            placeholder="Search..."
            className={styles.search_input}
            value={query}
            onInput={e => setQuery((e.target as HTMLInputElement).value)}
          />
          <button
            type="reset"
            className={styles.reset_btn}
            hidden={!query}
            onClick={() => setQuery("")}
            aria-label="Clear Search"
            title="Clear"
          >
            <CrossIcon className={styles.reset_icon} />
          </button>
          <button
            className={styles.search_btn}
            onClick={() => handleSearch(query)}
            aria-label="Search"
          >
            <SearchIcon className={styles.search_icon} />
          </button>
        </InputFieldWrapper>
        <SelectDropdown
          options={skinToneOptions}
          selected={activeSkinTone}
          onOptionSelect={(selected) => setActiveSkinTone(selected.value)}
          noIcon
          xPos="left"
          btnClass={styles.skintone_btn}
          wrapperClass={styles.skintone_selector}
        />
      </div>
      <TabList
        activeTab={query ? "" : activeCategory}
        tabs={categoryTabs}
        onChange={handleTabClick}
        btnClass={styles.tab}
        className={styles.tablist}
        aria-hidden={!!query}
      />
      <ul
        ref={containerRef}
        className={classes(styles.emojis_wrapper, "scroll_thin")}
        onMouseMove={handleMouseMove}
        onFocus={handleMouseMove}
        onMouseLeave={() => clearAnchor(true)}
        onBlur={(e) => clearAnchor(false, e)}
        onContextMenu={handleDoubleClick}
      >
        {
          categoriesOrder.map(catId => {
            if (catId === "recent") return null;
            return filteredCategories[catId].emojis.length ? (
              <li
                key={catId}
                className={styles.category_wrapper}
                data-category={catId}
              >
                <p className={styles.category_label}>{i18nNames[catId]}</p>
                <div className={styles.category_emojis}>
                  {
                    filteredCategories[catId].emojis.map((emojiId: string, idx: number) => {
                      const emojiDetails = (emojisJSON.emojis as any)[emojiId];
                      return (
                        <button
                          key={idx}
                          className={styles.emoji}
                          data-skin-tone={emojiDetails.skins.length > 1}
                          data-id={emojiId}
                        >
                          {emojiDetails.skins[emojiDetails.skins.length > 1 ? activeSkinTone : 0].native}
                        </button>
                      );
                    })
                  }
                </div>
              </li>
            ) : null;
          })
        }
      </ul>
      {anchor ? (
        <Popover
          anchor={anchor}
          onClose={() => clearAnchor(true)}
          isTooltip
        // delayCloseOnEsc
        >
          <div className={styles.popover}>
            {anchor.innerText}
            <span>
              {(emojisJSON.emojis as any)[anchor.getAttribute("data-id") as string]?.name}
            </span>
          </div>
        </Popover>
      ) : null}
      {variationPicker ? (
        <Popover
          anchor={variationPicker.anchor}
          onClose={() => setVariationPicker(undefined)}
          closeOnScroll
          closeOnOutsideClick
          // offset={3}
          usePortal={false}
        // delayCloseOnEsc
        >
          <div className={styles.variations}>
            {
              (emojisJSON.emojis as any)[variationPicker.emojiId].skins?.map((skin: any) => (
                <button key={skin.native} className={styles.emoji}>
                  {skin.native}
                </button>
              ))
            }
          </div>
        </Popover>
      ) : null}
    </div>
  );
};

export default EmojiPicker;
