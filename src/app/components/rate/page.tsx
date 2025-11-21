import React from "react";

import { PageSetup } from "@/components/managers";
import { Rate } from "@/lib/ui/elements/rate";
import { EmojiLaughIcon, EmojiNeutralIcon, EmojiSadIcon, EmojiSmileIcon } from "@/lib/ui/svgs/emojis";
import { CircleIcon, DiamondIcon, EmojiCryIcon } from "@/lib/ui/svgs/icons";

import styles from "./styles.module.scss";

const characters = [
  <EmojiCryIcon key={1} />,
  <EmojiSadIcon key={2} />,
  <EmojiNeutralIcon key={3} />,
  <EmojiSmileIcon key={4} />,
  <EmojiLaughIcon key={5} />,
];

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="rate" />

      <Rate aria-label="Rate" name="rate1" />
      <Rate defaultValue={2} max={7} color="blue" icon={<DiamondIcon />} clearable aria-label="Rate" name="rate2" />
      <Rate defaultValue={1} max={3} noStroke aria-label="Rate" name="rate3" />
      <Rate value={2.5} color="orange" noStroke readonly aria-label="Rate" name="rate4" />
      <Rate value={4.35} color="green" readonly aria-label="Rate" name="rate5" />
      <Rate value={3} color="red" disabled icon={<CircleIcon />} aria-label="Rate" name="rate6" />
      <Rate
        color="purple" aria-label="Rate" name="rate7"
        characters={characters} itemClass={styles.item}
      />
    </main>
  );
};

export default page;
