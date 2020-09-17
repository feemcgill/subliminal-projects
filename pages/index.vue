<template>
  <div v-if="page && slides" id="page-home">
    <section class="hero">
      <transition-group name="tranz" class='carousel' tag="div">
        <div class="slide" v-for="(slide, index) in slides" :key="'slide-'+index" >
          <img v-bind:src="slide.image.sourceUrl" alt="">
          <div class="carousel-info">
            <div class="lockup">
              <h2 v-html="slide.link[0].title"></h2>
            </div>
          </div>          
        </div>
      </transition-group>

      <div class='carousel-controls'>
        <a class='carousel-controls__button' @click="previous">◀</a>
        <a class='carousel-controls__button' @click="next">▶</a>
      </div>      
    </section>
    <section class="features container">
        <div class="feature" v-for="feature in page.HomeFields.features" :key="feature.slug" >
          <div class="feature-img">
            <FadeImage v-bind:src="feature.featuredImage.node.sourceUrl" />
          </div>
          <h1 v-html="feature.title"></h1>
          <div v-if="feature.ExhibitionSubtitle" v-html="feature.ExhibitionSubtitle.subTitle" />
        </div>      
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import FadeImage from '~/components/FadeImage'
export default {
  data () {
    return {
      slides: null
    }
  },
  components: {
    FadeImage
  },
  methods: {
    next () {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)
    },
    previous () {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)
    }
  },  
  apollo: {
    page: {
    result({data}) {
        console.log('data', data.page)
        this.slides = data.page.HomeFields.hero
        console.log(this.slides)
      },
      error: function(error) {
        console.log(error)
      }, 
      query: gql`
      query HomeQuery {
        page(id: "/", idType: URI) {
          id
          title
          HomeFields {
            hero {
              mobileImage {
                srcSet(size: LARGE)
                sourceUrl(size: LARGE)
                altText
              }
              image {
                srcSet(size: LARGE)
                sourceUrl(size: LARGE)
                altText
              }
              link {
                ... on Exhibition {
                  id
                  slug
                  title
                }
                ... on Project {
                  id
                  slug
                  title
                }
              }
            }
            features {
              ... on Project {
                title
                slug                
                featuredImage {
                  node {
                    sourceUrl(size: MEDIUM)
                  }
                }                
              }            
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
          }       
        }
      }
    `
    }
  }
}
</script>


<style lang="scss">
.carousel {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin-bottom: $factor;
  //flex-wrap: wrap;
}
.slide {
  position: relative;
  width: 100vw;
  height: 100vh;
  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .lockup {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;   
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .carousel-info {
    background: $dark;
    color: $light;
    z-index: 1000;
    h2 {
      font-size: 5vw;
    }
  }
}
  .carousel-controls {
    position: absolute;
    bottom: $factor;
    right: $factor; 
    z-index: 1000;
    background: $light;
   
  }
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .feature {
    width: 48.5%;
    margin-bottom: $factor;
    .feature-img {
      width: 100%;
      padding-bottom: 57%;
      position: relative;
      border: 2px solid $dark;
      margin-bottom: $factor * 0.25;
      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
.tranz-enter-active, .tranz-leave-active {
  transition: opacity 1.52s ease-out;
}
.tranz-enter, .tranz-leave-active {
  opacity: 0;
}
 
</style>