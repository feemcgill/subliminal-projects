<template>
  <div>
    <section class="featured-project container">
      <div class="thumb">
        <div class="img">
          <img src="https://subliminalprojects.d-e-v.group/wp-content/uploads/2017/09/Sarah-Eiseman_Diminished-Reality-1005x1600.jpg" alt="">
        </div>
        <h2>Featured Project</h2>
      </div>
      <div class="info">
        In addition to creating brick and mortar and online art exhibitions, Subliminal Projects curates, consults and produces a multide of projects and collaborations with like-minded brands, retail spaces, event venues and comercial spaces. To inquire on a collaborative project please email info@subliminalprojects.com.
      </div>
    </section>
    <section class="projects container grid">
      <div class="project">
        <div class="img">
          <img src="https://subliminalprojects.d-e-v.group/wp-content/uploads/2014/10/The-drive-in-floods...SML_.jpg" alt="">
        </div>
        <div class="details">
          <h3>Project Title</h3>
        </div>
      </div>
      <div class="project">
        <div class="img">
          <img src="https://subliminalprojects.d-e-v.group/wp-content/uploads/2016/05/NewTranslations-2-1600x1498.jpg" alt="">
        </div>
        <div class="details">
          <h3>Project Title</h3>
        </div>
      </div>
      <div class="project">
        <div class="img">
          <img src="https://subliminalprojects.d-e-v.group/wp-content/uploads/2012/03/Jamie-Reid-Ad-Front.jpg" alt="">
        </div>
        <div class="details">
          <h3>Project Title</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .featured-project {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: $factor * 3;
    .thumb {
      width: 46%;
    }
    .img {
      padding-bottom: 88%;
      position: relative;
      margin-bottom: $factor * 0.5;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      width: 50%;
      font-size: 1.5em;
    }
  }
  .projects {
    .project {
      @include thirds;
      .img {
        position: relative;
        padding-bottom: 100%;
        margin-bottom: $factor * 0.5;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }        
      }
    }
  }
</style>