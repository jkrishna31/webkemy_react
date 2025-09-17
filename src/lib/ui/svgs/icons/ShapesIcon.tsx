import React from "react";

import { SVGProps } from "@/types/prop.types";

const ShapesIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M11 6h7.276c2.258 0 3.387 0 3.669.678c.28.679-.518 1.477-2.115 3.074L9.752 19.83c-1.597 1.597-2.395 2.396-3.074 2.115C6 21.663 6 20.535 6 18.276V11" /><path d="M17.5 12h.5c1.886 0 2.828 0 3.414.586S22 14.114 22 16v1c0 1.886 0 2.828-.586 3.414S19.886 21 18 21h-1c-1.886 0-2.828 0-3.414-.586S13 18.886 13 17v-.5" /></g></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /><rect x="3" y="14" width="7" height="7" rx="1" /><circle cx="17.5" cy="17.5" r="3.5" /></svg>
  );
};

export default ShapesIcon;
