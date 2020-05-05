const path = require('path');

const tsconfig = path.resolve(__dirname, 'tsconfig.json');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: tsconfig,
    tsconfigRootDir: "."
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
    "class-methods-use-this": ["warn"],
    "no-param-reassign": ["error", { "props": false }],

    // TS RULES
    "@typescript-eslint/indent": ["error", 2],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["./src", "./src/style"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
};