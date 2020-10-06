<template>
    <div v-if="gotArtists">
      <div>
        <div v-for="item in artists.edges" v-bind:key="item.node.slug">
          {{item.node.name}}
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading Artists</h1>
    </div>  
</template>




<script>
import gql from 'graphql-tag';
export default {
  data: () => {
    return {
      gotArtists: false,
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
  apollo: {
    artists: {
      variables: {
        after: null,
        first: 100
      },      
      result({data}) {
        console.log('artists', data.artists)
        console.log(data.artists.pageInfo.hasNextPage, data.artists.pageInfo.endCursor, 'GET MORE')
        if (data.artists.pageInfo.hasNextPage) {
          this.loadMore();
        } else {
          console.log('GOT EM ALL');
          this.gotArtists = true
        }        
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
