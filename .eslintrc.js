module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'prefer-const': 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'class-methods-use-this': 0,
    'no-promise-executor-return': 0,
  },
};
