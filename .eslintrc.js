const path = require("path");
const getHeaderPath = require("./packages/common/config/eslint.helpers.js");

module.exports = {
  root: true,
  ignorePatterns: [".eslintrc.js", "react-app-env.d.ts"],
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: [
    "prettier",
    "@typescript-eslint/eslint-plugin",
    "header",
    "unused-imports",
    "import",
    "react",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prettier/prettier": ["error"],
    "header/header": [2, getHeaderPath()],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // Warn rules is a temporary solution to show what should be refactored instead of throw errors. Please avoid adding new rules

    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/order": [
      1,
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "@xala/**",
            group: "external",
          },
        ],
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
  },
};
