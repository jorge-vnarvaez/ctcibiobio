<template>
  <div>
    <v-row>
      <!-- MOST RELEVANT -->
      <v-col cols="12" lg="6" md="12">
        <span class="text-sm text-blue-900 font-bold">Más relevantes</span>

        <TypesGramificacionFoco
          v-for="(relevant_foco, index) in ranking_by_province[activeProvince].ranking.slice(0, 16)"
          :key="relevant_foco.winner_id"
          :foco="relevant_foco"
          :index="index"
          :activeMission="activeMission"
        ></TypesGramificacionFoco>
      </v-col>
      <!-- MOST RELEVANT -->

      <!-- LESS RELEVANT -->
      <v-col cols="12" lg="6" md="12">
        <span class="text-sm text-blue-900 font-bold">Menos relevantes</span>
        <TypesGramificacionFoco
          v-for="(irrelevant_foco, index) in ranking_by_province[
            activeProvince
          ].ranking.slice(16, 32)"
          :key="irrelevant_foco.winner_id"
          :foco="irrelevant_foco"
          :index="index"
          :irrelevant="true"
          :activeMission="activeMission"
          >
        </TypesGramificacionFoco>
      </v-col>
      <!-- LESS RELEVANT -->
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    activeProvince: {
      type: String,
      default: null,
    },
    activeMission: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      activeFoco: null,
    };
  },
  computed: {
    ranking_by_province() {
      return this.$store.getters["gamificacion/ranking_by_province"];
    },
  },
};
</script>

<style></style>
