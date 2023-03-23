<template>
  <div
    class="py-10 h-full grey lighten-4"
    :style="{ padding: $vuetify.breakpoint.mobile ? '15% 7%' : '3% 7%' }"
  >
    <v-container>
      <div v-if="documents.length > 0">
        <div class="flex flex-col align-center justify-center">
          <span class="block text-2xl lg:text-5xl text-blue-900 font-bold"
            >Documento</span
          >
          <span
            class="block text-center my-8 text-sm lg:text-base w-full lg:w-7/12 text-blue-900 font-bold"
          >
            ¡Bienvenido al documento oficial de la Estrategia de CTCI (ciencia,
            tecnología, conocimiento e innovación) para la Región del Biobío!
            Aquí encontrarás un informe detallado que describe los capítulos de
            este gran proyecto. Abordamos el contexto, la metodología,
            revisiones bibliográficas, campañas de sociabilización y más.
            Nuestro documento te brindará una visión completa y detallada del
            proceso completo de esta estrategia para la octava región.
          </span>

          <v-btn color="#068AC6" rounded elevation="0" class="px-6 py-6">
            <a
              :href="
                $config.apiUrlV2 +
                '/assets/' +
                parent_document.file +
                '?download'
              "
            >
              <span class="block text-white text-xs font-bold"
                >Ver documento aquí</span
              >
            </a>
          </v-btn>
        </div>

        <v-row class="my-12">
          <TypesDocumentosFeaturedCard
            v-for="document in documents"
            :key="document.id"
            :document="document"
          ></TypesDocumentosFeaturedCard>
        </v-row>
      </div>

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
          ¡Mantente atent@! Dentro de muy poco estaremos disponibilizando un
          documento detallado con las etapas más relevantes del proyecto en
          Ciencia, Tecnología, Conocimiento e Innovación en la Región del
          Biobío.
        </span>
      </div>
    </v-container>

    <v-container>
      <span
        class="block text-lg lg:text-4xl mb-8 text-blue-900 font-bold text-center"
        >Material complementario</span
      >

      <div v-if="materials.length > 0">
        <v-row class="my-12">
          <TypesDocumentosMaterialCard
            v-for="material in materials"
            :key="material.id"
            :material="material"
          ></TypesDocumentosMaterialCard>
        </v-row>
      </div>

      <div
        v-if="materials.length == 0"
        class="flex flex-col align-center justify-center mt-12"
      >
        <font-awesome-icon
          icon="fa-sharp fa-solid fa-clock-three"
          class="w-12 h-12"
          style="color: #9ca3af"
        />
        <span
          class="block text-center text-xs lg:text-base font-thin text-gray-400 w:full lg:w-5/12 mt-8"
        >
          ¡Mantente atent@! Dentro de muy poco estaremos disponibilizando
          material complementario relacionado a la estrategia de CTCI en la
          región.
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
    await store.dispatch("documento/loadMaterials");
  },
  computed: {
    documents() {
      return this.$store.getters["documento/getDocuments"];
    },
    parent_document() {
      return this.$store.getters["documento/getParentDocument"];
    },
    materials() {
      return this.$store.getters["documento/getMaterials"];
    },
  },
};
</script>

<style></style>
