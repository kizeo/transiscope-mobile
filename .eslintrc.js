module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['react-native', 'react', 'import', 'jsx-a11y'],
  env: {
    jest: true,
    node: true,
    browser: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    semi: ['error', 'never'],
    'global-require': 'warn',
    'react/destructuring-assignment': ['warn', 'always'],
  },
  globals: {
    fetch: false,
  },
}
