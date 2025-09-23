import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  ...compat.plugins("simple-import-sort"),
  {
    "rules": {
      "semi": "error",
      "prefer-const": "error",
      "quotes": ["error", "double"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "always", "propElementValues": "always" }],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0, "maxBOF": 0 }],
      "eol-last": ["error", "always"],
      // "comma-dangle": "error",
    }
  },
  {
    "ignores": [".next/*", "**/next-env.d.ts", "node_modules/*", "**/yarn.lock", "**/package-lock.json", "public/*"],
  }
];

export default eslintConfig;
