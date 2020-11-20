
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
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  components: {
    ExhibitionProjectClassic,
    PageBuilder
  },
  head () {
    if (this.project && this.project.seo) {
      return {
        title: this.project.seo.title,
        meta: meta(this.project.seo)
      }    
    }
  },  
  mounted() {
  },   
  apollo: {
      project: {
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
              ${metaGql}
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