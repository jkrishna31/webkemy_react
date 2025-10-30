import React from "react";

import { SVGProps } from "@/types/prop.types";

const EastWestArrowCircleIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M12 2.5a9.5 9.5 0 1 1 0 19a9.5 9.5 0 0 1 0-19Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M9 9l-3 3l3 3m6 0l3-3l-3-3" /></svg>
  );
};

export default EastWestArrowCircleIcon;
