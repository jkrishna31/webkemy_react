// make only selected fields required from an interface
export type RequireOnly<T, K extends keyof T> =
  Required<Pick<T, K>> & Partial<Omit<T, K>>;

// enforce atleast one is present
export type AtLeastOne<T, Keys extends keyof T = keyof T> =
  Partial<T> & { [K in Keys]: Required<Pick<T, K>> }[Keys];
