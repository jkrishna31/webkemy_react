export const mod10Checksum = (num: number) => {
  let index = 0;
  let _num = num;
  let sum = 0;
  while (_num > 0) {
    const digit = _num % 10;
    sum += index % 2 === 0 ? digit : digit * 2;
    _num = Math.floor(_num / 10);
    ++index;
  }
  return sum % 10 === 0;
};
