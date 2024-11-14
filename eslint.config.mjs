// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Custom configs here
).override('nuxt/typescript/rules', {
  rules: {
    // Override TypeScript rules here if needed
    // '@typescript-eslint/ban-types': 'off',
  },
}).override('nuxt/vue/rules', {
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}).override('nuxt/import/rules', {
  rules: {
    'import/order': [
      'error',
      {
        'groups': [
          'builtin', // Node.js built-in modules
          'external', // External modules (e.g., npm packages)
          'internal', // Internal modules (your own modules)
          ['sibling', 'parent'], // Sibling and parent imports
          'index', // Index imports
        ],
        'newlines-between': 'never', // No new lines between groups
        'alphabetize': { order: 'asc', caseInsensitive: true }, // Alphabetical order within groups
      },
    ],
  },
});
