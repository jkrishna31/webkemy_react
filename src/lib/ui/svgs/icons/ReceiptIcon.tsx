import React from "react";

import { SVGProps } from "@/types/prop.types";

const ReceiptIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m22 6v2.42c0 1.58-1 2.58-2.58 2.58h-3.42v-6.99c0-1.11.91-2.01 2.02-2.01 1.09.01 2.09.45 2.81 1.17.72.73 1.17 1.73 1.17 2.83z" strokeMiterlimit="10" /><path d="m2 7v14c0 .83.93998 1.3 1.59998.8l1.71002-1.28c.4-.3.96-.26 1.32.1l1.65998 1.67c.39.39 1.03004.39 1.42004 0l1.67998-1.68c.35-.35.91-.39 1.3-.09l1.71 1.28c.66.49 1.6.02 1.6-.8v-17c0-1.1.9-2 2-2h-11-1c-3 0-4 1.79-4 4z" strokeMiterlimit="10" /><path d="m6 9h6" /><path d="m6.75 13h4.5" /></g></svg>
  );
};

export default ReceiptIcon;
