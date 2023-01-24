<template>
  <div class="py-10 h-full">
    <v-container>
      <div class="flex flex-col align-center justify-center">
        <span class="block text-3xl lg:text-5xl">Documento</span>
        <span
          class="block text-center mt-8 text-sm lg:text-base w-full lg:w-7/12"
        >
          ¡Bienvenido al repositorio del proyecto CTCI de ciencia, tecnología,
          conocimiento e innovación! Aquí encontrará un documento detallado que
          describe las etapas más relevantes del proyecto. Desde la
          investigación inicial y el diseño del proyecto hasta la implementación
          y evaluación de los resultados, nuestro documento le brindará una
          visión completa y detallada del proceso completo del proyecto CTCI en
          ciencia, tecnología, conocimiento e innovación de la Región del
          Biobío.
        </span>
      </div>

      <div
        class="grid grid-cols-12 lg:gap-x-8 gap-y-8 mt-10"
        v-if="documents.length > 0"
      >
        <div v-for="document in documents" :key="document.id" :class="col_span">
          <v-card class="p-6" flat>
            <!-- FEATURED IMAGE -->
            <v-img v-if="document.featured_image"> </v-img>

            <div
              v-if="!document.featured_image"
              class="bg-slate-300 w-full h-[250px]"
            ></div>
            <!-- FEATURED IMAGE -->

            <!-- TITLE -->
            <span class="block mt-4 font-semibold">{{ document.title }}</span>
            <!-- TITLE -->

            <!-- EXCERPT -->
            <span
              v-html="document.excerpt"
              class="text-xs lg:text-sm block h-28 mt-2"
            ></span>
            <!-- EXCERPT -->

            <!-- BUTTON -->
            <div class="flex justify-end" v-if="document.file">
              <a
                :href="
                  $config.apiUrlV2 + '/assets/' + document.file + '?download'
                "
              >
                <v-btn outlined color="red" class="mt-6"> Descargar PDF </v-btn>
              </a>
            </div>

            <!-- BUTTON -->
          </v-card>
        </div>
      </div>

      <div v-if="documents.length == 0" class="flex flex-col align-center justify-center mt-12">
        <font-awesome-icon icon="fa-solid fa-hourglass-start" class="w-12 h-12" style="color: #9ca3af"/>
        <span class="block text-center text-xs lg:text-base font-thin text-gray-400 w:full lg:w-5/12 mt-8">
          ¡Mantente atento! Dentro de muy poco estaremos disponibilizando un documento
          detallado con las etapas más relevantes del proyecto en Ciencia,
          Tecnología, Conocimiento e Innovación en la Región del Biobío.
        </span>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch("documento/loadDocuments");
  },
  computed: {
    documents() {
      return this.$store.getters["documento/getDocuments"];
    },
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-12";
        case "sm":
          return "col-span-12";
        case "md":
          return "col-span-6";
        case "lg":
          return "col-span-4";
        case "xl":
          return "col-span-3";
      }
    },
  },
};
</script>

<style></style>
