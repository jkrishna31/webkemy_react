"use client";

import React, { ComponentProps, MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { skinTones } from "@/constants/characters.const";
import { Keys } from "@/constants/keys.const";
import { categories, categoriesOrder } from "@/data/general/emojis";
import emojisJSON from "@/data/json/emojis.json";
import { useDebouncedCallback } from "@/lib/hooks/useDebouncedCallback";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { usePrevious } from "@/lib/hooks/usePrevious";
import { useThrottledCallback } from "@/lib/hooks/useThrottledCallback";
import { SelectDropdown } from "@/lib/ui/elements/dropdowns";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Popover } from "@/lib/ui/elements/Popover";
import { Tabs } from "@/lib/ui/elements/Tabs";
import BulbIcon from "@/lib/ui/svgs/icons/BulbIcon";
import BusFrontIcon from "@/lib/ui/svgs/icons/BusFrontIcon";
import CatIcon from "@/lib/ui/svgs/icons/CatIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import EmojiSmileIcon from "@/lib/ui/svgs/icons/EmojiSmileIcon";
import FlagIcon from "@/lib/ui/svgs/icons/FlagIcon";
import HistoryIcon from "@/lib/ui/svgs/icons/HistoryIcon";
import PopcornIcon from "@/lib/ui/svgs/icons/PopcornIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import VolleyBallIcon from "@/lib/ui/svgs/icons/VolleyBallIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./EmojiPicker.module.scss";

export interface EmojiPickerProps extends ComponentProps<"div"> {
  onEmojiSelect?: () => void
}

const skinToneOptions = skinTones.map((sk, idx) => ({ label: sk, value: idx }));

// TODO: move to locales
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
  const prevVariationPicker = usePrevious(variationPicker);

  const containerRef = useRef<HTMLUListElement>(null);
  const explicitRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const variationsRef = useRef<HTMLDivElement>(null);

  const variations = variationPicker?.emojiId ? (emojisJSON.emojis as any)[variationPicker.emojiId].skins : [];

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

  const throttledHandleMouseMove = useThrottledCallback((e: any) => {
    if (!e.isTrusted) return;
    clearTimeout(timeoutIdRef.current);
    const emojiBtn = (e.target as HTMLElement).closest("button");
    if (emojiBtn) {
      const emojiId = emojiBtn.getAttribute("data-id");
      const currEmojiId = anchor ? anchor.getAttribute("data-id") : null;
      if (emojiId !== currEmojiId) setAnchor(emojiBtn);
    }
    else setAnchor(null);
  }, 150);

  const clearAnchor = useCallback((immediate?: boolean, e?: any) => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setAnchor(null);
      throttledHandleMouseMove.cancel();
    }, immediate ? 0 : 150);
  }, [throttledHandleMouseMove]);

  const handleContextMenu = (e: MouseEvent) => {
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

  useEffect(() => handleSearch(query), [handleSearch, query]);

  useEffect(() => {
    requestAnimationFrame(() => {
      anchor?.focus();
    });
  }, [anchor]);

  useEffect(() => {
    observeCategoryIntersection();
    (containerRef.current as HTMLElement).scrollTo({
      behavior: "instant",
      top: 0,
    });
  }, [filteredCategories]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const emojiBtn = (e.target as HTMLButtonElement).closest("button");
      const hasVariation = emojiBtn?.getAttribute("data-skin-tone");
      const emojiId = emojiBtn?.getAttribute("data-id");

      if (e.code === Keys.SPACE && hasVariation === "true" && emojiId && emojiBtn) {
        e.preventDefault();
        clearAnchor(true);
        setVariationPicker(curr => {
          return curr?.emojiId === emojiId ? undefined : { emojiId, anchor: emojiBtn };
        });
      } else if (e.code === Keys.ARROW_DOWN) {

      } else if (e.code === Keys.ARROW_UP) {

      } else if (e.code === Keys.ENTER) {
        // if (variationPicker?.emojiId) { select the active variation }
      } else if (e.code === Keys.ARROW_LEFT) {
        // if (variationPicker?.emojiId) { select the active variation }
      } else if (e.code === Keys.ARROW_RIGHT) {
        // if (variationPicker?.emojiId) { select the active variation }
      } else if (e.key === Keys.ESC) {
        if (prevVariationPicker?.anchor) {
          prevVariationPicker?.anchor?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearAnchor, prevVariationPicker?.anchor]);

  useFocusTrap(variationsRef, !!variationPicker?.emojiId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.search_wrapper}>
        <InputFieldWrapper className={styles.search_input_wrapper}>
          <GeneralInput
            placeholder="Search"
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
      <Tabs
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
        onMouseMove={throttledHandleMouseMove}
        onFocus={throttledHandleMouseMove}
        onMouseLeave={() => clearAnchor(true)}
        onBlur={() => clearAnchor(false)}
        onContextMenu={handleContextMenu}
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
        // closeOnEsc="capture"
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
          usePortal={false}
          ref={variationsRef}
        // closeOnEsc="capture"
        >
          <div className={styles.variations}>
            {
              variations?.map((skin: any) => (
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
