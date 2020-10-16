
<template>
  <div v-if="project" id="page-project" class="container">
    <div v-for="(row, index) in project.ProjectBuilder.project" v-bind:key="index" v-bind:class="'project-row cols-' + row.columns.length">

      <div v-for="(column, colindex) in row.columns" v-bind:key="colindex" v-bind:class="'project-col '+ column.type+ ' '+column.verticalAlign">
      
        <div v-if="column.type == 'image'" v-bind:class="'image-wrap ' + column.imageFit">
          <FadeImage :src="column.image.sourceUrl" :srcset="column.image.srcSet" :alt="column.image.altText" :width="column.image.mediaDetails.width" :height="column.image.mediaDetails.height" />
          <div v-if="column.imageCaption"  class="caption" v-html="column.imageCaption"></div>
        </div>
      
        <div v-if="column.type == 'content'">
          <div class="formatted-content" v-html="column.content"></div>
        </div>

        <div v-if="column.type == 'empty'" />
      
      </div>

    </div>
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
          if(!data.project){
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
            }
          }          
        `
    }
  }   
}
</script>  


<style lang="scss" scoped>
  #page-project {
    margin-bottom: 2vw;
  }
  .project-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &.cols-1 {
      .project-col {
        width: 100%;
      }
    }
    &.cols-2 {
      .project-col {
        width: 50%;
        @include breakpoint(small) {
          width: 100%;
        }        
      }
    }
    &.cols-3 {
      .project-col {
        width: 33.3333334%;
        @include breakpoint(small) {
          width: 100%;
        }        
      }
    }
    &.cols-4 {
      .project-col {
        width: 25%;
        @include breakpoint(small) {
          width: 100%;
        }        
      }
    }
    .project-col {
      position: relative;

      &.top {
        align-self: flex-start;
      }
      &.bottom {
        align-self: flex-end;
      }
      &.content {
        padding: 2vw;
      }
      &.image {
        img {
          width: 100%;
          height: auto;
          display: block;
        }
        .bleed {
          img {
            //height: 100%;
          }
        }
        .contain {
          padding: 2vw;
        } 
        .caption {
          position: absolute;
          bottom: 1em;
          left: 1em;
          z-index: 100;
          background-color: $light;
          padding: 0.25em 0.5em;
          max-width: 300px;
        }     
      }
    }           
  }
</style>
