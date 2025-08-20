const path = require("path");

module.exports = {
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "header/header": [2, path.resolve(__dirname, "./config/header.js")],
  },
};
