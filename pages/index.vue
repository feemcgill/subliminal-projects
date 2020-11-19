<template>
  <div v-if="page && slides.length" id="page-home">
    <section class="hero">
      <div class="carousel-view container">
        <div class="carousel-wrap">
            <nuxt-link v-bind:to="'/exhibitions/'+slides[0].slug" v-show="slides[0].featuredImage.node.sourceUrl" class="slide" >
              <div class="img-wrap">
                <div class="img">
                  <img v-bind:src="slides[0].featuredImage.node.sourceUrl" alt="">      
                </div>
              </div>
              <div class="lockup">
                <div>
                  <h2 v-html="slides[0].title"></h2>
                  <ul class="artists" v-if="slides[0].artists && slides[0].artists && slides[0].artists.nodes.length < 3" >
                    <li v-for="(artist, index) in slides[0].artists.nodes" v-bind:key="artist.slug+index"><h2>{{artist.name}}</h2></li>
                  </ul>
                  <div class="dates">
                    <span v-html="slides[0].ExhibitionFields.startDate" /> — <span v-html="slides[0].ExhibitionFields.endDate" />
                  </div>
                </div>
              </div>            
            </nuxt-link>
        </div> 
        <div v-if="slides.length >= 1" class='carousel-controls__button prev' @click="() => {
          previous()
          stopCycle()          
          }">
          <svg xmlns="http://www.w3.org/2000/svg" width="32.826" height="57.653" viewBox="0 0 32.826 57.653">
            <path id="Path_11" data-name="Path 11" d="M407.739,614.292l-28,26,28,26" transform="translate(-377.739 -611.466)" fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"/>
          </svg>        
        </div>
        <div v-if="slides.length >= 1" class='carousel-controls__button next' @click="() => {
          next()
          stopCycle()
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="32.827" height="57.653" viewBox="0 0 32.827 57.653">
              <path id="Path_12" data-name="Path 12" d="M1509.739,666.292l28-26-28-26" transform="translate(-1506.912 -611.466)" fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"/>
            </svg>          
        </div>
      </div>
      
    
    </section>

    
    <section class="features container">
      <div class="feature" v-for="(feature, index) in page.HomeFields.features" :key="feature.title +index">
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
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  data () {
    return {
      slides: null,
      slide: null,
      cycleSlides: null
    }
  },
  head () {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo)
      }    
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
        this.slides = data.page.HomeFields.hero
        console.log(this.slides.length, 'slides');
        if (this.slides[0].featuredImage) {
          this.$store.commit('setLogoBg', this.slides[0].featuredImage.node.sourceUrl)
        }
      },
      error: function(error) {
        console.log(error)
      }, 
      query: gql`
      query HomeQuery {
        page(id: "/", idType: URI) {
          id
          title
          ${metaGql}              
          HomeFields {
            hero {
              ... on Exhibition {
                id
                slug
                title             
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

$carouselHeight: 56vw;

.hero {
  position: relative;
  margin-bottom: $factor * 1.5;
}
.carousel-view {
  overflow: hidden;
  width: 100vw;
  flex-wrap: wrap;  
  position: relative;
}
.slide {
  position: relative;
  width: 100%;
  //transition: transform 1.2s ease-in-out;
  display: block;
  color: $dark;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: space-between;
  @include breakpoint(small) {
    display: block;
  }  
  &.v-move {
    .lockup {
      opacity: 0;
      transform: translateX(-100px);
    }
  }
  .img-wrap {
    width: 66%;
    @include breakpoint(small) {
      width: 100%;
    }    
    .img {
      padding-bottom: 57%;
      width: 100%;
      position: relative;   
      img {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: $dark;
        object-position: center;
      }   
    }
  }
  .lockup {
    width: 33%;
    transition: all 0.2s ease-in;
    background: $light;
    padding: $factor * 0.5;
    font-weight: bold;
    text-align: center;
    h2, h3 {
      font-size: 1.5rem;
    }
    @include breakpoint(small) {
      width: 100%;
    }
    .artists {
      display: block;
    }
    .dates {
      font-weight: 200;
      font-size: 1.2rem;

    }
  }
}

.carousel-info {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  z-index: 100;
  text-align: left;
}


.carousel-controls {
  &__button {
    color: $dark;
    cursor: pointer;
    font-size: 3em;
    position: absolute;
    width: 10%;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s ease-out;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    &.prev {
      left: 0;
    }
    &.next {
      right: 0;
    }
  }
}
.features {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: $factor;
  .feature {
    @include thirds;
    margin-bottom: $factor * 2;
    .img-wrap {
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
          color: $dark;
          text-decoration: none;
          border-bottom: 2px solid $black;
          transition: all 0.2s ease-out;
          &:hover {
            color: $grey;
            border-bottom: 2px solid $grey;
          }
        }
      }
    }
  }
}

 
</style>