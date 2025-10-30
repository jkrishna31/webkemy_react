import React from "react";

import { SVGProps } from "@/types/prop.types";

const MenuCollapseIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M3 6h14M3 12h10M3 18h14m4-10l-1.154.877C17.95 10.318 17 11.039 17 12s.949 1.682 2.846 3.124L21 16" /></svg>
  );
};

export default MenuCollapseIcon;
