<template>
  <nuxt-link :to="'/exhibitions/'+exhibition.slug" class="exhibition-thumb">
    <div class="feature-img">
      <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
    </div>

    <ul class="artists" v-if="exhibition.artists && exhibition.artists.nodes.length > 3" >
      Group Show
    </ul>

    <ul class="artists" v-else-if="exhibition.artists" >
      <li v-for="artist in exhibition.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
    </ul>

    <h2 v-html="exhibition.title"></h2>

    <div class="date">
      <span v-html="exhibition.ExhibitionFields.startDate" /> — <span v-html="exhibition.ExhibitionFields.endDate" />
    </div>

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
    display: block;
    margin-bottom: $factor;
    color: $dark;
    text-decoration: none;
  	&:hover {
		  .feature-img  img {
        transform: scale(1.03);
        transform-origin: center;
		  }
	  }   
    .feature-img {
      width: 100%;
      padding-bottom: 57%;
      position: relative;
      margin-bottom: $factor * 0.25;
      overflow: hidden;
      img {
    		transition: all 0.3s ease-out;
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
			  transform: scale(1);
      }
    }
    .subtitle {
      margin-bottom: $factor * 0.125;
      @include sans;
    }
    h2 {
      font-weight: normal;
    }
    .artists {
      display: block;
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