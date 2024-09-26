// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  css: ['~/public/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-file-storage',
    'nuxt-auth-utils'
  ],
  tailwindcss: {
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  googleFonts: {
    prefetch: true,
    preload: true,
    families: {
      Roboto: true
    }
  },
  fileStorage: {
    mount: process.env.PATH_XML,
  },
  veeValidate: {
    autoImports: true
  }
})