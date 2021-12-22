module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: [
  ],
  ignorePatterns: ['**/*.js', '**/codec/**/*.*'],
  rules: {
    "unicorn/prevent-abbreviations": [
      "off",
    ],
    'unicorn/empty-brace-spaces': [
      'off',
    ],
    'unicorn/no-array-for-each': [
      'off',
    ],
    'unicorn/prefer-node-protocol': [
      'off',
    ],
  },
};
