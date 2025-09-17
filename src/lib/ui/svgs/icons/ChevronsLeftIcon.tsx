import React from "react";

import { SVGProps } from "@/types/prop.types";

const ChevronsLeftIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m11 19l-7-7l7-7m8 14l-7-7l7-7" /></svg>
  );
};

export default ChevronsLeftIcon;
