import React from "react";

import { SVGProps } from "@/types/prop.types";

const MaximizeIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20.25h4.25a4 4 0 0 0 4-4v-2.5M12 20.25H7.75a4 4 0 0 1-4-4V12M12 20.25V15a3 3 0 0 0-3-3H3.75m0 0V7.75a4 4 0 0 1 4-4h2.5m3.5 0h5.5c.276 0 .526.112.707.293m.293 6.207v-5.5a1 1 0 0 0-.293-.707M13.75 10.25l5.5-5.5l.707-.707" /></svg>
  );
};

export default MaximizeIcon;
