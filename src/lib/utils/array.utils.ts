export const shuffleList = <T>(list: T[]) => {
  let m = list.length, t, i;

  // While there remain elements to shuffle...
  while (m) {

    // Pick a remaining element...
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = list[m];
    list[m] = list[i];
    list[i] = t;
  }

  return list;
};

export const findRecursive = <T>(
  value: string,
  data: T[],
  options?: {
    comparatorKey: keyof T; childrenKey: keyof T
  }): T | undefined => {
  const { comparatorKey = "id" as keyof T, childrenKey = "children" as keyof T } = options ?? {};

  if (!data?.length) return;

  for (let i = 0; i < data.length; i++) {
    if (data[i][comparatorKey] === value) {
      return data[i];
    } else {
      const _data = findRecursive<T>(value, data[i][childrenKey] as T[], { comparatorKey, childrenKey });
      if (_data) {
        return _data;
      }
    }
  }
};

export const mapRecursive = <T>(
  data: T[],
  cb: (item: T, parent?: string[]) => T,
  options?: {
    childrenKey: keyof T;
  }) => {
  const { childrenKey = "children" } = options ?? {};

  // const _data = [];
  // for (let i = 0; i < data.length; i++) {
  //   const _item = cb(data[i]);
  //   const children = data[i][childrenKey as keyof T] as T[];
  //   if (children?.length) {
  //     const _dataFromChildren = mapRecursive(children, cb, options);
  //   }
  // }
  // return _data;
};

export const filterRecursive = <T>(data: T[],) => {

};
