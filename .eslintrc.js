module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'babel'
  ],
  rules: {
    "react/jsx-fragments": [0, "element"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "babel/semi": 1,
    "jsx-a11y/label-has-associated-control": [ 2, {
      "controlComponents": ["FormControl"],
      "depth": 3,
    }],
    "template-curly-spacing" : "off",
    // fix for linting errors with string templates
    "indent": ["error", 2, {
      "ignoredNodes": ["TemplateLiteral"]
    }],
  },
};
