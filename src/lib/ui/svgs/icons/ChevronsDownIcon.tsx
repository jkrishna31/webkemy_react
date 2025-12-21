import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const ChevronsDownIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7 6 5 5 5-5" /><path d="m7 13 5 5 5-5" /></svg>
  );
};

export default ChevronsDownIcon;
