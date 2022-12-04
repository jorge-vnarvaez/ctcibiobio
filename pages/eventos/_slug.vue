<template>
  <div class="max-w-screen-xl mx-auto pt-[35px]">
    <v-container v-if="evento">
      <div class="text-h3 font-weight-bold">{{evento.title}}</div>
      <div v-if="evento.date_start" class="font-sans font-bold mb-4 text-blue-500">
        <span>{{fechaEvento}}</span>
        <span>{{this.$moment(evento.date_start).format('H:mm')}}</span>
        <span v-if="evento.date_end"> - </span>
        <span v-if="evento.date_end">{{this.$moment(evento.date_end).format('H:mm')}}</span>
      </div>
      
      <v-img 
      v-if="evento.featured_image"
      height="500px"
      :src="$config.apiAssetsV2 + evento.featured_image.filename_disk"></v-img>
      <div class="text-2xl font-sans my-4">{{evento.excerpt}}</div>
      
      <div v-html="evento.body"></div>

      <div v-if="evento.gallery" class="mt-12">
        
        <v-row>
          <v-col v-for="(foto, foto_key) in evento.gallery" :key="foto_key"
          class="d-flex child-flex"
          :cols="['sm','xs'].includes($vuetify.breakpoint.name) ? 6 : 2">
            <a :href="$config.apiAssetsV2 + foto.directus_files_id.filename_disk" target="_blank">
            <v-img to="/" aspect-ratio="1" :src="$config.apiAssetsV2 + foto.directus_files_id.filename_disk + '?w=200&h=200&f=crop&q=80'" />
            </a>

          </v-col>
        </v-row>
      </div>

    </v-container>
    <!-- <pre>{{evento}}</pre> -->
  </div>
</template>
<script>
// import {marked} from 'marked';

export default {
  head(){
    return {
      title: 'Evento',
      meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Evento singular'
          }
      ],
    }  
  },
  data(){
    return {
      evento: null,
    }
  },
  computed: {
   fechaEvento(){
      let targetStartDate = this.evento.date_start
      let targetEndDate = this.evento.date_end
      let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let targetStartDateMonth = targetStartDate ? this.$moment(targetStartDate).month() : null
      let targetEndDateMonth = targetEndDate ? this.$moment(targetEndDate).month() : null

      if(targetStartDate){
        if(targetEndDate){
          return `${meses[targetStartDateMonth]} ${this.$moment(targetStartDate).format('DD, YYYY')}`
        }
        if(!targetEndDate){
          return `${meses[targetStartDateMonth]} ${this.$moment(targetStartDate).format('DD, YYYY')}`
        }
      } else {
        return null
      }
    }
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
    
    await this.$axios.get(`/api/items/events`, {
      params: {
        fields: ['*', 'featured_image.*', 'gallery.directus_files_id.*'],
        filter: {
          slug: {
            _eq: this.$nuxt.$route.params.slug
          }
        },
        limit: 1
      }
    }).then(res => {
      if(typeof(res.data.data) !== 'undefined' && res.data.data.length > 0){
        this.evento = res.data.data[0] 
      } else {
        this.evento = null
      }
    }).catch(err => {
      console.log(err)
    })

  }

}
</script>
<style lang="">
  
</style>