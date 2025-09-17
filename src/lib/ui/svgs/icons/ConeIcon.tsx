import React from "react";

import { SVGProps } from "@/types/prop.types";

const ConeIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" /><ellipse cx="12" cy="19" rx="9" ry="3" /></svg>
  );
};

export default ConeIcon;
