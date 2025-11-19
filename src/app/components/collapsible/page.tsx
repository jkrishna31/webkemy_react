"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Collapsible } from "@/lib/ui/elements/collapsible";
import { ChevronRightIcon } from "@/lib/ui/svgs/icons";

import styles from "./styles.module.scss";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="collapsible" />

      <Collapsible
        open={open}
        summary={
          <button
            className={styles.summary}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          // role="header"
          // aria-controls="id-of-the-panel"
          >
            {"Collapsible Summary"}
            <ChevronRightIcon />
          </button>
        }
        className={styles.collapsible}
        detailsClass={styles.details}
      >
        <div>
          <p>{"Details:"}</p>
          <p>
            {"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab cumque tenetur tempore sequi at eos qui eveniet exercitationem consequatur assumenda laboriosam esse dolor sint, et ut inventore? Numquam dolorem ut magni, aspernatur ipsam tempora accusantium minima repellendus distinctio iste qui dignissimos reiciendis obcaecati minus excepturi molestiae, doloribus placeat nisi id. Quisquam enim magnam nostrum fugiat quibusdam voluptate odio alias reiciendis."}
          </p>
        </div>
      </Collapsible>
    </main>
  );
};

export default Page;
