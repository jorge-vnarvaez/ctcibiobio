<template>
  <div
    class="py-10 h-full grey lighten-4"
    :style="{ padding: $vuetify.breakpoint.mobile ? '15% 7%' : '3% 7%' }"
  >
    <v-container>
      <div class="flex flex-col align-center justify-center">
        <span class="block text-2xl lg:text-5xl text-blue-900 font-bold"
          >Documentos</span
        >
        <span
          class="block text-center my-8 text-sm lg:text-base w-full lg:w-7/12 text-blue-900 font-bold"
        >
          ¡Bienvenido al documento oficial de la Estrategia de CTCI (ciencia,
          tecnología, conocimiento e innovación) para la Región del Biobío! Aquí
          encontrarás un informe detallado que describe los capítulos de este
          gran proyecto. Abordamos el contexto, la metodología, revisiones
          bibliográficas, campañas de sociabilización y más. Nuestro documento
          te brindará una visión completa y detallada del proceso completo de
          esta estrategia para la octava región.
        </span>

        <v-btn color="#068AC6" rounded elevation="0" class="px-6 py-6">
          <a
            :href="
              $config.apiUrlV2 + '/assets/' + parent_document.file + '?download'
            "
          >
            <span class="block text-white text-xs font-bold"
              >Ver documento aquí</span
            >
          </a>
        </v-btn>
      </div>

      <v-row class="my-12">
        <v-col
          v-for="document in documents"
          :key="document.id"
          cols="12"
          lg="4"
        >
          <v-card
            elevation="0"
            :height="$vuetify.breakpoint.mobile ? 218 : 260"
            rounded="xl"
            class="drop-shadow-xl"
          >
            <div class="flex space-x-2">
              <!-- FEATURED IMAGE -->
              <v-img
                v-if="document.featured_image"
                :src="$config.apiUrlV2 + '/assets/' + document.featured_image"
                class="rounded-l-xl"
                width="50%"
                :height="$vuetify.breakpoint.mobile ? 218 : 260"
              >
              </v-img>
              <!-- FEATURED IMAGE -->

              <div class="flex flex-col">
                <!-- TITLE -->
                <span
                  class="block mt-4 font-bold text-[12px] lg:text-sm w-10/12 text-blue-900 h-10"
                  >{{ document.title }}</span
                >
                <!-- TITLE -->

                <!-- EXCERPT -->
                <span
                  v-html="document.excerpt.slice(0, 80)"
                  class="text-[10px] lg:text-sm block h-20 lg:h-28 mt-2 w-11/12"
                ></span>
                <!-- EXCERPT -->

                <!-- BUTTON -->
                <div class="flex pb-6" v-if="document.file">
                  <a
                    :href="
                      $config.apiUrlV2 +
                      '/assets/' +
                      document.file +
                      '?download'
                    "
                  >
                    <v-btn
                      outlined
                      color="#068AC6"
                      class="py-2 px-2"
                      :x-small="$vuetify.breakpoint.mobile"
                      :small="!$vuetify.breakpoint.mobile"
                    >
                      <span class="text-[10px] lg:text-[12px] font-bold">
                        Descargar PDF
                      </span>
                    </v-btn>
                  </a>
                </div>
                <!-- BUTTON -->
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div
        v-if="documents.length == 0"
        class="flex flex-col align-center justify-center mt-12"
      >
        <font-awesome-icon
          icon="fa-solid fa-hourglass-start"
          class="w-12 h-12"
          style="color: #9ca3af"
        />
        <span
          class="block text-center text-xs lg:text-base font-thin text-gray-400 w:full lg:w-5/12 mt-8"
        >
          ¡Mantente atento! Dentro de muy poco estaremos disponibilizando un
          documento detallado con las etapas más relevantes del proyecto en
          Ciencia, Tecnología, Conocimiento e Innovación en la Región del
          Biobío.
        </span>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  header: {
    title: "Documentos",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Documentos",
      },
    ],
  },
  async asyncData({ store }) {
    await store.dispatch("documento/loadDocuments");
  },
  computed: {
    documents() {
      return this.$store.getters["documento/getDocuments"];
    },
    parent_document() {
      return this.$store.getters["documento/getParentDocument"];
    },
  },
};
</script>

<style></style>
