"use client";

import { ComponentProps, CSSProperties, ReactNode } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Virtualizer.module.scss";

export interface VirtualizerProps<T> extends ComponentProps<"div"> {
  data: T[];
  itemMaxSize: number;
  render: (data: T, style: CSSProperties) => ReactNode;
  onBottom?: any;
}

const Virtualizer = <T extends object | string | number | boolean>({
  children, className, data, itemMaxSize, render, onBottom,
  ...props
}: VirtualizerProps<T>) => {
  // approache
  // 1. USE INTERSECTION OBSERVER TO FIX THAT ITEM LEVEL JITTER BY SCROLLING UPTO HOW MUCH OF THE INTERSECTING ELEMENT IS ALREADY SCROLLED OUT OF VIEWPORT
  // 2. USE INTERSECTION OBSERVER ON THE CONTAINER AND OBSERVER ALL ITEMS
  // 2.a. use info like first & last intersecting item
  // 3. add in totalPlacement as item 

  // issues/areas to look
  // 1. as scroll up as new items
  // 2. no jitter in scroll when adding elements on top

  // data present - previous elements already rendered once, so on rendering an element we store the height of that element in a hashmap based on element id

  return (
    <div
      className={classes(styles.wrapper, className)}
    >

    </div>
  );
};

export default Virtualizer;
