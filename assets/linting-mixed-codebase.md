# How to add `typescript-eslint` rules to your JS eslint config.

This was pretty fun recently.
If you're using ESLint 5, I highly recommend an upgrade

```js
module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  plugins: ["sonarjs"],
  extends: ["airbnb", "plugin:sonarjs/recommended"],
  parser: "babel-eslint",
  rules: {
    /* ... */
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        paths: ["src"],
      },
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      // overrides.extends is not supported 🤦‍
      ...makeTsEslintConfig(),
    },
  ],
};

function makeTsEslintConfig() {
  const recommended = require("@typescript-eslint/eslint-plugin").configs
    .recommended;

  return {
    ...recommended,
    rules: {
      ...recommended.rules,
      /**
       * overrides
       */
      "object-curly-newline": 0,
      // tsx
      "react/jsx-filename-extension": false,
      "react/prop-types": false,
      // union types
      "react/destructuring-assignment": false,
      "@typescript-eslint/no-non-null-assertion": false,
    },
  };
}
```

with ESLint 6.0 it becomes pretty boring.

```js
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
            ],
        },
    ],
```

### What else do we have to do?

#### Add TS extensions to import/resolver settings if you're using eslint-plugin-import

```js
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
                paths: ['src'],
            },
        },
    },
```

#### Configure your text editor to run ESLint on TS files

```js
{
  "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ]
}
```
