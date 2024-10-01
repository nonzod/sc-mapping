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
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@zadigetvoltaire/nuxt-gtm', '@nuxt/image', '@vee-validate/nuxt', 'nuxt-file-storage', 'nuxt-auth-utils', 'nuxt-nodemailer', '@nuxtjs/turnstile', '@nuxtjs/seo'],
  site: {
    url: process.env.DOMAIN,
    name: 'SC Mappigs Tool',
    description: 'Tool for creating layout visualizations',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
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
  },
  gtm: {
    id: process.env.GTM, // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    nonce: '13121312', // Will add `nonce` to the script tag
    enabled: process.env.NODE_ENV === 'production', // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
    ignoredViews: [''], // Don't trigger events for specified router names (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
    devtools: true, // (optional)
  },
  nodemailer: {
    from: '',
    host: '',
    port: 25,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  },
  turnstile: { // Sistituite dalle var di ambiente
    secretKey: '',
    siteKey: ''
  },
  runtimeConfig: {
    turnstile: {
      secretKey: '',
    }
  }
})