import React from "react";

import { SVGProps } from "@/types/prop.types";

const VolumeOffIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 14.814V9.186c0-3.145 0-4.717-.925-5.109c-.926-.391-2.015.72-4.193 2.945c-1.128 1.152-1.771 1.407-3.376 1.407c-1.403 0-2.105 0-2.61.344C1.85 9.487 2.01 10.882 2.01 12s-.159 2.513.888 3.227c.504.344 1.206.344 2.609.344c1.605 0 2.248.255 3.376 1.407c2.178 2.224 3.267 3.336 4.193 2.945c.925-.392.925-1.964.925-5.11M18 10l4 4m-4 0l4-4" color="currentColor" /></svg>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 10.1595V14.1595C2 16.1595 3 17.1595 5 17.1595H6.43C6.8 17.1595 7.17 17.2695 7.49 17.4595L10.41 19.2895C12.93 20.8695 15 19.7195 15 16.7495V7.56946C15 4.58946 12.93 3.44946 10.41 5.02946L7.49 6.85946C7.17 7.04946 6.8 7.15946 6.43 7.15946H5C3 7.15946 2 8.15946 2 10.1595Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 14.1194L18.04 10.1594" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.96 10.1995L18 14.1595" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default VolumeOffIcon;
