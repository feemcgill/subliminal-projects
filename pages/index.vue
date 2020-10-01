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
                <h2>Artist Name</h2>
                <h2>Show Title</h2>
                <!-- <h2 v-html="slide.link[0].title"></h2>
                <h3 v-html="slide.link[0].ExhibitionSubtitle.subTitle"></h3> -->
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
        <div class='carousel-controls__button prev' @click="() => {
          previous()
          stopCycle()          
          }">◀</div>
        <div class='carousel-controls__button next' @click="() => {
          next()
          stopCycle()
          }">
          ▶
        </div>
      </div>      
    </section>
    <section class="features container">
      <div class="feature" v-for="feature in page.HomeFields.features" :key="feature.slug">
        <div class="img-wrap">
          <div class="img">
            <img v-bind:src="feature.featuredImage.node.sourceUrl" :alt="feature.title">
          </div>
        </div>
        <div class="info">
          <h5>Lorem ipsum</h5>
          <div class="content">
            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euis
          </div>
          <div class="link">
            <a href="">Read More</a>
          </div>
        </div>
      </div>
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
  margin-bottom: $factor * 1.5;
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
    align-items: center;
    justify-content: center;
    z-index: 100;
    text-align: center;
  }
  .lockup {
    //font-size: 2em;
    transition: all 0.2s ease-in;
    //background: $light;
    padding: $factor * 0.5;
    //text-align: center;
    margin: $factor;
    font-weight: bold;
    //text-shadow: 0px 0px 2px $light;
    h2, h3 {
      @include type-big;
    }
    .dates {
      @include type-big-sub;
    }
  }

}

.carousel-controls {
  position: absolute;
  width: 100%;
  bottom: calc(50% + 1.5em);
  z-index: 1000;
  //background: $light;
  //font-size: 3em;
  &__button {
    color: $dark;
    cursor: pointer;
    font-size: 3em;
    //text-shadow: 2px 2px 10px $light;
    position: absolute;
    &.prev {
      left: $factor * 0.33;
    }
    &.next {
      right: $factor * 0.33;
    }
  }
}
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: $factor;
  .feature {
    @include halves;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $factor;
    align-items: flex-end;

    .img-wrap {
      width: 65%;
    }
    .img {
      width: 100%;
      padding-bottom: 60%;
      position: relative;
      align-self: flex-start;
      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }      
    }
    .info {
      width: 35%;
      padding-left: 20px;
      .link {
        margin-top: 10px;
        text-transform: uppercase;
        a {
          color: $grey;
          text-decoration: none;
          border-bottom: 2px solid $black;
        }
      }
    }
  }
}

 
</style>