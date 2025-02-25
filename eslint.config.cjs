const js = require("@eslint/js");
const reactRecommended = require("eslint-plugin-react/configs/recommended.js");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: require("eslint-plugin-react"),
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "18.2.0", // Next.js 15 için uyumlu versiyon
      },
    },
    rules: {
      ...reactRecommended.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["**/jest*.config.ts"],
    env: {
      node: true,
    },
  },
];
