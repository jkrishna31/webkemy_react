export const formatSize = (bytes: number, precision = 2) => {
  if (bytes === 0) return "0 Bytes";

  const base = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const size = bytes / Math.pow(base, i);

  if (precision > 0) {
    const fixedSize = size.toFixed(precision);
    if (parseFloat(fixedSize) === Math.floor(size)) {
      return `${Math.floor(size)} ${sizes[i]}`;
    }
    return `${fixedSize} ${sizes[i]}`;
  }

  return `${size} ${sizes[i]}`;
};
