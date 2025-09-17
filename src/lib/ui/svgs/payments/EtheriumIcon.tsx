import React from "react";

import { SVGProps } from "@/types/prop.types";

const EtheriumIcon = (props: SVGProps) => {
  return (
    <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white" />
      <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F2F4F7" />
      <ellipse cx="22.58" cy="15.9134" rx="10.58" ry="10.58" fill="#6481E7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.958 16.3438L22.7038 19.1494V8.46912L17.958 16.3438Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.7041 8.46912V19.1494L27.4499 16.3438L22.7041 8.46912Z" fill="#C1CCF5" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.7041 14.1868L17.958 16.3437L22.7038 19.1492L27.4499 16.344L22.7041 14.1868Z" fill="#8299EC" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.7041 14.1868L17.958 16.3437L22.7038 19.1492L22.7041 14.1868Z" fill="#C1CCF5" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.958 17.2439L22.7038 23.9318V20.0479L17.958 17.2439Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.7041 20.0479V23.9322L27.453 17.2439L22.7041 20.0479Z" fill="#C1CCF5" />
    </svg>
  );
};

export default EtheriumIcon;
