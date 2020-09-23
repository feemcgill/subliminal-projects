
<template>
  <div v-if="exhibition" id="page-exhibition">
    <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
    <h1>{{exhibition.title}}</h1>
    <div v-html="exhibition.content" />
    <div v-html="exhibition.ExhibitionFields.startDate" />
    <div v-html="exhibition.ExhibitionFields.endDate" />
    <div v-html="exhibition.ExhibitionFields.openingReceptionDate" />
    <div v-html="exhibition.ExhibitionFields.openingReceptionTime" />
    <section class="gallery">
        <FadeImage v-for="image in exhibition.ExhibitionFields.images" v-bind:key="image.sourceUrl" v-bind:src="image.sourceUrl" />
    </section>
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
      exhibition: {
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
            uri: 'exhibitions/' + this.$route.params.slug
          }
        },            
        query: gql`
          query PortfolioSingleQuery ($uri: ID!) {
            exhibition(id: $uri, idType: URI) {
              id
              title
              content
              ExhibitionSubtitle {
                subTitle
              }
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
                flyer {
                  sourceUrl
                }
                images {
                  altText
                  sourceUrl(size: LARGE)
                }
          
                priceSheet {
                  sourceUrl(size: LARGE)
                }
                pageThumbnail {
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