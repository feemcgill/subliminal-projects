<template>
  <div v-if="content" id="page-exhibition">
    <section class="hero">
      <div class="container img-intro">
        <div class="image-title">
          <div class="img">
            <FadeImage v-bind:src="content.featuredImage.node.sourceUrl" />
          </div>
        </div>
        <div class="content">
          <div class="intro">
            <div class="exhibition-title">
              <div class="info">
                <ul v-bind:class="content.artists.nodes.length > 1 ? 'artists list' : 'artists'" v-if="content.artists" >
                  <li v-for="artist in content.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
                </ul>             
                <h1>{{content.title}}</h1>
                <div v-if="content.ExhibitionFields.startDate || content.ExhibitionFields.endDate" class="date">
                  <span v-html="content.ExhibitionFields.startDate" /> — <span v-html="content.ExhibitionFields.endDate" />
                </div>
                <div class="opening" v-if="content.ExhibitionFields.openingReceptionDate || content.ExhibitionFields.openingReceptionTime">
                  Opening Reception: <span v-html="content.ExhibitionFields.openingReceptionDate" /> @ <span v-html="content.ExhibitionFields.openingReceptionTime" />
                </div>                
              </div>             
            </div>   
          </div>
          <ul class="links">
            <li v-for="link in content.ExhibitionFields.links" v-bind:key="link.link.url">
          
              <a v-bind:href="link.link.url" v-bind:target="link.link.target" >{{link.link.title}}</a>
            </li>
          </ul>
        </div>
      </div>   
    </section>

    <section class="additonal-content container">
        <div class="content formatted-content" v-html="content.content" />
    </section>

    <section v-if="content.ExhibitionFields.images" class="gallery container">
      <div class="gallery-wrap grid">
        <div class="gallery-item" v-for="image in content.ExhibitionFields.images" v-bind:key="image.sourceUrl" >
          <FadeImage v-bind:src="image.sourceUrl" />
          <div class="caption" v-html="image.caption" />
        </div>
      </div>
    </section>

  </div>  
</template>

<script>
import FadeImage from '~/components/FadeImage'

export default {
  props: {
    content: Object
  },
  components: {
    FadeImage
  }
}
</script>



<style lang="scss" scoped>
  .hero {
    margin-top: $factor;
    @include breakpoint(small) {
      display: flex;
      flex-direction: column-reverse;
    }    
  }
  .img-intro {
    position: relative;
    width: 100vw;
    margin-bottom: $factor;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .image-title {
      width: 50%;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
      }
      .img {
        position: relative;
        padding-bottom: 65%;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    .content {
      width: calc(50% - 50px);
      @include breakpoint(small) {
        width: 100%;

      }      
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .intro {
        @include breakpoint(small) {
          margin-bottom: $factor;
        }        
      }
      .links {
        font-size: 1.5em;
        text-transform: uppercase;
        font-weight: bold;
        display: block;
        li {
          display: block;
          a {
            color: $dark;
          }
        }
      }
    }
  }

  .exhibition-title {
    margin-bottom: $factor * 3;
    @include breakpoint(small) {
      margin-bottom: $factor;
    }        
    .info {
      font-size: 2em;
      @include breakpoint(small) {
        margin-bottom: $factor;
        width: 100%;
      }          
      h1 {
        font-size: 1em;
        font-weight: normal;
        text-transform: unset;
      }
      .date {
        font-size: 0.75em;
        //margin-bottom: 1em;
      }
      .opening {
        font-size: 0.75em;
      }
      .artists {
        width: 50%;

        &.list {
          font-size: 0.5em;
          display: block;
          margin-bottom: 1em;
          li {
            display: inline;
            &:after {
              content: " / ";
              opacity: 0.5;
            }
            &:last-of-type {
              &:after {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  .gallery {
    margin-bottom: $factor;
  }
  .gallery-wrap {
    display: grid;
    width: 100%;
    overflow: hidden;
    grid-template-columns: repeat(4, 25fr);
    grid-auto-rows: minmax(min-content, max-content);
    grid-auto-flow: dense;
    gap: $factor * 2;
    @include breakpoint(small) {
      grid-template-columns: repeat(2, 25fr);
      gap: $factor;
    }      
  }
  .additonal-content {
    margin-bottom: $factor;
    .content {
      //width: 75%;
      display: block;
      @include breakpoint(small) {
        width: 100%;
      }      
    }
  }
</style>