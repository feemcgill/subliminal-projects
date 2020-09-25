<template>
  <div>
    <header>
      <!-- <Nav /> -->
      <div v-on:click="close">
        <nuxt-link to="/">
          <Logo   class="logo" />
        </nuxt-link>
      </div>
    <transition name="nav">

      <nav id="main-nav" v-if="open">
        <ul class="main">
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
          <li v-on:click="close"><nuxt-link to="/info" exact tabindex="0">Info</nuxt-link></li>
          <li v-on:click="close"><nuxt-link to="/artists" exact tabindex="0">Artists</nuxt-link></li>  
        </ul>
      </nav>
    </transition>
      <div class="burger-btn" v-on:click="toggle"><div></div><div></div><div></div></div>
      <div class="close-btn" v-on:click="toggle"></div>      
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
              <label for="search">Search</label>
              <input id="search" type="text">
            </div>
            <input type="submit">
          </form>

          <form class="newsletter">
            <div class="input">
              <label for="newsletter">Newsletter Signup</label>
              <input id="newsletter" type="text" />
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
  header {
    position: fixed;
    //background: $light;
    width: 100%;
    z-index: 5000;
    padding: $factor*.125 $factor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $white;
    .logo {
      position: absolute;
      width: 50px;
      background: $light;
      padding: $factor*.125;
      z-index: 10000;
    }
  }
  footer {
    background: $light;
    overflow: hidden;
    padding-top: $factor;
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $factor;
    }
    .address {
      p {
        margin-bottom: $factor*.5;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    .forms {
      display: flex;
      form:first-of-type {
        margin-right: $factor;
      };
      form {
        display: flex;
      }
    }
  }

  .burger-btn {
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 26px;
    right: 15px;
    width: 50px;
    height: 34px;
    cursor: pointer;
    display: flex;
    background-color: $light;
    padding: 5px;
    > div {
      width: 100%;
      height: 5px;
      background-color: $dark;
    }
  }
  #main-nav {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    background: $light;
    display: flex;
    align-items: center;
    justify-content: center;
    ul, li {
      display: block;
    }
    .main {
      width: 40vw;
      font-size: 3em;
      text-align: center;
      font-weight: bold;
      li {

      }
      .sub {
        font-size: 0.5em;
        /* display: flex;
        justify-content: center; */
        li {
          /* border: 2px solid $dark;
          padding: 0 5px; */
          //margin: 0 15px; 
        }
      }
    }
    a {
      color: $dark;
      text-decoration: none;
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