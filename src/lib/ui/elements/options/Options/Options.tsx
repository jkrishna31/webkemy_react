"use client";

import React, { ComponentProps, useEffect, useRef } from "react";

import { useThrottledCallback } from "@/lib/hooks";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Options.module.scss";

export interface OptionsProps extends ComponentProps<"div"> {
  onCandidateChange?: (eOrIdx: KeyboardEvent | number, group?: string) => void;
}

const Options = ({
  children, className, onCandidateChange, ref,
  ...props
}: OptionsProps) => {
  const _ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useThrottledCallback((e: React.MouseEvent) => {
    const optionItem = (e.target as HTMLElement)?.closest("[role='option']");
    if (optionItem) {
      onCandidateChange?.(Array.prototype.indexOf.call(optionItem?.parentNode?.children, optionItem));
    }
  }, 100);

  // useImperativeHandle(ref, () => _ref.current!);

  useEffect(() => {
    if (onCandidateChange) {
      const handleKeyDown = (e: KeyboardEvent) => {
        onCandidateChange?.(e);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [onCandidateChange]);

  return (
    <div
      ref={mergeRefs(_ref, ref)}
      className={classes(styles.wrapper)}
      onMouseMove={handleMouseMove}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
};

export default Options;
