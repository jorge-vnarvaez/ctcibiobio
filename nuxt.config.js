import colors from 'vuetify/es5/util/colors'

const appEnv = process.env.NODE_ENV || 'development';
//
export default {
  publicRuntimeConfig: {
    apiUrlV2: appEnv === 'development'
    ? 'https://apificr.uinn.cl'
    : 'https://apificr.uinn.cl',
    apiAssetsV2: appEnv === 'development'
    ? 'https://apificr.uinn.cl/assets/'
    : 'https://apificr.uinn.cl/assets/',
    apiUrl:
      appEnv === 'development'
        ? 'http://localhost:1339'
        : 'https://my-domain.com'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - CTCI Biobío',
    title: 'Estrategia CTCI Biobío',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap' }
    ]
  },
  // 
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/vuetify_blocks.scss',
    '@mdi/font/css/materialdesignicons.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugin/objectToQueryString.js'},
    { src: '~/plugin/fontawesome.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // '@nuxtjs/fontawesome',
    // '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    '@nuxtjs/moment',
  ],
  moment: {
    defaultLocale: 'es',
    locales: ['es'],
    defaultTimezone: 'America/Santiago'
  },
  // fontawesome: {
  //   icons: {
  //     brands: true,
  //     solid: true,
  //   }
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/http',
    'cookie-universal-nuxt',
    // '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    retry: { retries: 1 }
  },
  proxy: {
    // Simple proxy
    "/api/": {
      target: "https://apificr.uinn.cl",
      pathRewrite: { "^/api/": "" }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss', '~/assets/theme_fonts.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
