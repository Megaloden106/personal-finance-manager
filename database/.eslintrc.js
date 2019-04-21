module.exports = {
  extends: "airbnb",
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
};