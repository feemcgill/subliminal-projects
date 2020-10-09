<template>
  <div v-if="page">
    <section class="current-show container">
      <div class="current-show-wrap">
        <div class="feature-img">
          <FadeImage v-bind:src="page.ExhibitionsLandingFields.featuredExhibition[0].featuredImage.node.sourceUrl" />
        </div>
        <div class="lockup">
          <div class="label">Current Exhibition</div>
        </div>
      </div>
      <div class="lockdown">
        <ul class="artists" v-if="page.ExhibitionsLandingFields.featuredExhibition[0].artists && page.ExhibitionsLandingFields.featuredExhibition[0].artists.nodes.length > 3" >
          <li>Group Show</li>
        </ul>
        <ul class="artists" v-else-if="page.ExhibitionsLandingFields.featuredExhibition[0].artists" >
          <li v-for="artist in page.ExhibitionsLandingFields.featuredExhibition[0].artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
        </ul>
        <h1 v-html="page.ExhibitionsLandingFields.featuredExhibition[0].title"></h1>
        <div class="dates">
          <span v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionFields.startDate" /> — <span v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionFields.endDate" />
        </div>              
      </div>      
    </section>
    <div class="section-title">
      <h2>Upcoming Shows</h2>
    </div>
    <section class="upcoming-shows container grid">
      <ExhibitionThumb class="show" v-for="feature in page.ExhibitionsLandingFields.upcomingExhibitions" :key="feature.slug" v-bind:exhibition="feature" />
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
    padding-top: $factor * 2;
  }
  .current-show-wrap {
    position: relative;
    margin-bottom: $factor;
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
      padding-bottom: 38%;
      position: relative;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }      
    }
  }
  .upcoming-shows {
    .exhibition-thumb {
      @include thirds;
    }
  }  
</style>