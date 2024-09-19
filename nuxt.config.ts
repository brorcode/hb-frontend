// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiUrl: process.env.API_URL,
      homeUrl: '/users',
      loginUrl: '/login',
      perPage: 10,
      apiRegisterUrl: 'api/v1/register',
      apiVerifyEmailUrl: 'api/v1/profile/email/verification',
      apiLoginUrl: 'api/v1/login',
      apiLogoutUrl: 'api/v1/logout',
    },
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
      },
    },
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/test-utils/module'],
  compatibilityDate: '2024-08-09',
});
