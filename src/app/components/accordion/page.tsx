"use client";

import { ReactNode } from "react";

import { PageSetup } from "@/components/managers";
import { useAccordion } from "@/lib/hooks/useAccordion";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";

import styles from "./page.module.scss";

const Summary = ({ children, onClick }: { children?: ReactNode; onClick?: () => void }) => {
  return (
    <button className={styles.summary} onClick={onClick}>
      {children}
      <ChevronRightIcon />
    </button>
  );
};

const Details = ({ children, open }: { children?: ReactNode; open?: boolean }) => {
  return (
    <CollapsiblePanel open={open}>
      <div className={styles.details}>
        {children}
      </div>
    </CollapsiblePanel>
  );
};

const Page = () => {
  const { activeSections, updateAccordion } = useAccordion("single", ["1"]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="accordion" />

      <div className={styles.accordion}>
        <div className={styles.collapsible} aria-expanded={activeSections.includes("1")}>
          <Summary onClick={() => updateAccordion("1")}>{"Summary 1"}</Summary>
          <Details open={activeSections.includes("1")}>
            <p>{"Detials:"}</p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi blanditiis molestiae. Porro, expedita eum natus qui nulla aliquid asperiores quibusdam totam sint tenetur. Natus?"}
            </p>
          </Details>
        </div>
        <div className={styles.collapsible} aria-expanded={activeSections.includes("2")}>
          <Summary onClick={() => updateAccordion("2")}>{"Summary 2"}</Summary>
          <Details open={activeSections.includes("2")}>
            <p>{"Detials:"}</p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi blanditiis molestiae. Porro, expedita eum natus qui nulla aliquid asperiores quibusdam totam sint tenetur. Natus?"}
            </p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut perspiciatis autem totam debitis deserunt mollitia, minus laborum repellat praesentium labore voluptas quis. Molestias dolor explicabo nulla? Velit, tenetur."}
            </p>
          </Details>
        </div>
        <div className={styles.collapsible} aria-expanded={activeSections.includes("3")}>
          <Summary onClick={() => updateAccordion("3")}>{"Summary 3"}</Summary>
          <Details open={activeSections.includes("3")}>
            <p>{"Detials:"}</p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi blanditiis molestiae. Porro, expedita eum natus qui nulla aliquid asperiores quibusdam totam sint tenetur. Natus?"}
            </p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit debitis consequuntur dignissimos ratione, doloribus voluptatem officiis sit expedita neque! Ut perspiciatis autem totam debitis deserunt mollitia, minus laborum repellat praesentium labore voluptas quis. Molestias dolor explicabo nulla? Velit, tenetur."}
            </p>
          </Details>
        </div>
        <div className={styles.collapsible} aria-expanded={activeSections.includes("4")}>
          <Summary onClick={() => updateAccordion("4")}>{"Summary 4"}</Summary>
          <Details open={activeSections.includes("4")}>
            <p>{"Detials:"}</p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit debitis consequuntur dignissimos ratione, doloribus voluptatem officiis sit expedita neque! Ut perspiciatis autem totam debitis deserunt mollitia, minus laborum repellat praesentium labore voluptas quis. Molestias dolor explicabo nulla? Velit, tenetur."}
            </p>
          </Details>
        </div>
        <div className={styles.collapsible} aria-expanded={activeSections.includes("5")}>
          <Summary onClick={() => updateAccordion("5")}>{"Summary 5"}</Summary>
          <Details open={activeSections.includes("5")}>
            <p>{"Detials:"}</p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi blanditiis molestiae. Porro, expedita eum natus qui nulla aliquid asperiores quibusdam totam sint tenetur. Natus?"}
            </p>
            <p>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit debitis consequuntur dignissimos ratione, doloribus voluptatem officiis sit expedita neque! Ut perspiciatis autem totam debitis deserunt mollitia, minus laborum repellat praesentium labore voluptas quis. Molestias dolor explicabo nulla? Velit, tenetur."}
            </p>
          </Details>
        </div>
      </div>
    </main>
  );
};

export default Page;
