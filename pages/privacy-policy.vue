<template>
  <div v-if="page" class="container">
    <h1>{{page.title}}</h1>
    <div class="content formatted-content" v-html="page.content"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  head () {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo)
      }    
    }
  },    
  apollo: {
    page: {  
      result({data}) {
      },
      error: function(error) {
        console.log(error)
      }, 
      query: gql`
        query InfoPageQuery {
          page(id: "69191", idType: DATABASE_ID) {
            id
            title
            content(format: RENDERED)
            ${metaGql}              
          }
        }
      `
    }
  }  
}
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 2rem;
    padding: $factor 0 $factor*0.5;
  }
</style>