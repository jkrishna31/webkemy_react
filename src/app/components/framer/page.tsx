import React from "react";

import { PageSetup } from "@/components/managers";

import styles from "./styles.module.scss";

const page = () => {
  // === in the container
  // currFrame, prevFrame, nextFrame
  // onChange function return newCurr frame number
  // auto render the content in prev, curr, and next frame container as per the frame count

  // === inside the component
  // WHEN REACT BOTTOM (how to know when reach bottom)
  // use pointerevents 

  // WHEN REACT TOP

  return (
    <main>
      <PageSetup pageKey="framer" />

      <div className={styles.container}>
        <div data-frame='prev'></div>
        <div data-frame='curr'></div>
        <div data-frame='next'></div>
      </div>
    </main>
  );
};

export default page;
