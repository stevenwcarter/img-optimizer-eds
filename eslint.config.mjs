// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.test.js"],
    // ...jest.configs["flat/recommended"],
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  // { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  // { languageOptions: { globals: globals.browser, sourceType: "module" } },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
