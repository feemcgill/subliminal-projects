<template>
    <div v-if="exhibitions">
      <div class="page-title">
        <h1>All Exhibitions</h1>
      </div>
      <div class="container grid">
        <ExhibitionThumb class="past-exhibition" v-for="item in exhibitions.edges" v-bind:key="item.node.slug" v-bind:exhibition="item.node" />
      </div>

      <div v-if="exhibitions.pageInfo.hasNextPage" class="load-more">
        <div v-if="$apollo.loading" class="loading">Loading...</div>
        <div v-else @click="loadMore()" class="primary-button">Load More</div>
      </div>    
      <div v-else class="all-loaded">
        <div v-if="exhibitions.edges.length == 0" class="none-found">Sorry, we couldn't find any articles matching this criteria.</div>
        <div v-else>All posts loaded</div>
      </div>
    </div>  
</template>
<script>
import gql from 'graphql-tag'
import ExhibitionThumb from  '~/components/ExhibitionThumb'

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
          first: 8         
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
          first: 8
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
                  excerpt
                  date                 
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
  .exhibition-thumb,
  .past-exhibition {
    @include fourths;
  }
</style>