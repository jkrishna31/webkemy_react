import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const IdCardIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" strokeWidth="1.5" {...props}><path d="m14 9h4" strokeLinecap="round" /><path d="m14 12.5h3" strokeLinecap="round" /><rect height="18" rx="5" strokeLinejoin="round" width="20" x="2" y="3" /><path d="m5 16c1.20831-2.5811 5.7122-2.7509 7 0" strokeLinecap="round" strokeLinejoin="round" /><path d="m10.5 9c0 1.1046-.89543 2-2 2s-2-.8954-2-2c0-1.10457.89543-2 2-2s2 .89543 2 2z" /></g></svg>
  );
};

export default IdCardIcon;
