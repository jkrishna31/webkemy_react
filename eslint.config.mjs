import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    extends: [prettierConfig],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
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
      // "sort-imports": "error",
      // "comma-dangle": "error",
      // "import/no-cycle": "error",
    }
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**", "**/package-lock.json", "public/*", "out/**", "build/**"
  ]),
]);

export default eslintConfig;
