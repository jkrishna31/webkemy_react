"use client";

import { ComponentProps } from "react";

import { useAccordion } from "@/lib/hooks/useAccordion";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./FAQs.module.scss";

export interface FAQsProps extends ComponentProps<"div"> {
  faqs?: {
    id: number;
    question: string;
    answer: string;
  }[];
}

const FAQs = ({
  faqs,
  className,
  ...restProps
}: FAQsProps) => {
  const { activeSections, updateAccordion } = useAccordion<number>("multiple", [1]);

  return (
    <div className={classes(styles.faqs, className)} {...restProps}>
      {faqs?.map((faqItem) => (
        <div
          key={faqItem.id}
          className={styles.collapsible}
          aria-expanded={activeSections.includes(faqItem.id)}
        >
          <button
            onClick={() => updateAccordion(faqItem.id)}
            className={styles.summary}
          >
            <h3>{faqItem.question}</h3>
            <PlusIcon className={styles.hint_icon} />
          </button>
          <CollapsiblePanel
            open={activeSections.includes(faqItem.id)}
          >
            <div className={styles.details}>
              {faqItem.answer.split("\n\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </CollapsiblePanel>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
