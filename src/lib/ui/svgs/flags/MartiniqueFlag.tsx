import React from "react";

import { SVGProps } from "@/types/prop.types";

const MartiniqueFlag = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-mq" viewBox="0 0 640 480" {...props}>
      <path fill="#231f1e" d="M0 0h640v480H0z" />
      <path fill="#00a650" d="M0 0h640v240H0z" />
      <path fill="#ef1923" d="m0 0 320 240L0 480z" />
    </svg>
  );
};

export default MartiniqueFlag;
