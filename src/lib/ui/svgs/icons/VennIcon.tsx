import React from "react";

import { SVGProps } from "@/types/prop.types";

const VennIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="12" r="6" /><circle cx="16" cy="12" r="6" /></svg>
  );
};

export default VennIcon;
