import React from "react";

import { SVGProps } from "@/types/prop.types";

const SendIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 12l-3 9l18-9L3 3zm0 0h6" /></svg>
  );
};

export default SendIcon;
