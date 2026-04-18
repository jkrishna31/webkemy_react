import { isValidDateString } from "@/lib/utils/datetime";

export const isObject = (obj: object) => {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};

export const deepFlatten = (arr: any[]): any[] => {
  if (typeof Array.prototype.flat !== "undefined") {
    return arr.flat(Infinity);
  }
  return [].concat(
    ...arr.map((v: any) => (Array.isArray(v) ? deepFlatten(v) : v))
  );
};

export const deepClone = <T>(obj: T, seen = new WeakMap()): T => {
  // todo: argument to determine whether to update a particular field of not (will receive key/value and the path to it)
  // todo: can also return some value to update for example while cloning need to handle id field separately

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (seen.has(obj as any)) {
    return seen.get(obj as any);
  }

  if (Array.isArray(obj)) {
    const arr: any[] = [];
    seen.set(obj as any, arr);
    for (const item of obj) {
      arr.push(deepClone(item, seen));
    }
    return arr as T;
  }

  const clone: any = {};
  seen.set(obj as any, clone);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone((obj as any)[key], seen);
    }
  }

  return clone;
};

export const deepFreeze = <T extends object>(obj: T) => {
  // Object.keys(obj).forEach((prop) => {
  //     if (
  //         typeof obj[prop as keyof T] === "object" && !Object.isFrozen(obj[prop as keyof T])
  //     ) {
  //         deepFreeze(obj[prop as keyof T]);
  //     }
  // });
  return Object.freeze(obj);
};

export const flatten = (arr: any[], depth = 1): any[] => {
  if (typeof Array.prototype.flat !== "undefined") {
    return arr.flat(depth);
  }
  return arr.reduce(
    (a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []
  );
};

export const flattenObject = (obj: any, prefix = "") => {
  Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? prefix + "." : "";
    if (typeof obj[k] === "object") {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

export const deepEqual = (a: any, b: any): boolean => {
  if (typeof a !== typeof b) return false;

  if (typeof a === "object") {
    if ((Array.isArray(a) && !Array.isArray(b)) || (!Array.isArray(a) && Array.isArray(b))) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, idx) => {
        return deepEqual(item, b[idx]);
      });
    }

    if ((a === null || b === null) && a !== b) return false;
    if (a === null && b === null) return true;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    if (!aKeys.every(item => bKeys.includes(item))) return false;

    return aKeys.every(item => deepEqual(a[item], b[item]));
  }

  if (a !== b) return false;

  return true;
};

export const orderBy = () => {

};

export const defaultComparator = <T extends Record<string, any>>(key: keyof T, desc?: boolean) => {
  return (a: T, b: T): number => {
    const aVal = a[key];
    const bVal = b[key];

    const res =
      aVal == null && bVal == null ? 0 :
        aVal == null ? 1 :
          bVal == null ? -1 :
            typeof aVal === "number" && typeof bVal === "number"
              ? aVal - bVal
              : (isValidDateString(aVal) && isValidDateString(bVal))
                ? Date.parse(aVal) - Date.parse(bVal) /* new Date(aVal).getTime() - new Date(bVal).getTime() */
                : String(aVal).localeCompare(String(bVal));

    return desc ? -res : res;
  };
};

export const deepSort = <T extends Record<string, any>>(
  array: T[],
  sortKey: keyof T,
  desc?: boolean,
  compareFn = defaultComparator<T>(sortKey, desc)
): T[] => {
  if (!Array.isArray(array)) return array;

  const sorted = [...array].sort(compareFn);

  return sorted.map(item => ({
    ...item,
    children: item.children ? deepSort(item.children, sortKey, desc, compareFn) : item.children,
  }));
};
