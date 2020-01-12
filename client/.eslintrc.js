const path = require('path');

const config = path.resolve(__dirname, 'webpack.config.js');
const tsconfig = path.resolve(__dirname, 'tsconfig.json');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: tsconfig,
    tsconfigRootDir: "."
  },
  plugins: [
    "react-hooks",
    "@typescript-eslint",
  ],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    "no-nested-ternary": "off",
    "no-confusing-arrow": ["error", {"allowParens": true}],
    "import/prefer-default-export": "off",

    // TS RULES
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": "off", // annoying to force return type with react
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "@typescript-eslint/interface-name-prefix": 'off',

    // REACT RULES
    "react/jsx-filename-extension": ["warn", {
      "extensions": [".jsx", ".tsx"]
    }],
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
        "some": [ "nesting", "id" ],
      },
      "allowChildren": false,
    }],
  },
  settings: {
    "import/resolver": {
      webpack: { config },
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
};