
<template>
  <div v-if="project" id="page-exhibition">
    <h1>{{project.title}}</h1>
  </div>
</template>
<script>

import gql from 'graphql-tag'
import FadeImage from '~/components/FadeImage'

export default {
  components: {
    FadeImage
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
        result({data}) {
          if(!data.exhibition){
            this.$nuxt.error({ statusCode: 404 })
          }  
        },        
        variables() {
          return {
            uri: 'Projects/' + this.$route.params.slug
          }
        },            
        query: gql`
          query PortfolioSingleQuery ($uri: ID!) {
            project(id: $uri, idType: URI) {
              id
              slug
              title
              ProjectBuilder {
                fieldGroupName
                project {
                  ... on Project_Projectbuilder_Project_Row {
                    fieldGroupName
                    columns {
                      type
                      imageFit
                      imageCaption
                      content
                      image {
                        altText
                        sourceUrl(size: LARGE)
                        srcSet(size: LARGE)
                      }
                    }
                  }
                }
              }
            }
          }          
        `
    }
  }   
}
</script>  
  
  
