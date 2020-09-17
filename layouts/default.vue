<template>
  <div>
    <header>
      <Logo class="logo" />
      <nav>
        Nav
      </nav>
    </header>
    <Nuxt />
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
export default {
  components: {
    Logo
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
      width: 50px;
      background: $light;
      padding: $factor*.125;
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
</style>