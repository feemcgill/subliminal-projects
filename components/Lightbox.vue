<template>
  <div class="lightbox">
    <a class="close" @click="close">Close</a>
    <div :class="'image '+ swipeClass"
    ref="lightboxImg"      
    v-touch:start="touchStart"
    v-touch:moving="touchMove"
    v-touch:end="touchEnd"
    v-touch:swipe.left="next"
    v-touch:swipe.right="prev"
    v-touch:swipe.bottom="close"
    >
      <FadeImage v-if="url" v-bind:src="url" />
    </div>
    <div class="controls">
      <div @click="prev" :class="(prevIndex != null) ? 'active prev' : 'prev'">Prev</div>
      <div @click="next" :class="(nextIndex != null) ? 'active next' : 'next'">Next</div>
    </div>
  </div>  
</template>

<script>





import FadeImage from '~/components/FadeImage'

export default {
  props: {
    startingIndex: Number,
    imageArray: Array
  },
  data() {
    return {
      currentIndex: null,
      theLightbox: null,
      url: null,
      prevIndex: null,
      nextIndex: null,
      swipeData: {},
      swipeClass: null,
    }
  },
  components: {
    FadeImage
  },
  mounted() {
    this.updateLightbox(this.startingIndex)
  },
  methods: {
    touchStart(a) {
      this.swipeData.startX = a.changedTouches[0].clientX
      this.swipeData.startY = a.changedTouches[0].clientY
    },
    touchMove(a) {
      const movedX = a.changedTouches[0].clientX
      const movedY = a.changedTouches[0].clientY
      const deltaX = movedX - this.swipeData.startX
      const deltaY = movedY - this.swipeData.startY
        if (Math.abs(deltaX) > 30) {
          if (deltaX > 0) this.swipeClass = "right"
          else this.swipeClass = "left"
        }
        if (Math.abs(deltaY) > 30) {
          if (deltaY > 0) this.swipeClass = "down"
          else this.swipeClass = "up"
        }
    },
    touchEnd() {
      this.swipeClass = null
      this.swipeData = {}
    },   
    close() {
      console.log('CLOSE CALLED')
      this.$emit('closeLightbox', true)
    },
    prev() {
      console.log('PREV: ', this.prevIndex, this.nextIndex)
      if(this.prevIndex != null) {
        this.updateLightbox(this.prevIndex)
      }       
    },
    next() {
      console.log('NEXT: ', this.prevIndex, this.nextIndex)
      if(this.nextIndex) {
        this.updateLightbox(this.nextIndex)
      }      
    },
    updateLightbox(index) {
      const imgArray = this.imageArray[index].mediaDetails.sizes
      //const lbObj = {};

      if (index == 0) {
        //lbObj.prev = null
        this.prevIndex = null
      } else {
        //lbObj.prev = index-1
        this.prevIndex = index-1
      }

      if (index == this.imageArray.length - 1) {
        //lbObj.next = null
        this.nextIndex = null
      } else {
        //lbObj.next = index+1
        this.nextIndex = index+1
      }

      //lbObj.url = null
      //this.theLightbox = lbObj;
      this.url = null


      if (imgArray) {
        imgArray.forEach(size => {
          if (size.name == 'large') {
            console.log('found a large')
            this.url = size.sourceUrl
          } else {
            this.url = this.imageArray[index].sourceUrl
          } 
        })       
      } else {
        this.url = this.imageArray[index].sourceUrl
      }


      //this.theLightbox = lbObj;
      console.log('THE LIGHTBOX', this.theLightbox, this.imageArray)
    }
  }
}
</script>


<style lang="scss" scoped>
  $swipeMove: 20px;
  .lightbox {
    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $light;
    .image {
      &.down img {
        transform: scale(0.9) translateY($swipeMove) translatex(0px);
      }
      &.left img {
        transform: scale(1) translateY(0px) translateX(-$swipeMove);
      }  
      &.right img {
        transform: scale(1) translateY(0px) translateX($swipeMove);
      }            
    }
    img {
      top: 5vw;
      bottom: 5vw;
      left: 5vw;
      right: 5vw;
      height: calc(100vh - 10vw);
      width: calc(100vw - 10vw);
      object-fit: contain;
      position: absolute;
      transition: all 0.2s ease-in;
      transform: scale(1) translateY(0px);
      transform-origin: center center;      
    }
    .close {
      position: absolute;
      top: $factor;
      right: $factor;
      cursor: pointer;
      z-index: 100;

    }
    .controls {
      position: absolute;
      bottom: $factor;
      right: $factor;
      display: flex;
      z-index: 100;
      > div {
        margin: 0 10px;
        cursor: pointer;
        opacity: 0.5;
        &.active {
          opacity: 1;
          cursor: none;
        }
      }
    }
  }
</style>