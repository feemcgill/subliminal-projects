<template>
  <div v-if="page">
    <section class="current-show container">
      <div class="feature-img">
        <FadeImage v-bind:src="page.ExhibitionsLandingFields.featuredExhibition[0].featuredImage.node.sourceUrl" />
      </div>
      <h1 v-html="page.ExhibitionsLandingFields.featuredExhibition[0].title"></h1>
      <h2 v-if="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionSubtitle" v-html="page.ExhibitionsLandingFields.featuredExhibition[0].ExhibitionSubtitle.subTitle"></h2>
    </section>
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
                  ExhibitionSubtitle {
                    subTitle
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
    .feature-img {
      padding: $factor 0;
      img {
        width: 100%;
        height: 75vh;
        object-fit: cover;
        border: 2px solid $dark;
      }
    }
  }
</style>