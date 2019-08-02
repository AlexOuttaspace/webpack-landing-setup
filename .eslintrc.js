const path = require('path')

module.exports = {
  "globals": {
    "Promise": true,
    "document": true,
    "require": true,
    "Intl": true,
    "Map": true,
    "module": true,
    "process": true,
    "console": true,
    "window": true,
    "setTimeout": true,
    "setInterval": true,
    "clearTimeout": true,
    "clearInterval": true,
    "XMLHttpRequest": true,
    "google": true,
    "grecaptcha": true,
  },
    "env": {
      "jquery": true
    },  
  "extends": [
    "plugin:import/errors", // See https://github.com/benmosher/eslint-plugin-import
    "plugin:import/warnings",
    "prettier", // See https://github.com/prettier/eslint-plugin-prettier
  ],
  "plugins": [
    "prettier",
    "import"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '.')],
      },
    },
  },
  "rules": {
    // general
    "no-console": "warn",
    "no-dupe-keys": "warn",
    "object-shorthand": "warn",
    "no-undef": "warn",
    "no-unused-vars": "warn",
    "no-use-before-define": "warn",

    // import
    "import/order": [
      "error",
      {
        "newlines-between": "always"
      }
    ],
    "import/newline-after-import": "warn",
    "import/no-anonymous-default-export": "warn",
    "import/no-default-export": "error",

    // prettier
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "none",
        "singleQuote": true,
        "semi": false,
        "arrowParens": "always"
      }
    ]
  }
}
