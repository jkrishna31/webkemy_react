import { customAlphabet, nanoid, urlAlphabet } from "nanoid";

export const getUniqueId = (size: number = 6, charSet?: string) => {
  if (charSet) {
    const generator = customAlphabet(charSet, size);
    return generator();
  }
  return nanoid(size);
};
