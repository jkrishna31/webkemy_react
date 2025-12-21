import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const VariableIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m4.87104 4c-1.19763 2.40992-1.87104 5.12632-1.87104 8 0 2.8737.67341 5.5901 1.87104 8m14.12906 0c1.1976-2.4099 1.871-5.1263 1.871-8 0-2.87368-.6734-5.59008-1.871-8m-10.0001 5h1.2457c.4465 0 .8389.29598.9615.72528l1.5856 5.54942c.1226.4293.515.7253.9615.7253h1.2457m1-7h-.0801c-.5839 0-1.1386.25513-1.5185.69842l-4.80276 5.60318c-.37996.4433-.93466.6984-1.51851.6984h-.08013" /></svg>
  );
};

export default VariableIcon;
