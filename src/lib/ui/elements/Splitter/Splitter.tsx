"use client";

import { ComponentProps, ReactNode } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Splitter.module.scss";

export interface SplitterProps extends ComponentProps<"div"> {
  layout?: "v" | "h";
  size?: number;
  sections?: ((size: number) => ReactNode)[];
  onSizeChange?: (newSize: number[]) => void;
}

const Splitter = ({
  layout = "h", size = 100, sections, onSizeChange,
  className, children, style,
  ...props
}: SplitterProps) => {
  // const childrenArray = Array.isArray(children) ? children : children != null ? [children] : [];

  // const handleResize = (e: any) => {
  //   // onResize(Number(e.target.value));
  //   onSizeChange?.([]);
  // };

  return (
    <div
      data-splitter
      data-layout={layout}
      className={classes(styles.splitter, className)}
      style={{
        flex: size / 100,
        ...style,
      }}
      {...props}
    >
      {/* {sections?.map((section) => {
        return (
          <>
            {section}
            <SplitHandle layout={layout} onChange={handleResize} />
          </>
        );
      })} */}
      {/* {
        childrenArray.map((section, idx) => {
          return (
            <>
              {section()}
              {idx !== childrenArray.length - 1 && (
                <SplitHandle layout={layout} onChange={handleResize} />
              )}
            </>
          );
        })
      } */}
      {children}
    </div>
  );
};

export default Splitter;
