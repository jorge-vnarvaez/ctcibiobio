<template>
  <v-app>
    <div v-if="!contentWasRendered" class="app">
      <PageLoader />
    </div>

    <v-main v-if="contentWasRendered" class="app">
      <NavHeader />
      <div>
        <Nuxt />
      </div>
      <NavFooter />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      contentWasRendered: false
    }
  },
  async fetch() {
    // Carga de capítulos de modelo estratégico
    await this.$store.dispatch('capitulos/loadCapitulos')
  },
  async beforeMount() {
     await Promise.all([this.$store.dispatch('noticias/loadNoticias')]).then((res) => {
      setTimeout(() => {
        this.contentWasRendered = true;
      }, 2000)
    })
  }
}
</script>
<style>
.app {
  font-family: 'Titillium Web', sans-serif;
}
</style>