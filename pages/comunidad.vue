<template>
  <div class="grey lighten-4">
    <div
      class="max-w-screen-xl mx-auto"
      :style="{ padding: $vuetify.breakpoint.mobile ? '5% 7%' : '3% 7%' }"
    >
      <v-container>
        <span class="block text-[14px] lg:text-xl lg:text-center text-blue-900"
          >Comunidad / Participación</span
        >
        <span
          class="block text-[21px] lg:text-4xl lg:text-center text-blue-900 font-bold"
          >Nuestro trabajo con la comunidad</span
        >
      </v-container>
    </div>

    <v-row no-gutters>
      <v-col
        v-for="participant in comunidad"
        :key="participant.id"
        cols="2"
        lg="1"
      >
        <v-img
          v-if="participant.avatar"
          :src="
            $config.apiUrlV2 + '/assets/' + participant.avatar + '?quality=75'
          "
          gradient="to top, rgba(1, 35, 144, 0.4), rgba(1, 35, 144, 0.4)"
        >
        </v-img>
      </v-col>
    </v-row>

    <div
      class="max-w-screen-xl mx-auto"
      :style="{ padding: $vuetify.breakpoint.mobile ? '5% 7%' : '3% 7%' }"
    >
      <v-img src="/img/mapa_de_palabras.svg" class="my-20"></v-img>

      <v-container>
        <div>
          <span
            class="block text-[14px] lg:text-xl lg:text-center text-blue-900"
            >Hoja de Ruta</span
          >
          <span
            class="block text-[21px] lg:text-4xl lg:text-center text-blue-900 font-bold"
            >Conoce el estado de avance</span
          >
        </div>

        <InfoHojaRuta></InfoHojaRuta>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      milestones: null,
      milestoneOpen: null,
    };
  },
  async fetch() {
    await this.$store.dispatch("comunidad/fetchComunidad");
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  computed: {
    comunidad() {
      return this.$store.getters["comunidad/getComunidad"];
    },
  },
};
</script>
<style lang="postcss">
.v-data-footer {
  display: none;
}
</style>
