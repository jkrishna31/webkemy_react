import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ClassType = string | number | null | undefined | object;
const SEPARATOR = " ";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringifyItem(item: any) {
  if (typeof item === "object" && Array.isArray(item)) {
    let serialized = "";
    for (let i = 0; i < item.length; i++) {
      const stringifiedItem = stringifyItem(item[i]);
      if (stringifiedItem) {
        serialized += (serialized && SEPARATOR) + stringifiedItem;
      }
    }
    return serialized;
  }
  if (typeof item === "object") {
    let serialized = "";
    for (const key in item) {
      const stringifiedItem = stringifyItem(item[key]);
      if (stringifiedItem) {
        serialized += (serialized && SEPARATOR) + key;
      }
    }
    return serialized;
  }
  return item;
}

export function classes(...items: ClassType[]) {
  let stringified = "";
  for (let i = 0; i < items.length; i++) {
    const stringifiedItem = stringifyItem(items[i]);
    if (stringifiedItem) {
      stringified += (stringified && SEPARATOR) + stringifiedItem;
    }
  }
  return stringified;
}
