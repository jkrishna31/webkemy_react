import React from "react";

import { SVGProps } from "@/lib/types/prop.types";

const SVG = ({
  children, width, height, hidden, style,
  ...restProps
}: SVGProps & { hidden?: boolean }) => {
  return (
    <svg
      width={hidden ? 0 : width}
      height={hidden ? 0 : height}
      style={{ position: hidden ? "absolute" : "static", ...(style ?? {}) }}
      aria-hidden={hidden}
      {...restProps}
    >
      {children}
    </svg>
  );
};

export default SVG;
