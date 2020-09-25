<template>
  <div v-if="page && slides" id="page-home">
    <section class="hero">
      <div class="carousel-view">
      <transition-group class='carousel' tag="div">
        <div class="slide" v-for="slide in slides" :key="'slide-'+slide.link[0].slug" >
          <img v-bind:src="slide.link[0].featuredImage.node.sourceUrl" alt="">
          <div class="carousel-info">
            <div class="lockup">
              <div>
                <h2 v-html="slide.link[0].title"></h2>
                <h3 v-html="slide.link[0].ExhibitionSubtitle.subTitle"></h3>
                <div class="dates">
                  <span v-html="slide.link[0].ExhibitionFields.startDate" /> — <span v-html="slide.link[0].ExhibitionFields.endDate" />
                </div>
              </div>
            </div>
          </div>          
        </div>
      </transition-group>
      </div>

      <div v-if="slides.length > 1" class='carousel-controls'>
        <!-- <a class='carousel-controls__button' @click="previous">◀</a> -->
        <a class='carousel-controls__button' @click="() => {
          next()
          stopCycle()
          }">
          ▶
        </a>
      </div>      
    </section>
    <section class="features container">
      <ExhibitionThumb v-for="feature in page.HomeFields.features" :key="feature.slug" v-bind:exhibition="feature" />
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ExhibitionThumb from '~/components/ExhibitionThumb'
export default {
  data () {
    return {
      slides: null,
      cycleSlides: null
    }
  },
  components: {
    ExhibitionThumb
  },
  methods: {
    next () {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)
    },
    previous () {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)
    },
    startCycle() {
      this.cycleSlides = setInterval(() => {
        this.next()
      }, 5000)
    },
    stopCycle() {
      clearInterval(this.cycleSlides)
    }
  },
  mounted() {
    this.startCycle()
  },
  beforeDestroy() {
    this.stopCycle()
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

                  ExhibitionSubtitle {
                    subTitle
                  }
                  featuredImage {
                    node {
                      sourceUrl(size: LARGE)
                    }
                  }
                  ExhibitionFields {
                    startDate
                    endDate
                  }
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

$carouselHeight: 80vh;

.hero {
  position: relative;
}
.carousel-view {
  overflow: hidden;
  width: 100vw;
  height: $carouselHeight;
  margin-bottom: $factor;
  flex-wrap: wrap;  
  background-color: $dark;
}
.carousel {
  margin-top: -$carouselHeight;
}
.slide {
  position: relative;
  width: 100vw;
  height: $carouselHeight;
  transition: transform 1.2s ease-in-out;
  &.v-move {
    .lockup {
      opacity: 0;
      transform: translateX(-100px);
    }
  }
  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .carousel-info {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;   
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    z-index: 100;
  }
  .lockup {
    font-size: 2em;
    transition: all 0.2s ease-in;
    background: $light;
    padding: $factor * 0.5;
    //text-align: center;
    margin: $factor;
  }

}

.carousel-controls {
  position: absolute;
  bottom: $factor;
  right: $factor; 
  z-index: 1000;
  //background: $light;
  //font-size: 3em;
  a {
    color: $light;
    cursor: pointer;
    font-size: 3em;
    text-shadow: 2px 2px 10px $dark;
  }
}
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

 
</style>