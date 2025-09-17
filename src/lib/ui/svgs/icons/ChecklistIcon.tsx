import React from "react";

import { SVGProps } from "@/types/prop.types";

const ChecklistIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="m11 6h10" /><path d="m11 12h10" /><path d="m11 18h10" /><g strokeLinejoin="round"><path d="m3 7.39286s1 .6518 1.5 1.60714c0 0 1.5-3.75 3.5-5" /><path d="m3 18.3929s1 .6518 1.5 1.6071c0 0 1.5-3.75 3.5-5" /></g></svg>
  );
};

export default ChecklistIcon;
