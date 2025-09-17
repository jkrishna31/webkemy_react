import React from "react";

import { SVGProps } from "@/types/prop.types";

const LetterLambdaIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 20l6.5 -9" />
      <path d="M19 20c-6 0 -6 -16 -12 -16" />
    </svg>
  );
};

export default LetterLambdaIcon;
