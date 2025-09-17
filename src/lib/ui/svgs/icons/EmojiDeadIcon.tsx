import React from "react";

import { SVGProps } from "@/types/prop.types";

const EmojiDeadIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><circle cx="12" cy="12" r="10" /><path d="M9 16h6m-5-5L8.5 9.5m0 0L7 8m1.5 1.5L7 11m1.5-1.5L10 8m7 3l-1.5-1.5m0 0L14 8m1.5 1.5L14 11m1.5-1.5L17 8" /></g></svg>
  );
};

export default EmojiDeadIcon;
