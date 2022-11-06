<template lang="">
  <v-app>
    <v-main>
      <NavHeader />
      <div class="pb-[150px]">
        <Nuxt />
      </div>
      <NavFooter />
    </v-main>
  </v-app>
</template>
<script>
export default {
  async fetch() {
    await this.$store.dispatch('eventos/loadEventos')
    await this.$store.dispatch('noticias/loadNoticias')
    await this.$store.dispatch('noticias/loadFeaturedNoticias')
    // Carga de capítulos de modelo estratégico
    // await this.$store.dispatch('capitulos/loadCapitulos')
  }
}
</script>
<style lang="">
  
</style>