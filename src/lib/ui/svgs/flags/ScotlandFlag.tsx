import React from "react";

import { SVGProps } from "@/types/prop.types";

const ScotlandFlag = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb-sct" viewBox="0 0 640 480" {...props}>
      <path fill="#0065bd" d="M0 0h640v480H0z" />
      <path stroke="#fff" strokeWidth=".6" d="m0 0 5 3M0 3l5-3" transform="scale(128 160)" />
    </svg>
  );
};

export default ScotlandFlag;
