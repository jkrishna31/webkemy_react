export const getQueryFromObj = (
  obj: Record<
    string,
    string | number | boolean | null | undefined | (string | number | boolean)[]
  >
) => {
  // const urlSearchParams = new URLSearchParams(obj);
  // urlSearchParams.toString();
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Must be an object.");
  }
  const queryStr = Object.entries(obj)
    .filter(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return true;
    })
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        return val
          .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`)
          .join("&");
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`;
      }
    })
    .join("&");
  return queryStr ? queryStr : "";
};
