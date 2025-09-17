import React from "react";

import { SVGProps } from "@/types/prop.types";

const MonacoFlag = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-mc" viewBox="0 0 640 480" {...props}>
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#f31830" d="M0 0h640v240H0z" />
        <path fill="#fff" d="M0 240h640v240H0z" />
      </g>
    </svg>
  );
};

export default MonacoFlag;
