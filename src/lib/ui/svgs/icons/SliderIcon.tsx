import React from "react";

import { SVGProps } from "@/types/prop.types";

const SliderIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path d="m6.755 17.283l-1.429-10A2 2 0 0 1 7.306 5h3.388a2 2 0 0 1 1.98 2.283l-1.429 10A2 2 0 0 1 9.265 19h-.53a2 2 0 0 1-1.98-1.717Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h4m16 0H12" /></g></svg>
  );
};

export default SliderIcon;
