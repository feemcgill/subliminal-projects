
<template>
  <div v-if="draft">
    <PageBuilder v-if="draft.ProjectBuilder.project.length" v-bind:content="draft"/>
    <ExhibitionProjectClassic v-else v-bind:content="draft"/>
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
  mounted() {
  },   
  apollo: {
      draft: {
        error: function(error) {
          console.log(error)
        },
        result(data) {
        },        
        variables() {
          return {
            uri: 'drafts/' + this.$route.params.slug
          }
        },            
        query: gql`
          query PortfolioSingleQuery ($uri: ID!) {
            draft(id: $uri, idType: URI) {
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
                  ... on Draft_Projectbuilder_Project_Row {
                    fieldGroupName
                    columns {
                      type
                      imageFit
                      imageCaption
                      content
                      verticalAlign
                      imageLink {
                        url
                        title
                        target
                      }  
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
                  sourceUrl(size: MEDIUM)
                  mediaDetails {
                    sizes {
                      sourceUrl
                      name
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