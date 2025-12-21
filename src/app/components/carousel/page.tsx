import React from "react";

import { PageSetup } from "@/components/managers";
import { Carousel, Slide } from "@/lib/ui/elements/Carousel";

import styles from "./styles.module.scss";

const slides: Slide[] = [
  {
    id: "1",
    render: (
      <div className={styles.slide}>{"1"}</div>
    ),
  },
  {
    id: "2",
    render: (
      <div className={styles.slide} data-alt>{"2"}</div>
    ),
  },
  {
    id: "3",
    render: (
      <div className={styles.slide}>{"3"}</div>
    ),
  },
  {
    id: "4",
    render: (
      <div className={styles.slide} data-alt>{"4"}</div>
    ),
  },
  {
    id: "5",
    render: (
      <div className={styles.slide}>{"5"}</div>
    ),
  },
];

const Page = () => {
  return (
    <main>
      <PageSetup pageKey="carousel" />

      <Carousel slides={slides} />
    </main>
  );
};

export default Page;
