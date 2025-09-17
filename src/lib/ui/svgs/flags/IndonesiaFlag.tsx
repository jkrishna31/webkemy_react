import React from "react";

import { SVGProps } from "@/types/prop.types";

const IndonesiaFlag = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-id" viewBox="0 0 640 480" {...props}>
      <path fill="#e70011" d="M0 0h640v240H0Z" />
      <path fill="#fff" d="M0 240h640v240H0Z" />
    </svg>
  );
};

export default IndonesiaFlag;
