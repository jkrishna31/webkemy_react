import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const CircleStopSolidIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none"><circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><rect width="8" height="8" x="8" y="8" fill="currentColor" rx="2" /></g></svg>
  );
};

export default CircleStopSolidIcon;
