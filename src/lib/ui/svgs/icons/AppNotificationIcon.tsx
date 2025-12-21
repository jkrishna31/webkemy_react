import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const AppNotificationIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M19 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m2 4v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V9a6 6 0 0 1 6-6h3" /></svg>
  );
};

export default AppNotificationIcon;
