<template>
  <div id="page-info" class="container">
    <section class="hero grid">
      <div class="quote-wrap">
        <div class="quote">
          The driving principle of Subliminal Projects is that art should be accessible to everyone and that art can come from many different per- spectives and cultural niches. Good art is good art, whether it’s done on an album cover, a skateboard, canvas, or found cardboard.
        </div>
        <div class="attr">– Shepard Fairey</div>
      </div>
      <div class="img">
        <img src="https://subliminalprojects.d-e-v.group/wp-content/uploads/2020/02/IMG_2856-1591x1600.jpg" alt="">
      </div>
    </section>
    <section class="about">
      Subliminal Projects is a multi-functional project space and gallery established by Shepard Fairey and Blaize Blouin in 1995 as a way to introduce skateboard culture and design to the art world. The concept grew and found roots later in Los Angeles, at a time when many artists found themselves shut out by the “art scene.” Subliminal Projects emerged as a gallery that championed emerging and marginalized artists, built out of cultural importance to serve as a center for the community to openly express and spark dialogue about art, music and activism. Now located in the historic neighborhood of Echo Park, Subliminal Projects continues to offer a platform for artistic exploration and innovation.
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

    </section>
  </div>
</template>

<style lang="scss" scoped>
  section {
    margin-bottom: $factor;
  }
  .hero {
    align-items: center;
    .quote-wrap {
      width: 48.5%;
    }
    .img {
      width:50%;
    }
  }
  .contact {
    .collabs {
      text-align: right;
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