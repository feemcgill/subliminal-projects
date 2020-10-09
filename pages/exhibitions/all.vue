<template>
    <div class="all-exhibitions" v-if="exhibitions">
      <!-- <div class="page-title">
        <h1>All Exhibitions</h1>
      </div> -->
      <div class="container grid">
        <ExhibitionThumb class="past-exhibition" v-for="item in exhibitions.edges" v-bind:key="item.node.slug" v-bind:exhibition="item.node" />
      </div>
      <div class="pagination">
        <div v-if="exhibitions.pageInfo.hasNextPage" class="load-more">
          <div v-if="$apollo.loading" class="loading">Loading...</div>
          <div v-else @click="loadMore()" class="primary-button">Load More</div>
        </div>    
        <div v-else class="all-loaded">
          <div v-if="exhibitions.edges.length == 0" class="none-found">Sorry, we couldn't find any articles matching this criteria.</div>
          <div v-else>All {{exhibitions.edges.length}} exhibitions loaded</div>
        </div>
      </div>
    </div>  
</template>
<script>
import gql from 'graphql-tag'
import ExhibitionThumb from  '~/components/ExhibitionThumb'
const exhibitions_per_load = 18

export default {
  components: {
    ExhibitionThumb
  },
  data() {
    return {
      foundPosts: null,
      queryCursor: null,
      displayedPosts: []
    };
  },  
  mounted() {
    //this.$store.commit('setNavColor', 'black')
  },
  methods: {
    loadMore(){
      this.$apollo.queries.exhibitions.fetchMore({
        variables: {
          after: this.exhibitions.pageInfo.endCursor,
          first: exhibitions_per_load         
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.exhibitions.edges;
          const pageInfo = fetchMoreResult.exhibitions.pageInfo;          
          return {
            exhibitions: {
              __typename: previousResult.exhibitions.__typename,
              edges: [...previousResult.exhibitions.edges, ...newEdges],
              pageInfo
            }
          }
        }
      })
    }    
  },
  apollo: {
      exhibitions: {
        result(data) {
          console.log('past data', data)
        },        
        variables: {
          after: null,
          first: exhibitions_per_load
        },
        query: gql`
          query L8estPosts (
              $first: Int
              $after: String
            ){
            exhibitions(first: $first, after: $after) {
              edges {
                node {
                  slug
                  title
                  featuredImage {
                    node {
                      sourceUrl(size: MEDIUM)
                      altText
                      srcSet(size: MEDIUM)
                      mediaDetails {
                        width
                        height
                      }                      
                    }
                  }
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
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `
    }
  }   
}  
// https://hackernoon.com/how-to-build-a-load-more-button-with-vue-js-and-graphql-5e6de1b61a6b
</script>

<style lang="scss" scoped>
  @mixin badge {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    background: $white;
    border: 2px solid $dark;
    font-weight: bold;
    text-transform: uppercase;
    padding: 2px;
  }
  .all-exhibitions {
    padding: $factor * 2

  }
  .page-title {
    text-align: center;
  }
  .exhibition-thumb {
    position: relative;
    &:nth-child(-n+5) {
      &:before {
        content: 'Upcoming';
        @include badge;
      }
    }
    &:first-of-type {
      &:before {
        content: 'Current';
        @include badge;
      }
    }    
  }
  .exhibition-thumb,
  .past-exhibition {
    @include thirds;
  }
  .pagination {
    margin: $factor;
    text-align: center;
  }
  .load-more {
    min-height: $factor * 2;
  }
</style>