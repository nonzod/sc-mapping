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
    'nuxt-auth-utils',
    'nuxt-gtag'
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
  gtag: {
    // ID preso del .env
    id: "G-GKR6BBPY55",
    enabled: true,
    config: {
      page_title: 'Star Citizen device mapping tool'
    },
    initCommands: [
      // Setup up consent mode
      ['consent', 'default', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
        wait_for_update: 500,
      }]
    ]
  },
  fileStorage: {
    mount: process.env.PATH_XML,
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
  }
})