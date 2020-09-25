<template>
  <div v-if="page">
    <section class="current-show container">
      <div class="current-show-wrap">
        <div class="feature-img">
          <FadeImage v-bind:src="page.ExhibitionsLandingFields.featuredExhibition[0].featuredImage.node.sourceUrl" />
        </div>
        <div class="lockup">
          <div class="label">Current Exhibition</div>
          <h1 v-html="page.ExhibitionsLandingFields.featuredExhibition[0].title"></h1>
          <h2 v-if="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionSubtitle" v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionSubtitle.subTitle"></h2>
          <ul class="artists" v-if="page.ExhibitionsLandingFields.featuredExhibition[0].artists" >
            <li v-for="artist in page.ExhibitionsLandingFields.featuredExhibition[0].artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
          </ul>
          <div class="dates">
            <span v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionFields.startDate" /> — <span v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionFields.endDate" />
          </div>      
        </div>
      </div>
    </section>
    <div class="section-title">
      <h2>Upcoming</h2>
    </div>
    <section class="upcoming-shows container grid">
      <ExhibitionThumb v-for="feature in page.ExhibitionsLandingFields.upcomingExhibitions" :key="feature.slug" v-bind:exhibition="feature" />
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
    padding-top: $factor * 2;
  }
  .current-show-wrap {
    position: relative;
    border: 2px solid $dark;
    .lockup {
      position: absolute;
      bottom: $factor;
      left: $factor;
      font-size: 2em;
      transition: all 0.2s ease-in;
      background: $light;
      padding: $factor * 0.5;
      //text-align: center;
      margin: $factor;      
    }
    .feature-img {
      img {
        display: block;
        width: 100%;
        height: 75vh;
        object-fit: cover;
      }
    }
  }
</style>