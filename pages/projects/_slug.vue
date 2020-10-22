
<template>
  <div v-if="project">
    <ExhibitionProjectClassic v-bind:content="project"/>
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
      project: {
        error: function(error) {
          console.log(error)
        },
        result(data) {
          console.log(data, 'GOT YR DATA HERE')
        },        
        variables() {
          return {
            uri: 'projects/' + this.$route.params.slug
          }
        },            
        query: gql`
          query PortfolioSingleQuery ($uri: ID!) {
            project(id: $uri, idType: URI) {
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
            }
          }          
        `
    }
  }   
}
</script> 