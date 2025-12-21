import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const VolumeHighIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 14.814V9.186c0-3.145 0-4.717-.925-5.109c-.926-.391-2.015.72-4.193 2.945c-1.128 1.152-1.771 1.407-3.376 1.407c-1.403 0-2.105 0-2.61.344C1.85 9.487 2.01 10.882 2.01 12s-.159 2.513.888 3.227c.504.344 1.206.344 2.609.344c1.605 0 2.248.255 3.376 1.407c2.178 2.224 3.267 3.336 4.193 2.945c.925-.392.925-1.964.925-5.11M17 9c.625.82 1 1.863 1 3s-.375 2.18-1 3m3-8c1.25 1.366 2 3.106 2 5s-.75 3.634-2 5" color="currentColor" /></svg>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10V14C2 16 3 17 5 17H6.43C6.8 17 7.17 17.11 7.49 17.3L10.41 19.13C12.93 20.71 15 19.56 15 16.59V7.41003C15 4.43003 12.93 3.29003 10.41 4.87003L7.49 6.70003C7.17 6.89003 6.8 7.00003 6.43 7.00003H5C3 7.00003 2 8.00003 2 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 8C19.78 10.37 19.78 13.63 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.83 5.5C22.72 9.35 22.72 14.65 19.83 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default VolumeHighIcon;
