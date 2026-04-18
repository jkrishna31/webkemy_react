import { PageSetup } from "@/components/managers";
import { Rate } from "@/lib/components/elements/rate";
import CircleIcon from "@/lib/svgs/icons/CircleIcon";
import DiamondIcon from "@/lib/svgs/icons/DiamondIcon";
import EmojiAngryIcon from "@/lib/svgs/icons/EmojiAngryIcon";
import EmojiLaughIcon from "@/lib/svgs/icons/EmojiLaughIcon";
import EmojiNeutralIcon from "@/lib/svgs/icons/EmojiNeutralIcon";
import EmojiSadIcon from "@/lib/svgs/icons/EmojiSadIcon";
import EmojiSmileIcon from "@/lib/svgs/icons/EmojiSmileIcon";

import styles from "./page.module.scss";

const characters = [
  <EmojiAngryIcon key={1} />,
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
      <Rate defaultValue={.5} max={3} subStep={.25} color="purple" noStroke clearable aria-label="Rate" name="rate3" />
      <Rate value={2.5} color="orange" noStroke readonly aria-label="Rate" name="rate4" />
      <Rate value={4.35} color="green" readonly aria-label="Rate" name="rate5" />
      <Rate value={3} color="red" disabled icon={<CircleIcon />} aria-label="Rate" name="rate6" />
      <Rate
        aria-label="Rate" name="rate7"
        characters={characters} itemClass={styles.item}
      />
    </main>
  );
};

export default page;
