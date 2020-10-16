<template>
  <div v-if="page">
    <section class="current-show container">
      <nuxt-link v-bind:to="'/exhibitions/'+ page.ExhibitionsLandingFields.featuredExhibition[0].slug" class="current-show-wrap">
        <div class="feature-img">
          <FadeImage v-bind:src="page.ExhibitionsLandingFields.featuredExhibition[0].featuredImage.node.sourceUrl" />
        </div>
        <div class="lockup">
          <div class="label">Current Show</div>
        </div>
      </nuxt-link>
      <div class="lockdown">
        <ul class="artists" v-if="page.ExhibitionsLandingFields.featuredExhibition[0].artists && page.ExhibitionsLandingFields.featuredExhibition[0].artists.nodes.length > 3" >
          <li>Group Show</li>
        </ul>
        <ul class="artists" v-else-if="page.ExhibitionsLandingFields.featuredExhibition[0].artists" >
          <li v-for="artist in page.ExhibitionsLandingFields.featuredExhibition[0].artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
        </ul>
        <div class="title" v-html="page.ExhibitionsLandingFields.featuredExhibition[0].title"></div>
        <div class="dates">
          <span v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionFields.startDate" /> — <span v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionFields.endDate" />
        </div>              
      </div>      
    </section>

    <section class="upcoming-shows container">
      <h2 class="upcoming-shows-title">Upcoming Shows</h2>
      <div class="grid">
        <ExhibitionThumb class="show" v-for="feature in page.ExhibitionsLandingFields.upcomingExhibitions" :key="feature.slug" v-bind:exhibition="feature" />
      </div>
    </section>
  </div>
</template>
<script>
import gql from 'graphql-tag';
import FadeImage from '~/components/FadeImage'
import ExhibitionThumb from '~/components/ExhibitionThumb'

export default {
  components: {
    FadeImage,
    ExhibitionThumb
  },
  apollo: {
    page: {
      query: gql`
        query ExhibitionsQuery {
          page(id: "71006", idType: DATABASE_ID) {
            id
            title
            ExhibitionsLandingFields {
              featuredExhibition {
                ... on Exhibition {
                  title
                  slug
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
                  ExhibitionSubtitle {
                    subTitle
                  }
                  ExhibitionFields {
                    groupShow
                    startDate
                    endDate
                  }                  
                  featuredImage {
                    node {
                      sourceUrl(size: MEDIUM)
                    }
                  }
                }
              }
              upcomingExhibitions {
                ... on Exhibition {      
                  title
                  slug
                  artists {
                    nodes {
                      name
                      slug
                    }
                  }                                  
                  ExhibitionSubtitle {
                    subTitle
                  }
                  ExhibitionFields {
                    startDate
                    endDate
                    groupShow
                  }                  
                  featuredImage {
                    node {
                      sourceUrl(size: MEDIUM)
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
  .current-show {
    margin-bottom: $factor * 2;
  }
  .current-show-wrap {
    position: relative;
    margin-bottom: $factor;
    display: block;
    color: $dark; 
    .lockup {
      position: absolute;
      bottom: $factor * 0.5;
      left: $factor * 0.5;
      font-size: 2em;
      transition: all 0.2s ease-in;
      background: $light;
      padding: $factor * 0.25;
      //text-align: center;
      @include breakpoint(small) {
        font-size: 1rem;
      }
    }
    .feature-img {
      padding-bottom: 38%;
      position: relative;
      @include breakpoint(small) {
        padding-bottom: 65vh;
      }      
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }      
    }
  }
  .lockdown {
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
    @include breakpoint(small) {
      display: block;
    }       
    .title,
    .artists {
      &:after {
        content: ' / ';
        margin: 0 $factor * 0.25;
        font-weight: 100;
        @include breakpoint(small) {
          display: none;
        }          
      }
    }
    .artists {
      li {
        display: inline-block;
        &:after {
          content: ',';
          margin-right: 0.5rem;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
      }
    }
  }
  .upcoming-shows {
    .upcoming-shows-title {
      text-align: left;
      font-size: 2em;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: $factor * 0.5;
    }
    .exhibition-thumb {
      @include thirds;
    }
  }  
</style>