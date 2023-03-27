<template>
  <v-app light v-if="errorPage">
    <div class="flex h-screen align-center justify-center">
      <div class="w-8/12 flex flex-col align-center justify-center space-y-8">
        <div>
          <v-img src="/illustration/10.png" width="200" height="400">

          </v-img>
        </div>

        <span class="block text-center text-slate-500"
          >El contenido de la página {{ errorPage.from_text }} se ha movido a
          {{ errorPage.to_text }}. </span
        >

        <span class="block text-slate-400 text-center w-6/12">
          Lamentamos sinceramente cualquier inconveniente
          que puedas haber experimentado durante tu visita a nuestro sitio.
          Nuestro objetivo principal es brindarte una experiencia
          excepcional.
        </span>

        <v-btn outlined :to="errorPage.to">Visitar {{ errorPage.to_text }}</v-btn>

      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "Página no encontrada",
      otherError: "Ha ocurrido un error",
      replaces: [
        {
          from: "/estrategia",
          to: "/acerca_del_proyecto",
          from_text: "Estrategia",
          to_text: "Acerca del proyecto",
          descripcion:
            "La página de estrategia se ha reemplazado por la página de Acerca del proyecto",
        },
        {
          from : "/hoja_de_ruta",
          to : "/comunidad",
          from_text : "Hoja de ruta",
          to_text : "Comunidad",
        }
      ],
      pageWithError: null,
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  mounted() {
    this.pageWithError = this.$route.path;
  },
  computed: {
    errorPage() {
      return this.replaces.find((page) => page.from === this.pageWithError);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
