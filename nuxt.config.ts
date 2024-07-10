// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiUrl: process.env.API_URL
    }
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  ssr: false,
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt']
});
