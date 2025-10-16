import React from "react";

import { SVGProps } from "@/types/prop.types";

const FlipVerticalIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" /><path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" /><path d="M4 12H2" /><path d="M10 12H8" /><path d="M16 12h-2" /><path d="M22 12h-2" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M5.886 2h12.227c1.703 0 2.554 0 2.833.542c.279.543-.216 1.235-1.205 2.62l-1.13 1.582c-.44.616-.66.924-.983 1.09S16.928 8 16.17 8H7.83c-.757 0-1.136 0-1.459-.166s-.543-.474-.983-1.09l-1.13-1.582c-.989-1.385-1.483-2.077-1.204-2.62C3.333 2 4.184 2 5.886 2Zm0 20h12.227c1.703 0 2.554 0 2.833-.542c.279-.543-.216-1.235-1.205-2.62l-1.13-1.582c-.44-.616-.66-.924-.983-1.09S16.928 16 16.17 16H7.83c-.757 0-1.136 0-1.459.166s-.543.474-.983 1.09l-1.13 1.581c-.989 1.386-1.483 2.078-1.204 2.62S4.184 22 5.886 22Z" /><path strokeLinecap="round" d="M10 12h4m4 0h4M2 12h4" /></svg>
  );
};

export default FlipVerticalIcon;
