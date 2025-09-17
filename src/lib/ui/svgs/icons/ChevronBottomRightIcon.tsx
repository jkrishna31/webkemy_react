import React from "react";

import { SVGProps } from "@/types/prop.types";

const ChevronBottomRightIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8v8h-8" />
    </svg>
  );
};

export default ChevronBottomRightIcon;
