import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const ToggleSwitchIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><g><circle cx="9" cy="12" r="3" /><rect width="20" height="14" x="2" y="5" rx="7" /></g></svg>
  );
};

export default ToggleSwitchIcon;
