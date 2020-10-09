<template>
  <div v-if="page && slides" id="page-home">


    <section class="hero">
      <div class="carousel-view">
        <div class="carousel-wrap">
            <div v-show="slides[0].featuredImage.node.sourceUrl" class="slide" >
              <img v-bind:src="slides[0].featuredImage.node.sourceUrl" alt="">
              <div class="carousel-info">
                <div class="lockup">
                  <div>

                    <ul class="artists" v-if="slides[0].artists && slides[0].artists.nodes.length > 3" >
                      <h2>Group Show</h2>
                    </ul>

                    <ul class="artists" v-else-if="slides[0].artists" >
                      <li v-for="artist in slides[0].artists.nodes" v-bind:key="artist.slug"><h2>{{artist.name}}</h2></li>
                    </ul>

                    <h2 v-html="slides[0].title"></h2>
                    <div class="dates">
                      <span v-html="slides[0].ExhibitionFields.startDate" /> — <span v-html="slides[0].ExhibitionFields.endDate" />
                    </div>

                  </div>
                </div>
              </div>          
            </div>
        </div>
      </div>

      <div v-if="slides.length > 1" class='carousel-controls'>
        <div class="container">
          <div class='carousel-controls__button prev' @click="() => {
            previous()
            stopCycle()          
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="32.826" height="57.653" viewBox="0 0 32.826 57.653">
                <path id="Path_11" data-name="Path 11" d="M407.739,614.292l-28,26,28,26" transform="translate(-377.739 -611.466)" fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"/>
              </svg>
            </div>
          <div class='carousel-controls__button next' @click="() => {
            next()
            stopCycle()
            }">
            <svg xmlns="http://www.w3.org/2000/svg" width="32.827" height="57.653" viewBox="0 0 32.827 57.653">
              <path id="Path_12" data-name="Path 12" d="M1509.739,666.292l28-26-28-26" transform="translate(-1506.912 -611.466)" fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"/>
            </svg>
          </div>
        </div>
      </div>      
    </section>

    
    <section class="features container">
      <div class="feature" v-for="feature in page.HomeFields.features" :key="feature.title">
        <div class="img-wrap">
          <div class="img">
            <img v-bind:src="feature.image.sourceUrl" :alt="feature.title">
          </div>
        </div>
        <div class="info">
          <h5>{{feature.title}}</h5>
          <div class="content" v-html="feature.blurb"></div>
          <div v-if="feature.link" class="link">
            <a v-bind:target="feature.linkInNewWindow ? '_blank' : '_self'" v-bind:href="feature.link">{{feature.linkText}}</a>
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
      slide: null,
      cycleSlides: null
    }
  },
  components: {
    ExhibitionThumb
  },
  methods: {
    shuffle() {
      this.slides = _.shuffle(this.slides);
    },    
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
        // this.slide = this.slides[0]
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
                artists {
                  nodes {
                    name
                    slug
                  }
                }                   
              }
            }
            features {
              title
              blurb
              image {
                id
                sourceUrl(size: MEDIUM)
              }
              link
              linkInNewWindow
              linkText
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
  position: relative;
}
.carousel {
  //margin-top: -$carouselHeight;
  //position: absolute;
  // \width: 100%;
}
.carousel-wrap {

}
.slide {
  position: relative;
  width: 100%;
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
    text-align: left;
  }
  .lockup {
    transition: all 0.2s ease-in;
    background: $light;
    padding: $factor * 0.5;
    margin: $factor;
    font-weight: bold;
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
  .container {
    position: relative;
  }
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
  max-width: 1160px;
  .feature {
    @include halves;
    /* display: flex;
    flex-wrap: wrap;
    align-items: flex-end;     */
    margin-bottom: $factor * 2;
    max-width: 423px;


    .img-wrap {
      /* width: 65%; */
      margin-bottom: 1em;
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
      /* width: 35%;
      padding-left: 20px; */
      .link {
        margin-top: 10px;
        text-transform: uppercase;
        text-align: right;
        a {
          color: $grey;
          color: $dark;
          text-decoration: none;
          border-bottom: 2px solid $black;
        }
      }
    }
  }
}

 
</style>