export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Painel Sacramento',
    htmlAttrs: {
      lang: 'pt-BR',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/glitch.scss', '~/assets/css/roboto-slab-font.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/firebase-character-data-converter.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyCTK4TpsLosxYFXngFaNBb4gq_VfJssLuk",
      authDomain: "sacramento-panel.firebaseapp.com",
      databaseURL: "https://sacramento-panel-default-rtdb.firebaseio.com",
      projectId: "sacramento-panel",
      storageBucket: "sacramento-panel.appspot.com",
      messagingSenderId: "965432222096",
      appId: "1:965432222096:web:86a2991697500d0c635315"
    },
    services: {
      auth: true,
      database: true,
      storage: true,
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
