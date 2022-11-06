<template>
  <div>
    <div>Capítulo específico</div>
    <div>{{capitulo}}</div>
  </div>
</template>
<script>
export default {
  head(){
    return {
      title: 'Capítulo',
      meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Capítulo singular'
          }
      ],
    }  
  },
  data(){
    return {
      capitulo: null,
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
    this.capitulo = await fetch(
      `${this.$config.apiUrl}/api/capitulos/${this.$nuxt.$route.params.slug}?populate=featuredImage,gallery`
    ).then(res => res.json())
  }

}
</script>
<style lang="">
  
</style>