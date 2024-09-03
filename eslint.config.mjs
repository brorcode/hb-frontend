// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Custom configs here
).override('nuxt/typescript/rules', {
  rules: {
    // ...Override rules, for example:
    // '@typescript-eslint/ban-types': 'off',
  },
}).override('nuxt/vue/rules', {
  rules: {
    'vue/multi-word-component-names': 'off',
  },
});
