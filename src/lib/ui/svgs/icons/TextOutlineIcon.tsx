import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const TextOutlineIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" clipRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3.5a1.75 1.75 0 0 0-1.588 1.015l-6.25 13.5a1.75 1.75 0 0 0 3.176 1.47L9.1 15.678h5.8l1.762 3.807a1.75 1.75 0 1 0 3.176-1.47l-6.25-13.5A1.75 1.75 0 0 0 12 3.5" /><path fill="currentColor" fillRule="evenodd" d="m12 7.63l2.453 5.298H9.547z" /></g></svg>
  );
};

export default TextOutlineIcon;
