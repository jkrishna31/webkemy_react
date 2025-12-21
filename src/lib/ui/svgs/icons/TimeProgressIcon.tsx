import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const TimeProgressIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="M5.636 5.636A9 9 0 1 0 12 3m0 9L6 6m6-3v2m9 7h-2m-7 7v2m-7-9H3" /></svg>
  );
};

export default TimeProgressIcon;
