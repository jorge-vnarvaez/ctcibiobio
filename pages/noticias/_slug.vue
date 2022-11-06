<template>
  <div class="max-w-screen-xl mx-auto pt-[35px]">
    <v-container v-if="noticia">
      <div class="text-h3 font-weight-bold mb-2">{{noticia.title}}</div>
      <div v-if="noticia.date_start" class="font-sans font-bold mb-4 text-blue-500">
      </div>
      
      <v-img 
      v-if="noticia.featured_image"
      height="500px"
      :src="$config.apiAssetsV2 + noticia.featured_image.filename_disk"></v-img>
      <div class="text-2xl font-sans my-4">{{noticia.excerpt}}</div>
      
      <div v-html="noticia.body"></div>

    </v-container>
  
    <!-- <pre>{{noticia}}</pre> -->
  </div>
</template>
<script>
// import {marked} from 'marked';

export default {
  head(){
    return {
      title: 'noticia',
      meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Noticia singular'
          }
      ],
    }  
  },
  data(){
    return {
      noticia: null,
    }
  },
  computed: {
  },
  /**
   * @param {object} context.params entrega información de la ruta configurada en el sistema de archivos
   * @param {object} context.query entrega información de la ruta obtenida de los parámetros GET de la url
   * @returns {boolean} Verifica la validez de la ruta proveida. En caso de aprobado, la ruta continua, sino se da error 404
   */
  validate(context){
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(context.params.slug)
  },
  activated() {
      // Llamar fetch nuevamente si se hizo hace más de 30 segundos
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
  },
  async fetch() {

    let params = this.$objectToQueryString({
      fields:[
        '*.*'
      ],
      filter: {
        slug: {
          _eq: this.$nuxt.$route.params.slug
        }
      },
      limit: 1
    })
     
    let qUrl = `${this.$config.apiUrlV2}/items/posts?${params}`

    this.noticia = await fetch(qUrl).then(res => res.json())

    if(typeof(this.noticia.data) !== 'undefined' && this.noticia.data.length > 0){
      this.noticia = this.noticia.data[0] 
    } else {
      this.noticia = null
    }
    

  }

}
</script>
<style lang="">
  
</style>