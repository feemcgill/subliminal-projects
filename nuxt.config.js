const { createApolloFetch } = require('apollo-fetch')


export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  //mode: process.env.NUXT_MODE,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey' },
      { hid: 'og:description', name: 'og:description', content: 'Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey' }
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
    { src: '~/plugins/vue-touch', ssr: false }
  ],
  generate: {
    // routes: function () {
    //   const uri = process.env.WP_GRAPHQL_ENDPOINT
    //   const apolloFetch = createApolloFetch({ uri })
    //   const query = `
    //     query GenerateQuery {
    //       exhibitions(first: 500) {
    //         edges {
    //           node {
    //             slug
    //           }
    //         }
    //       }
    //     }       
    //   `
    //   return apolloFetch({ query }).then(result => {
    //     const { data } = result
    //     console.log('Got data for dynamic routes', data.exhibitions.edges[0])
    //     return data.exhibitions.edges.map(exhibition => `/exhibitions/${exhibition.node.slug}`)
    //   }).catch(error => {
    //     console.log('THERE WAS AN ERRRRRORRR')
    //     console.log(error)
    //   })
    // }
  }, 
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics'
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
        httpEndpoint: process.env.WP_GRAPHQL_ENDPOINT,          
      }
    }
  },
  googleAnalytics: {
    id: 'UA-75388-5'
  },  
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  // server: {     
  //   port: 8000, // default: 3000     
  //   host: '0.0.0.0', // default: localhost   
  // },  
}
