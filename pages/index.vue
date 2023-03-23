<template>
  <div>
    <TypesCallsToActionPrincipal></TypesCallsToActionPrincipal>
    <!-- <InfoUltimaNoticiaDestacada></InfoUltimaNoticiaDestacada> -->

    <LazyInfoNoticiasEventos></LazyInfoNoticiasEventos>

    <transition appear>
    <LazyInfoCifras></LazyInfoCifras>
    </transition>

    <v-overlay
      :value="overlay"
      :style="{ display: 'flex', flexDirection: 'column', padding: $vuetify.breakpoint.mobile ? '5% 7%' : '3% 7%', 'z-index': 1000 }"
    >
      <div
        class="bg-white drop-shadow-xl rounded-full h-8 w-8 flex align-center justify-center absolute z-50 -top-4 -right-2 cursor-pointer"
        @click="$store.commit('modals/setModalPriorizationStatus', false)"
      >
        <v-icon color="black">mdi-close</v-icon>
      </div>
      <div
        class="bg-white rounded-2xl flex flex-col drop-shadow-2xl w-full lg:w-[800px]"
        :style="{ padding: $vuetify.breakpoint.mobile ? '15% 10%' : '8% 7%' }"
      >
        <span class="block text-gray-500 text-[18px] lg:text-xl text-center font-bold"
          >¿Qué focos impulsarán el desarrollo de la ciencia, tecnología,
          conocimiento e innovación en la Región del Biobío?</span
        >

        <div class="flex align-center justify-center my-8">
          <!-- <span class="text-[14px] lg:text-2xl text-slate-400 w-full lg:w-48">
            Ayúdanos a priorizar haciendo click en el botón inferior
          </span> -->

          <v-img src="/illustration/22.svg" v-if="$vuetify.breakpoint.mobile" height="200" contain></v-img>

          <div>
            <v-img src="/illustration/22.svg" width="200" height="200" contain v-if="!$vuetify.breakpoint.mobile"></v-img>
          </div>
        </div>

        <div class="flex justify-center">
          <v-btn color="#EB646B" rounded elevation="0" to="/gamificacion">
            <span class="text-[10px] lg:text-[14px] text-white">¡Quiero priorizar! </span>
          </v-btn>
        </div>
      </div>
    </v-overlay>

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
