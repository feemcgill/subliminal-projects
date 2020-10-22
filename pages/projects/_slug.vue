
<template>
  <div v-if="project">
    <PageBuilder v-if="project.ProjectBuilder.project.length" v-bind:content="project"/>
    <ExhibitionProjectClassic v-else v-bind:content="project"/>
  </div>
</template>
<script>

import gql from 'graphql-tag'
import ExhibitionProjectClassic from '~/components/ExhibitionProjectClassic'
import PageBuilder from '~/components/PageBuilder'

export default {
  components: {
    ExhibitionProjectClassic,
    PageBuilder
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
              ProjectBuilder {
                project {
                  ... on Project_Projectbuilder_Project_Row {
                    fieldGroupName
                    columns {
                      type
                      imageFit
                      imageCaption
                      content
                      verticalAlign
                      image {
                        altText
                        sourceUrl(size: LARGE)
                        srcSet(size: LARGE)
                        mediaDetails {
                          width
                          height
                        }                        
                      }
                    }
                  }
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