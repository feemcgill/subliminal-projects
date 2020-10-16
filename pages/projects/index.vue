<template>
  <div>
    <section v-if="pageData" class="featured-project container">
      <nuxt-link :to="'/projects/' + pageData.ProjectPageFields.featuredProject.slug" class="thumb">
        <div class="img">
          <FadeImage :src="pageData.ProjectPageFields.featuredProject.featuredImage.node.sourceUrl" :srcset="pageData.ProjectPageFields.featuredProject.featuredImage.node.srcSet" :alt="pageData.ProjectPageFields.featuredProject.featuredImage.node.altText" />
        </div>
        <h2>Featured Project</h2>
      </nuxt-link>
      <div class="info" v-html="pageData.content" />

    </section>
    <section v-if="projects" class="projects container grid">

      <nuxt-link :to="'/projects/'+project.node.slug" class="project" v-for="project in projects.edges" v-bind:key="project.node.slug" >
        <div class="img" v-if="project.node.featuredImage">
          <FadeImage :src="project.node.featuredImage.node.sourceUrl" :srcset="project.node.featuredImage.node.srcSet" :alt="project.node.featuredImage.node.altText" />
        </div>
        <div class="details">
          <h3>{{project.node.title}}</h3>
        </div>
      </nuxt-link>
    </section>

    <section v-if="projects" class="pagination">
      <div v-if="projects.pageInfo.hasNextPage" class="load-more">
        <div v-if="$apollo.loading" class="loading">Loading...</div>
        <div v-else @click="loadMore()" class="primary-button">Load More</div>
      </div>    
      <div v-else class="all-loaded">
        <div v-if="projects.edges.length == 0" class="none-found">Sorry, we couldn't find any projects matching this criteria.</div>
        <!-- <div v-else>All {{projects.edges.length}} projects loaded</div> -->
      </div>
    </section>
    
  </div>
</template>




<script>
import gql from 'graphql-tag'
import FadeImage from '~/components/FadeImage'

const projects_per_load = 3

export default {
  components: {
    FadeImage
  },
  data() {
    return {
      foundPosts: null,
      queryCursor: null,
      displayedPosts: [],
      pageData: null
    };
  },  
  mounted() {
    
  },
  methods: {
    loadMore(){
      this.$apollo.queries.projects.fetchMore({
        variables: {
          after: this.projects.pageInfo.endCursor,
          first: projects_per_load         
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.projects.edges;
          const pageInfo = fetchMoreResult.projects.pageInfo;          
          return {
            projects: {
              __typename: previousResult.projects.__typename,
              edges: [...previousResult.projects.edges, ...newEdges],
              pageInfo
            }
          }
        }
      })
    }    
  },
  apollo: {
      projects: {
        result({data}) {
          console.log('past data', data)
          this.pageData = data.page
          this.$store.commit('setLogoBg', this.pageData.ProjectPageFields.featuredProject.featuredImage.node.sourceUrl)
        },        
        variables: {
          after: null,
          first: projects_per_load
        },
        query: gql`
          query Projects($first: Int, $after: String) {
            projects(first: $first, after: $after) {
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
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
            page(id: "projects", idType: URI) {
              id
              title
              content
              ProjectPageFields {
                featuredProject {
                  ... on Project {
                    id
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
                  }
                }
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
    @include thirds;
  }
  .pagination {
    margin: $factor;
    text-align: center;
  }
  .load-more {
    min-height: $factor * 2;
  }


  .featured-project {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: $factor * 3;
    .thumb {
      width: 46%;
      color: $dark;
      text-decoration: none;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
      }     
    }
    .img {
      padding-bottom: 88%;
      position: relative;
      margin-bottom: $factor * 0.5;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      width: 50%;
      font-size: 1.5em;
      @include breakpoint(small) {
        width: 100%;
      }        
    }
  }
  .projects {
    margin-bottom: $factor * 2;
    .project {
      @include thirds;
      color: $dark;
      text-decoration: none;
      display: block;
      .img {
        position: relative;
        padding-bottom: 100%;
        margin-bottom: $factor * 0.5;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }        
      }
    }
  }
</style>