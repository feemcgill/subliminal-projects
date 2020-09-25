
<template>
  <div v-if="exhibition" id="page-exhibition">
    <section class="hero">
      <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
      <div class="lockup">
        <div class="lockup-content">
          <h1>{{exhibition.title}}</h1>
          <h2>{{exhibition.ExhibitionSubtitle.subTitle}}</h2>
        </div>
      </div>
    </section>
    <section class="main-content container">
    </section>

    <section class="gallery container">
      <div class="gallery-wrap grid">
        <div class="content" v-html="exhibition.content" />
        <div class="details">
          <ul class="artists" v-if="exhibition.artists" >
            <li v-for="artist in exhibition.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
          </ul>        
          <div v-html="exhibition.ExhibitionFields.startDate" />
          <div v-html="exhibition.ExhibitionFields.endDate" />
          <div v-html="exhibition.ExhibitionFields.openingReceptionDate" />
          <div v-html="exhibition.ExhibitionFields.openingReceptionTime" />        
        </div>        
        <FadeImage v-for="image in exhibition.ExhibitionFields.images" v-bind:key="image.sourceUrl" v-bind:src="image.sourceUrl" />
      </div>
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

<style lang="scss" scoped>
  .hero {
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-bottom: $factor * 2;
    img {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    .lockup {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;   
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      .lockup-content {
        text-align: center;
        background: $light;
        padding: $factor;
      }
    }
  }

  /* .main-content {
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $factor;
    justify-content: space-between;
    .main {
      @include halves;
      width: 80%;
    }
  } */
  .content {
    grid-column-end: span 2;
    grid-row-end: span 2;    
  }
  .details {
    /* @include halves;
    width: 20%; */
    .artists {
      display: block;
      font-size: 0.8em;
      li {
        display: inline-block;
        margin-right: 20px;        
      }
    }        
  }
  .gallery {
    margin-bottom: $factor;
  }
  .gallery-wrap {
    display: grid;
    width: 100%;
    overflow: hidden;
    grid-template-columns: repeat(4, 25fr);
    grid-auto-rows: minmax(min-content, max-content);
    grid-auto-flow: dense;
    gap: $factor * 2;
    img {
      //border: 2px solid red;
    }  
  }
</style>