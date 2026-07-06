/** @type {import('lint-staged').Config} */
module.exports = {
  '**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{js,mjs,cjs}': ['prettier --write'],
  '**/*.{json,css}': ['prettier --write'],
};
