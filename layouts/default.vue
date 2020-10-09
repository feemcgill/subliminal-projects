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
              <li v-on:click="close"><nuxt-link to="/info" exact tabindex="0">Info</nuxt-link></li>
              <li v-on:click="close">
                <nuxt-link to="/exhibitions" exact tabindex="0">Exhibitions</nuxt-link>
                <ul class="sub">
                  <li v-on:click="close">
                    <nuxt-link to="/exhibitions" exact tabindex="0">Current & Upcoming</nuxt-link>
                  </li>
                  <li v-on:click="close">
                    <nuxt-link to="/exhibitions/all" exact tabindex="0">All</nuxt-link>
                  </li>              
                </ul>      
              </li>
              <li v-on:click="close"><nuxt-link to="/projects" exact tabindex="0">Projects</nuxt-link></li>  
              <li v-on:click="close"><nuxt-link to="/artists" exact tabindex="0">Artists</nuxt-link></li>  
              <li v-on:click="close"><a target="_blank" href="https://store.subliminalprojects.com/">Shop</a></li>  

            </ul>
            <ul class="socials">
              <li>
                <a href="#">
                  <img src="~/assets/socials/ig.svg" alt="">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="~/assets/socials/twitter.svg" alt="">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="~/assets/socials/fb.svg" alt="">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="~/assets/socials/spotify.svg" alt="">
                </a>
              </li>  
              <li>
                <a href="#">
                  <img src="~/assets/socials/vimeo.svg" alt="">
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
        <div class="address">
          <p>
          1331 W Sunset Blvd<br />
          Los Angeles CA 90026
          </p>
          <p>
          213.213.0078<br /> 
          info@subliminalprojects.com
          </p>
          <p>
          Wednesday - Saturday 12-6pm<br /> 
          By Appointment Only          
          </p>
        </div>
        <div class="forms">
          <form class="search">
            <div class="input">
              <input id="search" placeholder="search" type="text">
            </div>
            <input type="submit">
          </form>

          <form class="newsletter">
            <div class="input">
              <input id="newsletter" placeholder="Newsletter Signup" type="text" />
            </div>
            <input type="submit" />
          </form>          
        </div>
      </div>
      <div class="container footer-row">
        <ul class="legal-menu">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
        <div class="copyright">
          ©2020 Subliminal Projects 
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Logo from '~/components/Logo';
import Nav from '~/components/Nav';
export default {
  data() {
    return {
      open: false,
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
  }  
}
</script>

<style lang="scss" scoped>
  .header-push {
    padding-top: 150px;
    @include breakpoint(small) {
      padding-top: 75px;
    }
  }
  header {
    position: fixed;
    background: $light;
    top: 0;
    width: 100%;
    z-index: 5000;
    padding: $factor*.125 $factor;
    @include breakpoint(small) {
      width: 100%;
      padding: 0;
      margin: 0;
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
        .sub {
          display: block;
        }
      }
    }
    a {
      color: $dark;
      text-decoration: none;
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
            color: $grey;
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
      p {
        margin-bottom: $factor*.5;
        &:last-of-type {
          margin-bottom: 0;
        }
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