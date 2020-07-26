// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md
module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier/@typescript-eslint'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-shadow': 'warn',
        'no-unused-vars': 'warn',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/indent': 2,
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/camelcase': 'off',
        // '@typescript-eslint/camelcase': 2,
        '@typescript-eslint/array-type': 1,
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
    },
};
