import React from "react";

import { SVGProps } from "@/types/prop.types";

const SaintPierreAndMiquelonFlag = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-pm" viewBox="0 0 640 480" {...props}>
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#000091" d="M0 0h213.3v480H0z" />
      <path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
    </svg>
  );
};

export default SaintPierreAndMiquelonFlag;
