import React from "react";

import { SVGProps } from "@/types/prop.types";

const TextColorIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" {...props}><g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="m3 21h18" /><path d="m19 18-3.3753-8.84153c-1.5673-4.10565-2.351-6.15847-3.6247-6.15847s-2.05739 2.05282-3.62473 6.15847l-3.37527 8.84153" /><path d="m8 11h8" /></g></svg>
  );
};

export default TextColorIcon;
