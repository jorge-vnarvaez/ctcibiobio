<template>
  <div
    class="py-10 h-full grey lighten-4"
    :style="{ padding: $vuetify.breakpoint.mobile ? '15% 7%' : '3% 7%' }"
  >
    <v-container>
      <div v-if="documents.length > 0" class="pb-6 pb-lg-16">
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

    <v-divider class="my-16"></v-divider>

    <v-container>

      <span class="block text-[14px] lg:text-xl lg:text-center text-blue-900"
        >Listado de recursos</span
      >
      <span
        class="block pb-6 pb-lg-8 text-lg lg:text-4xl mb-8 text-blue-900 font-bold lg:text-center"
        >Material complementario</span
      >

          <v-card color="grey-lighten-4" elevation="8" rounded="xl" flat>
              <v-row>
                <v-col cols="12" lg="3">
                    <div class="flex flex-col">
                      <div
                      v-for="documentType, index in documentTypes" :key="documentType.id"
                      @click="activeType = documentType.filter"
                      :class="[
                        'pa-6 cursor-pointer',
                        index == 0 ? 'rounded-tl-[24px]' : '',
                        activeType == documentType.filter ? 'active' : 'inactive'
                      ]">
                        <span>
                          {{ documentType.label }}
                        </span>
                      </div>
                    </div>
                </v-col>

                <v-col cols="12" lg="9">
                  <div class="pa-4 pa-lg-8">
                    <v-row v-if="materials.length > 0">
                      <TypesDocumentosMaterialCard
                        v-for="material in materials"
                        :key="material.id"
                        :material="material"
                      ></TypesDocumentosMaterialCard>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
          </v-card>

      <!-- <div v-if="materials.length > 0">
        <v-row class="my-12">
          <TypesDocumentosMaterialCard
            v-for="material in materials"
            :key="material.id"
            :material="material"
          ></TypesDocumentosMaterialCard>
        </v-row>
      </div> -->

      <!-- <div
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
      </div> -->
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
  data() {
    return {
      documentTypes: [
        { id: 1, label: "Reportes nacionales", filter: "Reporte nacional" },
        // { id: 2, label: "Reportes internacionales", filter: "Reporte internacional" },
        { id: 3, label: "Entregables del proyecto", filter: "Entregable del proyecto" },
      ],
      activeType: 'Reporte nacional',
    };
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
      const materials = this.$store.getters["documento/getMaterials"];

      return materials.filter((material) => {
        return material.type == this.activeType;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  @apply font-bold;
  @apply text-blue-800;
  @apply bg-white;
  @apply shadow-2xl;
}

.inactive {
  @apply text-gray-400;
  @apply bg-gray-100;
}
</style>
