<template>
  <div id="page-info" class="container" v-if="page">
    <section class="hero grid">
      <div class="quote-wrap">
        <div class="quote" v-html="page.InfoFields.quote"/>
        <div class="attr">– {{page.InfoFields.quoteAttribute}}</div>
      </div>
      <div class="img">
        <FadeImage v-bind:src="page.featuredImage.node.sourceUrl" v-bind:alt="page.featuredImage.node.altText" v-bind:srcset="page.featuredImage.node.srcSet" />
      </div>
    </section>
    <section class="about">
      <div class="content" v-html="page.content" />
    </section>
    <section class="contact grid">
      <div class="contact-deets">
        <h5>Contact</h5>
        <div class="email">
          <a href="mailto:info@subliminalprojects.com">info@subliminalprojects.com</a>
        </div>
        <div class="message">
          We are currently not accepting art submissions
        </div>
      </div>
      <div class="collabs">
        <h5>In Collaboration With</h5>
        <ul class="icons">
          <li>
            <a href="#">
              <img src="~/assets/Obey-BW.svg" alt="">
            </a>   
          </li>
          <li>
            <a href="#">
              <img src="~/assets/OG-BW.svg" alt="">
            </a>   
          </li>
          <li>
            <a href="#">
              <img src="~/assets/SNO-STACKED-BW.svg" alt="">
            </a>   
          </li>                     
        </ul>
      </div>
    </section>
    <section class="feed">
      <IgFeed />
    </section>
  </div>
</template>
<script>
import IgFeed from "~/components/IgFeed"
import FadeImage from '~/components/FadeImage'
import gql from 'graphql-tag';

export default {
  components: {
    IgFeed,
    FadeImage
  },
  apollo: {
    page: {  
      result({data}) {
        if (data.page.featuredImage) {
          this.$store.commit('setLogoBg', data.page.featuredImage.node.sourceUrl)
        }
      },
      error: function(error) {
        console.log(error)
      }, 
      query: gql`
        query InfoPageQuery {
          page(id: "67432", idType: DATABASE_ID) {
            id
            title
            content(format: RENDERED)
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                srcSet(size: LARGE)
                altText
              }
            }
            InfoFields {
              quote
              quoteAttribute
            }
          }
        }
      `
    }
  }  
  
}
</script>
<style lang="scss" scoped>
  section {
    margin-bottom: $factor;
  }
  .hero {
    align-items: center;

    .quote-wrap {
      width: 48.5%;
      font-size: 2vw;
      line-height: 1.5em;
      font-weight: bold;
      position: relative;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
        font-size: 2em;
      }
      .quote {
        padding-top: 2em;
        margin-bottom: $factor * 0.5;
       &:before {
          content: "\201C";
          font-size: 3em;
          position: absolute;
          margin-top: -30px;
        }        
        &:after {
          content: "\201D";
        }
      }
    }
    .img {
      width:50%;
      padding-bottom: 50%;
      position: relative;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @include breakpoint(small) {
        width: 100%;
      }      
    }
  }
  .about {
    font-size: 1.2em;
  }
  .contact {
    .contact-deets {
      h5, .email {
        font-size: 1.2em;
        a {
          color: $dark;
        }
      }
      h5 {
        text-transform: uppercase;
        margin-bottom: $factor * 0.25;
      }
      @include breakpoint(small) {
        margin-bottom: $factor;
      }       
    }
    .collabs {
      text-align: left;
      .icons {
        display: flex;
        align-items: center;
        margin-top: $factor * 0.25;
        li {
          a {
            display: block;
          }
        }
        img {
          width: 80px;
          display: block;
        }
      }
    }
  }
</style>