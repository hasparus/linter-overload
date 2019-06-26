# Description

There are so many JavaScript linters out there.
Which one should we use?
How do I configure ESLint for TypeScript?
Won't linter slow me down?
Why are these rules so annoying?
What the heck is Wotan?
How do I create a linter config package for my team?
There are so many questions and even more opinions.
Let's argue about them loudly while drinking beer.

Agenda:
  - How to avoid "Best Practices" and become friends with your linter.  
  - Can I already ditch TSLint for ESLint. Does it hurt?
  - How to add `typescript-eslint` rules to your JS eslint config.
  - What the heck is Wotan?

# Notes:

# What is a linter anyway?

> Lint, or a linter, is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs. The term originates from a Unix utility that examined C language source code.

## How to avoid "Best Practices" and become friends with your linter.

// I'm not really sure if it's anything left to talk after Dan Abramov tweeted and blogged about it.

Just get rid of the rules that don't help you.
What should I keep?

- Rules that help me catch bugs -- sonarjs / sonarts and the like.
- Rules that improve your product and help you avoid being a bad person like `eslint-plugin-jsx-a11y`.
  That's it. Get rid of formatting rules. Fixing formatting because linter tells you to sucks ass. Just use Prettier. Even if you hate how your code looks like after being formatted by Prettier, you can get used to it and you're not getting paid to format code, you're getting paid for being productive and shipping features.

## Can I already ditch TSLint for ESLint. Does it hurt?

## How to add `typescript-eslint` rules to your JS eslint config.

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

## What the heck is Wotan?

Wotan is still pretty new. It's interesting because it supports TSLint rules.

# TODO:

- Pipe your old tslint config through Wotan
