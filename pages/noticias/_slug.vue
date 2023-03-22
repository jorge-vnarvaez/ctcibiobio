<template>
  <div class="max-w-screen-xl mx-auto" v-if="noticia">
    <div :class="$vuetify.breakpoint.mobile ? 'py-0' : 'pt-12'">
      <v-img
        v-if="noticia.featured_image"
        height="520px"
        :src="$config.apiAssetsV2 + noticia.featured_image.filename_disk"
      ></v-img>
    </div>

    <v-container v-if="noticia" :style="{  padding: $vuetify.breakpoint.mobile ? '15% 7%' : '3% 0%' }">
      <div class="mb-6 flex space-x-2" v-if="noticia.date_published">
        <font-awesome-icon :icon="['fas', 'calendar-days']" style="color: #00bfff;"  class="w-6 h-6"/>
        <span class="text-slate-600">
          {{ $moment(noticia.date_published).format('DD MMMM YYYY') }}
        </span>
      </div>
      <div class="text-[20px] lg:text-3xl text-blue-900 font-bold mb-2">
        {{ noticia.title }}
      </div>

      <div
        class="text-[16px] lg:text-xl font-bold italic text-slate-600 font-sans my-4"
      >
        {{ noticia.excerpt }}
      </div>

      <div
        v-html="noticia.body"
        class="text-[14px] lg:text-lg text-slate-500"
      ></div>
    </v-container>

    <!-- <pre>{{noticia}}</pre> -->
  </div>
</template>
<script>
// import {marked} from 'marked';

export default {
  head() {
    return {
      title: "Noticia",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Noticia singular",
        },
      ],
    };
  },
  data() {
    return {
      noticia: null,
    };
  },
  computed: {},
  /**
   * @param {object} context.params entrega información de la ruta configurada en el sistema de archivos
   * @param {object} context.query entrega información de la ruta obtenida de los parámetros GET de la url
   * @returns {boolean} Verifica la validez de la ruta proveida. En caso de aprobado, la ruta continua, sino se da error 404
   */
  validate(context) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(context.params.slug);
  },
  activated() {
    // Llamar fetch nuevamente si se hizo hace más de 30 segundos
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    let params = this.$objectToQueryString({
      fields: ["*.*"],
      filter: {
        slug: {
          _eq: this.$nuxt.$route.params.slug,
        },
      },
      limit: 1,
    });

    let qUrl = `${this.$config.apiUrlV2}/items/posts?${params}`;

    this.noticia = await fetch(qUrl).then((res) => res.json());

    if (
      typeof this.noticia.data !== "undefined" &&
      this.noticia.data.length > 0
    ) {
      this.noticia = this.noticia.data[0];
    } else {
      this.noticia = null;
    }
  },
};
</script>
<style lang=""></style>
