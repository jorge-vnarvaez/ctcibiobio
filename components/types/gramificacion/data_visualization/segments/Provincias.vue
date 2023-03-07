<template>
  <div class="col-span-12" v-if="tfProvincias.length > 0">
    <v-card class="px-8 py-6">
      <span class="block text-lg">b. Participantes según provincia</span>

      <div class="grid grid-cols-12 gap-y-12 lg:gap-y-0">
        <div
          class="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col lg:flex-row justify-center align-center lg:space-x-4 mt-4"
          v-for="province in provinces"
          :key="province.id"
        >
          <div>
            <v-img
              :src="`/provinces/${province.img}`"
              width="150"
              height="150"
              contain
            >
            </v-img>
          </div>

          <div v-if="getTotalParticipants(province.slug)">
            <span class="block text-center font-black text-xl">{{ province.name }}</span>
            <div class="flex">
              <font-awesome-icon icon="fa-solid fa-person" class="h-8 w-8" />
              <span class="text-3xl font-bold">{{ getTotalParticipants(province.slug).value }}</span>
            </div>
            <span class="block text-center text-sm font-ligth">Participantes</span>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("gamificacion/setActiveProvince", 3);
  },
  methods: {
    getTotalParticipants(province_slug) {
      return this.tfProvincias.find((item) => item.name === province_slug);
    },
  },
  computed: {
    plotWidth() {
      return this.$vuetify.breakpoint.mobile ? 150 : 300;
    },
    plotHeight() {
      return this.$vuetify.breakpoint.mobile ? 150 : 300;
    },
    tfProvincias() {
      return this.$store.getters["gamificacion/tf_provincias"];
    },
    participantsActiveProvince() {
      return this.tfProvincias.find(
        (item) => item.name === this.activeProvince.slug
      );
    },
    provinces() {
      return this.$store.getters["gamificacion/provinces"];
    },
    activeProvince() {
      return this.$store.getters["gamificacion/activeProvince"];
    },
  },
};
</script>

<style></style>
