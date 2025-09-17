import React from "react";

import { SVGProps } from "@/types/prop.types";

const PiIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="9" x2="9" y1="4" y2="20" /><path d="M4 7c0-1.7 1.3-3 3-3h13" /><path d="M18 20c-1.7 0-3-1.3-3-3V4" /></svg>
  );
};

export default PiIcon;
