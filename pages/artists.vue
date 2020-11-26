<template>
  <div>
    <section v-if="pageData" class="intro container">
      <div class="img" v-if="pageData.featuredImage">
        <FadeImage v-bind:src="pageData.featuredImage.node.sourceUrl" v-bind:alt="pageData.featuredImage.node.altText" v-bind:srcset="pageData.featuredImage.node.srcSet" />
      </div>
      <div class="content" v-if="pageData.content" v-html="pageData.content" />
    </section>
    <section class="artists-list">
      <div v-if="gotArtists">
        <div class="container">
          <ArtistsStatic />
          <!-- <div class="artists">
            <div  class="artist" v-for="item in filteredArtists" v-bind:key="item.node.slug">
              <h4>{{item.node.name}}</h4>
              <div v-if="item.node.ArtistFields.instagramHandle || item.node.ArtistFields.link" class="links">
                  <a target="_blank" v-if="item.node.ArtistFields.link" v-bind:href="item.node.ArtistFields.link"> 
                    <span v-if="item.node.ArtistFields.linkText" v-html="item.node.ArtistFields.linkText" />
                    <span v-else v-html="item.node.ArtistFields.link">Website </span>
                  </a>
                  <a target="_blank" v-if="item.node.ArtistFields.instagramHandle" v-bind:href="'https://instagram.com/' + item.node.ArtistFields.instagramHandle"> 
                    @{{item.node.ArtistFields.instagramHandle}}
                  </a>                
              </div>
              <div v-else-if="item.node.ArtistFields.siteLink">
                <a target="_blank" v-bind:href="item.node.ArtistFields.siteLink">Website</a>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="loader" v-else>
        <h1>Loading Artists...</h1>
      </div>       
    </section>
  </div>
 
</template>




<script>
import FadeImage from '~/components/FadeImage'
import ArtistsStatic from '~/components/ArtistsStatic'
import gql from 'graphql-tag';
export default {
  components: {
    FadeImage,
    ArtistsStatic
  },
  data: () => {
    return {
      gotArtists: true,
      pageData: null
    }
  },
  methods: {
    loadMore(){
      this.$apollo.queries.artists.fetchMore({
        variables: {
          after: this.artists.pageInfo.endCursor,
          first: 100          
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.artists.edges;
          const pageInfo = fetchMoreResult.artists.pageInfo;          
          return {
            artists: {
              __typename: previousResult.artists.__typename,
              edges: [...previousResult.artists.edges, ...newEdges],
              pageInfo
            }
          }
        }
      })
    }      
  },
  mounted() {
    //this.loadMore();
  },
  updated() {

  },
  beforeDestroy() {
  },
  computed: {
    filteredArtists() {
      const filteredGuys = []
      for (let i = 0; i < this.artists.edges.length; i++) {
        const element = this.artists.edges[i];
        if (!element.node.ArtistFields.hideInArtistList) {
          filteredGuys.push(element)
        } else {
          console.log('not showing', element.node.name);
        }
      }
      return filteredGuys;
    }
  },
  apollo: {
    artists: {
      variables: {
        after: null,
        first: 100
      },      
      result({data}) {
        this.pageData = data.page     
      },
      error: function(error) {
        console.log(error)
      }, 
      query: gql`
        query Artists (
            $first: Int
            $after: String
          ){          
          artists(first: $first, after: $after) {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                name
                slug
                ArtistFields {
                  siteLink
                  instagramHandle
                  link
                  linkText
                  hideInArtistList
                }
              }
            }
          }
          page(id: "67427", idType: DATABASE_ID) {
            id
            title
            content(format: RENDERED)
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                srcSet(size: LARGE)
                altText
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
  .intro {
    .img {
      padding-bottom: 38%;
      position: relative;
      margin-bottom: $factor;
      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .content {
      margin-bottom: $factor * 2;
      font-size: 1.2em;
    }
  }
  .artists-list {
    .loader {
      text-align: center;
      opacity: 0.5;
    }
  }
  .artists {    
    column-count: 4;
    column-gap: $factor;
    margin-bottom: $factor;
    @include breakpoint(small) {
      column-count: 2;
    }
  }
  .artist {
    break-inside: avoid;
    margin-bottom: $factor;
    h4 {
      @include type-regs-plus;
      text-transform: uppercase;
    }
  }
</style>