<template>
  <div  v-if="exhibitions">
      <div class="container search-title">
        <h1>Search Results for: {{this.$route.params.term}}</h1>
      </div>
      <div class="container grid">
        <ExhibitionThumb v-for="item in exhibitions.edges" v-bind:key="item.node.slug" v-bind:exhibition="item.node" />
      </div>
      <div class="pagination">
        <div v-if="exhibitions.pageInfo.hasNextPage" class="load-more">
          <div v-if="$apollo.loading" class="loading">Loading...</div>
          <div v-else @click="loadMore()" class="primary-button">Load More</div>
        </div>    
        <div v-else class="all-loaded">
          <div v-if="exhibitions.edges.length == 0" class="none-found">Sorry, we couldn't find any articles matching this criteria.</div>
          <div v-else>{{exhibitions.edges.length}} exhibition<span v-if="exhibitions.edges.length > 1">s</span> found</div>
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
      result({data}) {
        console.log('SEARCH RESULTS', data, this.$route.params.term);
      },
      variables() {
        return {
          term: this.$route.params.term,
          after: null,
          first: exhibitions_per_load          
        }
      },
      query: gql`
        query SearchEx (
          $term: String
          $first: Int
          $after: String          
        ){
        exhibitions(first: $first, after: $after, where: {search: $term}) {
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
              ExhibitionFields {
                startDate
                endDate
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
</script>

<style lang="scss" scoped>
  .exhibition-thumb {
    @include thirds;
  }
  .search-title {
    margin: $factor * 2 auto;
    text-align: center;
    h1 {
      font-size: 2em;
    }
  }
</style>
