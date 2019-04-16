const path = require('path');

const config = path.resolve(__dirname, 'webpack.config.js');

module.exports = {
  extends: "airbnb",
  plugins: ["react-hooks"],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
        "some": [ "nesting", "id" ],
      },
      "allowChildren": false,
    }],
    "react-hooks/rules-of-hooks": "error",
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
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