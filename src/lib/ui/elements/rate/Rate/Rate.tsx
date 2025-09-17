"use client";

import React, { ComponentProps, useState } from "react";

import { EmojiAngryIcon, EmojiLaughIcon, EmojiNeutralIcon, EmojiSadIcon, EmojiSmileIcon } from "@/lib/ui/svgs/emojis";

import styles from "./Rate.module.scss";

export interface RateProps extends ComponentProps<"div"> {

}

const Rate = () => {
  const [rated, setRated] = useState<number>(0);

  const handleRating = (e: React.MouseEvent) => {
    const selectedRating = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRating) {
      setRated(Number(selectedRating?.getAttribute("data-rating")));
    }
  };

  return (
    <div
      className="flex items-center gap-3 rounded-full p-3"
      onClick={handleRating}
    >
      <button
        className={styles.rate_btn} data-rating="1" data-selected={rated === 1}
      >
        <EmojiAngryIcon className={`${styles.emoji}`} />
      </button>
      <button
        className={styles.rate_btn} data-rating="2" data-selected={rated === 2}
      >
        <EmojiSadIcon className={`${styles.emoji}`} />
      </button>
      <button
        className={styles.rate_btn} data-rating="3" data-selected={rated === 3}
      >
        <EmojiNeutralIcon className={`${styles.emoji}`} />
      </button>
      <button
        className={styles.rate_btn} data-rating="4" data-selected={rated === 4}
      >
        <EmojiSmileIcon className={`${styles.emoji}`} />
      </button>
      <button
        className={styles.rate_btn} data-rating="5" data-selected={rated === 5}
      >
        <EmojiLaughIcon className={`${styles.emoji}`} />
      </button>
    </div>
  );
};

export default Rate;
