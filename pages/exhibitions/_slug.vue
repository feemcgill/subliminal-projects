
<template>
  <div v-if="exhibition">
    <ExhibitionProjectClassic v-bind:content="exhibition"/>
  </div>
</template>
<script>

import gql from 'graphql-tag'
import ExhibitionProjectClassic from '~/components/ExhibitionProjectClassic'

export default {
  components: {
    ExhibitionProjectClassic
  },
  updated() {
  },
  mounted() {
  },   
  apollo: {
      exhibition: {
        error: function(error) {
          console.log(error)
        },
        result({data}) {
          if (data.exhibition.featuredImage) {
            this.$store.commit('setLogoBg', data.exhibition.featuredImage.node.sourceUrl)
          }
        },        
        variables() {
          return {
            uri: 'exhibitions/' + this.$route.params.slug
          }
        },            
        query: gql`
          query PortfolioSingleQuery ($uri: ID!) {
            exhibition(id: $uri, idType: URI) {
              id
              title
              content
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              ExhibitionFields {
                startDate
                endDate
                openingReceptionDate
                openingReceptionTime
                links {
                  link {
                    url
                    title
                    target
                  }
                }                    
                images {
                  caption
                  description(format: RENDERED)
                  altText                  
                  sourceUrl(size: LARGE)
                }      
              }
              artists {
                nodes {
                  ArtistFields {
                    instagramHandle
                    link
                    siteLink
                    hideInArtistList
                  }
                  name
                  slug
                }
              }                
            }
          }          
        `
    }
  }   
}
</script>
