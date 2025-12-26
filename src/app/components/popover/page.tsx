import React from "react";

import TriangleWarningIcon from "@/lib/ui/svgs/icons/TriangleWarningIcon";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-[1rem]">
        <TriangleWarningIcon />
        <p>{"Under Construction!"}</p>
      </div>
    </main>
  );
};

export default Page;
