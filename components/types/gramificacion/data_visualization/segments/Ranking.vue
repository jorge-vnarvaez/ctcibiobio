<template>
  <div class="col-span-12">
    <v-card class="d-flex flex-column px-8 py-8" style="height: 100%">
      <div class="flex flex-col space-y-8 lg:space-y-0 lg:flex-row justify-between">
        <div>
          <span class="text-lg block">¿Qué focos han sido priorizados por la comunidad?</span>

          <span class="block mb-2 text-slate-400 text-xs">
            Revisa los focos más y menos relevantes que han sido priorizado por
            los segmentos de la comunidad.
          </span>

          <v-chip-group mandatory active-class="bg-slate-900 white--text">
            <v-chip
              v-for="option in options"
              :key="'option_' + option.id"
              class="cursor-pointer"
              label
              @click="activeOption = option.id"
              >{{ option.label }}</v-chip
            >
          </v-chip-group>

          <div class="flex flex-col space-y-2 w-80">
            <v-select
              :disabled="activeOption !== 1"
              v-model="activeProvince"
              :items="provinces"
              :item-text="(provinces) => provinces.label"
              :item-value="(provinces) => provinces.key"
              menu-props="auto"
              hide-details
              prepend-icon="mdi-map"
              single-line
              class="w-40"
            ></v-select>

            <v-select
              :disabled="activeOption !== 2"
              v-model="activeGenre"
              :items="genres"
              :item-text="(genres) => genres.label"
              :item-value="(genres) => genres.key"
              menu-props="auto"
              hide-details
              prepend-icon="mdi-gender-male-female"
              single-line
              class="w-40"
            ></v-select>
          </div>
        </div>

        <div class="flex flex-col align-end border-r-2 border-blue-900">
          <span
            @click="activeMission = null"
            :class="[
              'text-xs px-4 py-2 cursor-pointer',
              activeMission == null
                ? 'bg-blue-900 text-white'
                : 'text-slate-700',
            ]"
            >Todos los temas</span
          >
          <span
            v-for="mission in missions"
            :key="mission.id"
            @click="activeMission = mission.id"
            :class="[
              'text-xs px-4 py-2 cursor-pointer',
              activeMission == mission.id
                ? 'bg-blue-900 text-white'
                : 'text-slate-700',
            ]"
            >{{ mission.label }}</span
          >
        </div>
      </div>

      <div class="mt-6">
        <TypesGramificacionDataVisualizationSegmentsRankingByProvince
          v-if="activeOption === 1"
          :active-province="activeProvince"
          :active-mission="activeMission"
        ></TypesGramificacionDataVisualizationSegmentsRankingByProvince>

        <TypesGramificacionDataVisualizationSegmentsRankingByGender
          v-if="activeOption === 2"
          :active-genre="activeGenre"
          :active-mission="activeMission"
        ></TypesGramificacionDataVisualizationSegmentsRankingByGender>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { id: 1, label: "Provincia" },
        { id: 2, label: "Género" },
      ],
      provinces: [
        { id: 1, label: "Arauco", key: "arauco" },
        { id: 2, label: "Biobío", key: "biobío" },
        { id: 3, label: "Concepción", key: "concepción" },
      ],
      genres: [
        { id: 1, label: "Masculino", key: "masculino" },
        { id: 2, label: "Femenino", key: "femenino" },
        { id: 3, label: "Prefiero no decirlo", key: "prefiero-no-decirlo" },
        { id: 4, label: "Otro", key: "otro" },
      ],
      activeOption: 1,
      activeProvince: "arauco",
      activeGenre: "masculino",
      activeMission: null,
    };
  },
  computed: {
    missions() {
      return this.$store.getters["gamificacion/missions"];
    },
  },
};
</script>

<style></style>
