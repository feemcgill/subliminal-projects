
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  // target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://use.typekit.net/ust4ikr.css' }
      //
    ],
    script: [
      { src: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js`, body: true },
    ],       
  },
  /*
  ** Global CSS
  */
  styleResources: {
    scss: [
      "~/styles/resources/resources.scss",
    ]
  }, 
 css: [
    "~/styles/global.scss"
  ],  
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  pageTransition: {
    name: 'fade',
    // mode: '',
    // beforeEnter (el) {
    //   console.log('Before enter...');
    // }
  }, 
  plugins: [   
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    "@nuxtjs/apollo"
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://subliminalprojects.d-e-v.group/graphql',          
      }
    }
  },
  pwa: {
    icon: {
      /* icon options */
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
