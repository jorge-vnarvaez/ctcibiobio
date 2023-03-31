<template>
  <div class="py-16 bg-gradient-to-r from-slate-100 to-zinc-100">
    <v-container>
      <span class="block text-xl lg:text-4xl text-slate-900 font-bold mb-12"
        >Priorización en cifras</span
      >

      <div class="grid grid-cols-12 lg:gap-x-8 gap-y-8" >
        <span class="col-span-12 text-sm lg:text-xl lg:leading-loose">
          <span class="font-semibold">a. Participantes según género:</span> La distribución de participantes en la priorización de focos
          según su género (masculino, femenino, otro, prefiere no decirlo).
          <span class="font-semibold">b. Participantes según provincia:</span> La distribución de participantes en la priorización de
          focos de acuerdo a la provincia en la que reside. <span class="font-semibold">c.
          Participantes según rango de edad:</span> La distribución de participantes en
          la priorización de focos en determinados rangos de edad.
        </span>

         <TypesGramificacionDataVisualizationSegmentsParticipantes v-if="!loadingChartsVisualizations"></TypesGramificacionDataVisualizationSegmentsParticipantes>
         <TypesGramificacionDataVisualizationSegmentsParticipantesEdad v-if="!loadingChartsVisualizations"></TypesGramificacionDataVisualizationSegmentsParticipantesEdad>
         <TypesGramificacionDataVisualizationSegmentsProvincias v-if="!loadingChartsVisualizations"></TypesGramificacionDataVisualizationSegmentsProvincias>
         <!-- <TypesGramificacionDataVisualizationSegmentsRanking></TypesGramificacionDataVisualizationSegmentsRanking> -->
         <!-- <TypesGramificacionDataVisualizationStackedBarsMissionsByGender></TypesGramificacionDataVisualizationStackedBarsMissionsByGender>
         <TypesGramificacionDataVisualizationStackedBarsMissionsByProvince></TypesGramificacionDataVisualizationStackedBarsMissionsByProvince> -->
         <!-- <TypesGramificacionDataVisualizationDispersionsGenderDispersion></TypesGramificacionDataVisualizationDispersionsGenderDispersion> -->
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      loadingChartsVisualizations: true,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  mounted() {
      this.loadingChartsVisualizations = false;
  },
  async fetch() {
    await Promise.all([
      this.$store.dispatch("gamificacion/loadTotalParticipants"),
      this.$store.dispatch("gamificacion/loadMatchsLength"),
      this.$store.dispatch("gamificacion/loadTfParticipantes"),
      this.$store.dispatch("gamificacion/loadTfEdadParticipantes"),
      this.$store.dispatch("gamificacion/loadTfProvincias"),
    ])
  },
  computed: {
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-12";
        case "sm":
          return "col-span-12";
        case "md":
          return "col-span-3";
        case "lg":
          return "col-span-3";
        case "xl":
          return "col-span-2";
      }
    },
  },
};
</script>

<style></style>
