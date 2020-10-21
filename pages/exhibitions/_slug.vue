
<template>
  <div v-if="exhibition" id="page-exhibition">
    <section class="hero">
      <div class="container img-intro">
        <div class="image-title">
          <div class="img">
            <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
          </div>
        </div>
        <div class="content">
          <div class="intro">
            <div class="exhibition-title">
              <div class="info">
                <ul v-bind:class="exhibition.artists.nodes.length > 1 ? 'artists list' : 'artists'" v-if="exhibition.artists" >
                  <li v-for="artist in exhibition.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
                </ul>             
                <h1>{{exhibition.title}}</h1>
                <div class="date">
                  <span v-html="exhibition.ExhibitionFields.startDate" /> — <span v-html="exhibition.ExhibitionFields.endDate" />
                </div>
                <div class="opening" v-if="exhibition.ExhibitionFields.openingReceptionDate || exhibition.ExhibitionFields.openingReceptionTime">
                  Opening Reception: <span v-html="exhibition.ExhibitionFields.openingReceptionDate" /> @ <span v-html="exhibition.ExhibitionFields.openingReceptionTime" />
                </div>                
              </div>             
            </div>   
          </div>
          <ul class="links">
            <li v-for="link in exhibition.ExhibitionFields.links" v-bind:key="link.link.url">
              
              <a v-bind:href="link.link.url" v-bind:target="link.link.target" >{{link.link.title}}</a>
            </li>
          </ul>
        </div>
      </div>   
    </section>

    <section class="additonal-content container">
        <div class="content formatted-content" v-html="exhibition.content" />
    </section>

    <section v-if="exhibition.ExhibitionFields.images" class="gallery container">
      <div class="gallery-wrap grid">
        <div class="gallery-item" v-for="image in exhibition.ExhibitionFields.images" v-bind:key="image.sourceUrl" >
          <FadeImage v-bind:src="image.sourceUrl" />
          <div class="caption" v-html="image.caption" />
        </div>
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

<style lang="scss" scoped>
  .hero {
    margin-top: $factor;
    @include breakpoint(small) {
      display: flex;
      flex-direction: column-reverse;
    }    
  }
  .img-intro {
    position: relative;
    width: 100vw;
    margin-bottom: $factor;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .image-title {
      width: 50%;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
      }
      .img {
        position: relative;
        padding-bottom: 65%;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    .content {
      width: calc(50% - 50px);
      @include breakpoint(small) {
        width: 100%;

      }      
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .intro {
        @include breakpoint(small) {
          margin-bottom: $factor;
        }        
      }
      .links {
        font-size: 1.5em;
        text-transform: uppercase;
        font-weight: bold;
        display: block;
        li {
          display: block;
        }
      }
    }
  }

  .exhibition-title {
    margin-bottom: $factor * 3;
    @include breakpoint(small) {
      margin-bottom: $factor;
    }        
    .info {
      font-size: 2em;
      width: 50%;
      @include breakpoint(small) {
        margin-bottom: $factor;
        width: 100%;
      }          
      h1 {
        font-size: 1em;
        font-weight: normal;
        text-transform: unset;
      }
      .artists {
        &.list {
          font-size: 0.5em;
          display: block;
          margin-bottom: 1em;
          li {
            display: inline;
            &:after {
              content: " / ";
              opacity: 0.5;
            }
            &:last-of-type {
              &:after {
                display: none;
              }
            }
          }
        }
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
    @include breakpoint(small) {
      grid-template-columns: repeat(2, 25fr);
      gap: $factor;
    }      
  }
  .additonal-content {
    margin-bottom: $factor;
    .content {
      //width: 75%;
      display: block;
      @include breakpoint(small) {
        width: 100%;
      }      
    }
  }
</style>