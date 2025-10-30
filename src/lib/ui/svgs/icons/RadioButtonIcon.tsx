import React from "react";

import { SVGProps } from "@/types/prop.types";

const RadioButtonIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg>
  );
};

export default RadioButtonIcon;
