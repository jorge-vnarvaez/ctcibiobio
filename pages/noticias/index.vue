<template lang="">
  <div class="max-w-screen-xl mx-auto pt-[35px]">
    <div v-if="noticias">
      <!-- Data noticias -->
      <div v-if="noticias.data">
        <v-container>
          <div id="noticias-wrapper">
            <!-- Tarjeta Noticia -->
            <TypesNoticiaCard
              v-for="(noticia, index) in noticias.data"
              :key="index"
              :noticia="noticia"
            ></TypesNoticiaCard>
            <!-- Tarjeta Noticia -->
          </div>
        </v-container>
        <!-- <pre>{{noticias.data}}</pre> -->
      </div>
      <!-- Data noticias -->

      <!-- No hay noticias con los parámetros solicitados -->
      <div v-else>Error</div>
      <!-- No hay noticias con los parámetros solicitados -->
    </div>
    <div v-else>No noticias</div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Noticias",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Publicaciones y anuncios del proyecto",
        },
      ],
    };
  },
  computed: {
    noticias() {
      return this.$store.state.noticias.noticias;
    },
  },
  // activated() {
  //     // Llamar fetch nuevamente si se hizo hace más de 30 segundos
  //     if (this.$fetchState.timestamp <= Date.now() - 30000) {
  //       this.$fetch()
  //     }
  // },
  // async fetch() {
  //   this.noticias = await fetch(
  //     'http://localhost:1337/api/posts?populate=*'
  //   ).then(res => res.json())
  // }
};
</script>
<style lang="scss">
#noticias-wrapper {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
  }
}
</style>
