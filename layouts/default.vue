<template>
  <div>
    <div class="header-push"></div>
    <header>
      <!-- <Nav /> -->
      <div class="container">
        <div class="nav-in">
          <nuxt-link class="logo" to="/">
            <Logo />
          </nuxt-link>

          <nav id="main-nav" v-bind:class="open? 'nav-open' : 'nav-closed'">
            <ul class="main">
              <li v-on:click="close"><nuxt-link to="/info" tabindex="0">Info</nuxt-link></li>
              <li v-on:click="close">
                <nuxt-link to="/exhibitions" tabindex="0">Exhibitions</nuxt-link>
                <ul class="sub">
                  <li v-on:click="close">
                    <nuxt-link to="/exhibitions" tabindex="0">Current & Upcoming</nuxt-link>
                  </li>
                  <li v-on:click="close">
                    <nuxt-link to="/exhibitions/all" tabindex="0">All</nuxt-link>
                  </li>              
                </ul>      
              </li>
              <li v-on:click="close"><nuxt-link to="/projects" tabindex="0">Projects</nuxt-link></li>  
              <li v-on:click="close"><nuxt-link to="/artists" tabindex="0">Artists</nuxt-link></li>  
              <li v-on:click="close">
                <a target="_blank" href="https://store.subliminalprojects.com/">Shop</a>
                <ul class="sub">
                  <li v-on:click="close">
                    <a target="_blank" href=" https://www.artsy.net/subliminal-projects">Fine Art</a>
                  </li>
                  <li v-on:click="close">
                    <a target="_blank" href="https://store.subliminalprojects.com/">Store</a>
                  </li> 
                </ul>
              </li>  
            </ul>

            <ul class="socials" v-if="globalContent">
              <li v-if="globalContent.GlobalFields.instagramLink">
                <a target="_blank" v-bind:href="globalContent.GlobalFields.instagramLink">
                  <img src="~/assets/socials/ig.svg" alt="Instagram Logo">
                </a>
              </li>
              <li v-if="globalContent.GlobalFields.twitterLink">
                <a target="_blank" v-bind:href="globalContent.GlobalFields.twitterLink">
                  <img src="~/assets/socials/twitter.svg" alt="Twitter Logo">
                </a>
              </li>
              <li v-if="globalContent.GlobalFields.facebookLink">
                <a target="_blank" v-bind:href="globalContent.GlobalFields.facebookLink">
                  <img src="~/assets/socials/fb.svg" alt="Facebook Logo">
                </a>
              </li>
              <li v-if="globalContent.GlobalFields.spotifyLink">
                <a target="_blank" v-bind:href="globalContent.GlobalFields.spotifyLink">
                  <img src="~/assets/socials/spotify.svg" alt="Spotify Logo">
                </a>
              </li>  
              <li v-if="globalContent.GlobalFields.vimeoLink">
                <a target="_blank" v-bind:href="globalContent.GlobalFields.vimeoLink">
                  <img src="~/assets/socials/vimeo.svg" alt="Vimeo Logo">
                </a>
              </li>                                        
            </ul>
            <!-- <div class="close-btn" v-on:click="toggle"></div>     -->
          </nav>
          <div v-bind:class="open? 'nav-open burger-btn' : 'nav-closed burger-btn'"  v-on:click="toggle"><div></div><div></div><div></div></div>
        </div>
      </div>

    </header>
    <div class="page-wrapper">
      <Nuxt />
    </div>
    <footer>
      <div class="container footer-row">
        <div v-if="globalContent" v-html="globalContent.GlobalFields.footerContent" class="address footer-content" />
        <div class="forms">
          <form class="form" v-on:submit.prevent="searchIt">
            <div class="input">
              <input id="search" v-model="inputTerm"  placeholder="search" type="text">
            </div>
            <input type="submit">
          </form>


			<form class="newsletter" action="https://obeygiant.us19.list-manage.com/subscribe/post?u=8f0a9fb5f4fb8db04b8004379&amp;id=3cab23a91b" method="POST" accept-charset="utf-8" target="_blank">
				<div class="newsletter-form-input input">
					<input type="text" name="EMAIL" id="email" class="required email"  placeholder="Email Address">
				</div>
        <input type="hidden" name="list" value="17zwLGUQk8OEGeH763YlIseQ">
        <input type="submit" name="submit" id="submit" value="Subscribe" class="button-standard">
      </form>
        </div>
      </div>
      <div class="container footer-row">
        <ul class="legal-menu">
          <li><nuxt-link to="/terms-of-use">Terms of Use</nuxt-link></li>
          <li><nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></li>
        </ul>
        <div class="copyright" v-if="globalContent">
         {{globalContent.GlobalFields.footerCopyright}}
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Logo from '~/components/Logo';
import Nav from '~/components/Nav';
import gql from 'graphql-tag'

export default {
  data() {
    return {
      open: false,
      inputTerm: null,
    }
  }, 
  components: {
    Nav
  },

  
  methods: {
    toggle: function() {
      this.open = !this.open
    },
    close: function () {
      this.open = false
    },
    searchIt() {
      window.scrollTo(0,0)
      this.$router.push("/search/" + this.inputTerm)
      this.inputTerm = null;
    }    
  },
  apollo: {
    globalContent: {
      error: function(error) {
        console.log(error)
      },
      result({data}) {
      },
      query: gql`
        query GlobalQuery {
          globalContent {
            GlobalFields {
              footerContent
              footerCopyright      
              facebookLink
              instagramLink
              spotifyLink
              twitterLink
              vimeoLink
            }
          }
        }         
      `
    }    
  }     
}
</script>


<style lang="scss" scoped>
  .header-push {
    padding-top: 105px;
    @include breakpoint(small) {
      padding-top: 78px;
    }
  }
  header {
    position: fixed;
    background: $light;
    top: 0;
    width: 100%;
    z-index: 5000;
    height: 105px;
    @include breakpoint(small) {
      width: 100%;
      padding: 0;
      margin: 0;
      height: auto;
    }       
    .container {

    
    }
    .logo {
      //position: absolute;
      width: 130px;
      padding: $factor*.125 0;
      z-index: 10000;
      @include breakpoint(small) {
        width: 100px;
      }
    }
  }
  .nav-in {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
  }

  .burger-btn {
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 26px;
    right: 0;
    width: 40px;
    height: 24px;
    cursor: pointer;
    display: flex;
    padding: 0px;
    display: none;
    @include breakpoint(small) {
      display: flex;
    }
    > div {
      width: 100%;
      height: 4px;
      background-color: $dark;
      transition: all 0.1s ease-in;
    }
    &.nav-open {
      >div:nth-last-of-type(2) {
        position: absolute;
        top: 50%;        
        opacity: 0.0;
      }
      >div:nth-last-of-type(1) {
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
      }  
      >div:nth-last-of-type(3) {
        position: absolute;
        top: 50%;
        transform: rotate(45deg);
      }            
    }
  }

  #main-nav {
    margin-top: 20px;
    display: flex;
    font-size: 20px;
    @include breakpoint(small) {
      position: relative;
      background: $light;
      position: absolute;
      left: -2em;
      top: 0;
      margin: 0;
      height: 100vh;
      width: calc(100vw + 2em);
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
      font-size: 2em;
      &.nav-closed {
        display: none;
      }
      ul {
        display: block;
        width: 100%;
        text-align: center;
        li {
          width: 100%;
          .sub {
            display: block;
            background: transparent;
            position: relative;
            width: auto;
            padding: 0;
            margin: 0;
            li {
              line-height: 1;
            }
            a {
              font-size: 0.5em;
            }
          }
        }
        &.socials {
          display: flex;
          width: auto;
          margin-top: $factor;
        }
      }
    }

    li {
      margin-right: $factor * 0.5;
      font-weight: bold;
      text-transform: uppercase;
      position: relative;
      &:hover {
        a {
          color: $grey;
        }
        .sub {
          display: block;
          li a {
            color: $dark;
          }
        }
      }
    }
    a {
      color: $dark;
      text-decoration: none;
      &.nuxt-link-active {
        color: $grey;
      }
    }
   .nuxt-link-active {
     color: $grey;
    }    
    .sub {
      //display: none;
      position: absolute;
      width: 300px;
      display: none;
      padding: 0px 10px;
      background: $light;
      margin-left: -10px;
      li {
        display: block;
        a {
          @include type-regs;
        }
        &:hover {
          a {
            color: $grey!important;
          }
        }
      }
    }
    .socials {
      margin-top: 2px;
      img {
        height: 18px;
      }
      li {
        margin-right: 10px;
        &:hover {
          opacity: 0.4;
        }
      }
    }
  }







  footer {
    overflow: hidden;
    padding-top: $factor;
    border-top: 2px solid $dark;
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $factor;
      @include breakpoint(small) {
        width: 100%;
        display: block;
      }      
    }
    .address {
      @include breakpoint(small) {
        margin-bottom: $factor;
      }      
    }
    .forms {
      display: flex;
      @include breakpoint(small) {
        width: 100%;
        display: block;
      }        
      form:first-of-type {
        margin-right: $factor;
        @include breakpoint(small) {
          margin-bottom: $factor * 0.25;
        }          
      };
      form {
        display: flex;
      }
      .input {
        margin-right: 5px;
      }
    }
    .copyright, 
    .legal-menu {
      @include type-tiny;
      li {
        margin-right: 10px;
      }
    }
  }





  .nav-enter-active {
    transition: all .3s ease;
    ul {
      transition: all .5s ease;
    }  
  }

  .nav-leave-active {
    transition: all .3s ease-out;
    ul {
      transition: all .5s ease-out;
    }  
  }
  .nav-enter, .nav-leave-to {
    transform: translateX(100vw);
    backface-visibility: hidden;
    transform-style: preserve-3d;
    @include breakpoint(medium down) {
      transform: translateX(100vw);
    }    
  }  
  .page-wrapper {
    min-height: 100vh;
    position: relative;
  }
</style>