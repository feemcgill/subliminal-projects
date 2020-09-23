<template>
  <div class="exhibition-thumb">
    <div class="feature-img">
      <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
    </div>
    <h1 v-html="exhibition.title"></h1>
    <div v-if="exhibition.ExhibitionSubtitle" v-html="exhibition.ExhibitionSubtitle.subTitle" />    
  </div>
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
</style>