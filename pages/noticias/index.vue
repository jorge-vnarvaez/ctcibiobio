<template>
  <div class="grey lighten-4">
    <div class="max-w-screen-xl mx-auto py-[25px]">
      <div v-if="noticias">
        <v-container>
          <v-row>
            <!-- Tarjeta Noticia -->
            <TypesNoticiaFeaturedCard
              v-for="(noticia, index) in noticias"
              :key="index"
              :noticia="noticia"
            ></TypesNoticiaFeaturedCard>
            <!-- Tarjeta Noticia -->
          </v-row>
        </v-container>
      </div>
    </div>
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
<style lang="scss"></style>
