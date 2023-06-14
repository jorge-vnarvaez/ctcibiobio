<template>
  <div>
    <TypesCallsToActionPrincipal></TypesCallsToActionPrincipal>
    <!-- <InfoUltimaNoticiaDestacada></InfoUltimaNoticiaDestacada> -->

    <LazyInfoNoticiasEventos></LazyInfoNoticiasEventos>

    <LazyInfoCifras></LazyInfoCifras>

    <v-overlay
      :value="overlay"
      :style="{ display: 'flex', flexDirection: 'column', padding: $vuetify.breakpoint.mobile ? '3% 7%' : '3% 7%', 'z-index': 1000 }"
    >
      <div
        class="bg-white drop-shadow-xl rounded-full h-8 w-8 flex align-center justify-center absolute z-50 -top-4 -right-2 cursor-pointer"
        @click="$store.commit('modals/setModalPriorizationStatus', false)"
      >
        <v-icon color="black">mdi-close</v-icon>
      </div>
      <div
        class="bg-white rounded-2xl flex flex-col drop-shadow-2xl w-full lg:w-[800px]"
        :style="{ padding: $vuetify.breakpoint.mobile ? '10% 10%' : '8% 7%' }"
      >
        <span class="block text-gray-500 text-[18px] lg:text-xl text-center font-bold">Taller de objetivos y proyectos para la Estrategia de CTCI Biobío</span>
        <span class="block text-gray-400 text-[14px] lg:text-lg text-center mt-2">Te invitamos a participar y colaborar en la identificación de iniciativas que podrían incluirse en el portafolio de la Estrategia de CTCI Biobío.</span>
        <div class="mt-4">
          <div class="flex justify-center space-x-2">
            <span class="block text-center text-blue-800 text-[12px] lg:text-[16px]">Jueves 22/06 - 09 hrs</span>
          </div>
          <div class="flex justify-center">
            <span class="block text-center text-pink-600 0 text-[12px] lg:text-[16px]">
              Auditorio de INACAP Los Ángeles
              Av. Ricardo Vicuña 825
            </span>
          </div>
        </div>
        
        <div class="flex align-center justify-center my-8">
          <v-img src="/illustration/22.svg" v-if="$vuetify.breakpoint.mobile" height="200" contain></v-img>

          <div>
            <v-img src="/illustration/22.svg" width="200" height="200" contain v-if="!$vuetify.breakpoint.mobile"></v-img>
          </div>
        </div>

        <div class="flex justify-center">
          <v-btn color="#EB646B" rounded elevation="0" to="/gamificacion">
            <span class="text-[10px] lg:text-[14px] text-white">¡Quiero inscribirme! </span>
          </v-btn>
        </div>
      </div>
    </v-overlay>

    <!-- Podcasts -->
    <LazyInfoPodcasts></LazyInfoPodcasts>
    <!-- Podcasts -->

    <!-- Infografías -->
    <LazyInfoInfografias></LazyInfoInfografias>
    <!-- Infografías -->

    <!-- Organizaciones -->
    <div class="my-16">
      <LazyInfoOrganizacionesBlack></LazyInfoOrganizacionesBlack>
    </div>
    <!-- Organizaciones -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      absolute: true,
    };
  },
  computed: {
    overlay() {
      return this.$store.getters["modals/modal_priorization"];
    },
  },
};
</script>
<style>

</style>
