import React from "react";

import { SVGProps } from "@/types/prop.types";

const PlayIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M5.5 12V5.624c0-1.974 2.18-3.17 3.844-2.108l10 6.376c1.541.983 1.541 3.233 0 4.216l-10 6.376C7.68 21.545 5.5 20.35 5.5 18.376z" /></svg>
  );
};

export default PlayIcon;
