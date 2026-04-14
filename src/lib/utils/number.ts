export const isNumber = (value: any) => {
  return typeof value === "number" && !isNaN(value);
};

export const formatNumber = (num: number, precision = 2) => {
  return parseFloat(num.toFixed(precision));
};
