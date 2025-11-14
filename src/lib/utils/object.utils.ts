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

export const deepClone = (obj: any) => {
  if (obj === null) {
    return null;
  }
  const clone = { ...obj };
  Object.keys(clone).forEach((key) => (
    clone[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key]
  ));
  return Array.isArray(obj) && obj.length ?
    (clone.length = obj.length) && Array.from(clone) :
    Array.isArray(obj) ?
      Array.from(obj) :
      clone;
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
