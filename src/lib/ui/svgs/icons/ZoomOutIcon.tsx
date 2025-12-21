import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const ZoomOutIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M7.56 10.56h6m1.993 4.993a7.06 7.06 0 1 0-9.985-9.985a7.06 7.06 0 0 0 9.985 9.985m0 0L20 20" /><path d="M15.553 5.568a7.06 7.06 0 1 1-9.985 9.985a7.06 7.06 0 0 1 9.985-9.985" /></g></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21l-4.35-4.35M8 11h6" /></g></svg>
  );
};

export default ZoomOutIcon;
