import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const CirclePlayIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9.25" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.93 13.29c0 1.098 0 1.646.23 1.964c.202.277.51.456.85.492c.391.041.867-.232 1.818-.779l2.244-1.29c.957-.55 1.435-.825 1.595-1.185c.14-.313.14-.671 0-.984c-.16-.36-.639-.635-1.595-1.184l-2.244-1.291c-.951-.547-1.427-.82-1.817-.779c-.34.036-.65.215-.85.492c-.23.318-.23.866-.23 1.963z" /></g></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059z" /></g></svg>
  );
};

export default CirclePlayIcon;
