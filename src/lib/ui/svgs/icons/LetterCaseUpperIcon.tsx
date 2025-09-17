import React from "react";

import { SVGProps } from "@/types/prop.types";

const LetterCaseUpperIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" />
      <path d="M3 13h7" />
      <path d="M14 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" />
      <path d="M14 13h7" />
    </svg>
  );
};

export default LetterCaseUpperIcon;
