import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const ListOpenIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h8m-8 7h8m-8 7h8m4-11l3-3l3 3m-6 8l3 3l3-3" /></svg>
  );
};

export default ListOpenIcon;
