import React from "react";

import { SVGProps } from "@/types/prop.types";

const LigatureIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 20V8c0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2" /><path d="M6 12h4" /><path d="M14 12h2v8" /><path d="M6 20h4" /><path d="M14 20h4" /></svg>
  );
};

export default LigatureIcon;
