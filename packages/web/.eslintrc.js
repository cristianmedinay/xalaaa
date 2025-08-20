const path = require("path");

module.exports = {
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
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
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/prop-types": "off",

    // Warn rules is a temporary solution to show what should be refactored instead of throw errors. Please avoid adding new rules

    "react/no-deprecated": "warn",
  },
};
