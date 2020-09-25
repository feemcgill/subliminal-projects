<template>
  <nuxt-link :to="'/exhibitions/'+exhibition.slug" class="exhibition-thumb">
    <div class="feature-img">
      <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
    </div>
    <h2 v-html="exhibition.title"></h2>
    <div class="subtitle" v-if="exhibition.ExhibitionSubtitle" v-html="exhibition.ExhibitionSubtitle.subTitle" />    
    <ul class="artists" v-if="exhibition.artists" >
      <li v-for="artist in exhibition.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
    </ul>

  </nuxt-link>
</template>
<script>
import FadeImage from '~/components/FadeImage'

export default {
  props: {
    exhibition: Object
  },
  components: {
    FadeImage
  }
}
</script>

<style lang="scss" scoped>
  .exhibition-thumb {
    @include halves;
    display: block;
    margin-bottom: $factor;
    color: $dark;
    text-decoration: none;
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
    .subtitle {
      margin-bottom: $factor * 0.125;
      @include sans;
      text-transform: uppercase;
    }
    .artists {
      display: block;
      font-size: 0.8em;
      li {
        display: inline-block;
        margin-right: 20px;
        &:before {
          content: "  ";
        }
        &:first-of-type:before {
          content: " ";
        }
        
      }
    }
  }
</style>