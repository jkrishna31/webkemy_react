"use client";

import React, { ComponentProps, useEffect, useRef } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Options.module.scss";

export interface OptionsProps extends ComponentProps<"div"> {
  onCandidateChange?: (eOrIdx: KeyboardEvent | number, group?: string) => void;
}

const Options = ({
  children, className, onCandidateChange,
  ...props
}: OptionsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const optionItem = (e.target as HTMLElement)?.closest("[role='option']");
    if (optionItem) {
      onCandidateChange?.(Array.prototype.indexOf.call(optionItem?.parentNode?.children, optionItem));
    }
  };

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
      ref={ref}
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
