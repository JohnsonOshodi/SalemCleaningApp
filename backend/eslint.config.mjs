import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha, 
        expect: 'readonly',
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
];
