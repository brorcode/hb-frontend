// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/test-utils/module'],

  ssr: false,

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiUrl: process.env.API_URL,
      homeUrl: '/dashboard',
      loginUrl: '/login',
      perPage: 50,
      apiRegisterUrl: 'api/v1/register',
      apiForgotPasswordUrl: 'api/v1/forgot-password',
      apiNewPasswordUrl: 'api/v1/forgot-password',
      apiSendEmailToVerifyEmailUrl: 'api/v1/profile/email/verification',
      apiLoginUrl: 'api/v1/login',
      apiLogoutUrl: 'api/v1/logout',
    },
  },
  compatibilityDate: '2024-08-09',

  typescript: {
    typeCheck: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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
});
