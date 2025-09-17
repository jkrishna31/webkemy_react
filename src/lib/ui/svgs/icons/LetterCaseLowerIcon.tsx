import React from "react";

import { SVGProps } from "@/types/prop.types";

const LetterCaseLowerIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="6.5" cy="15.5" r="3.5" />
      <path d="M10 12v7" />
      <circle cx="17.5" cy="15.5" r="3.5" />
      <path d="M21 12v7" />
    </svg>


  );
};

export default LetterCaseLowerIcon;
