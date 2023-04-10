<template>
  <div>
    <v-row>
      <!-- MOST RELEVANT -->
      <v-col cols="12" lg="6" md="6">
        <span class="text-sm text-blue-900 font-bold">Más relevantes</span>
        <TypesGramificacionFoco
          v-for="relevant_foco, index in ranking_by_gender[activeGenre].ranking.slice(0, 16)"
          :key="relevant_foco.winner_id"
          :foco="relevant_foco"
          :index="index"
          :activeMission="activeMission"
        >
        </TypesGramificacionFoco>
      </v-col>
      <!-- MOST RELEVANT -->

      <!-- LESS RELEVANT -->
      <v-col cols="12" lg="6">
        <span class="text-sm text-blue-900 font-bold">Menos relevantes</span>
        <TypesGramificacionFoco
          v-for="irrelevant_foco, index in ranking_by_gender[
            activeGenre
          ].ranking.slice(17, 32)"
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
    activeGenre: {
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
      activeFoco: null
    }
  },
  methods: {
    opacity(mission_id) {
      if (this.activeMission == mission_id) {
        return "opacity-100";
      } else {
        return "opacity-50";
      }
    },
    cursor_status(mission_id) {
      if (this.activeMission == mission_id) {
        return "cursor-pointer";
      } else {
        return "cursor-not-allowed";
      }
    },
    visibility(mission_id) {
      if (this.activeMission == mission_id) {
        return "visible";
      } else {
        return "hidden";
      }
    },
  },
  computed: {
    ranking_by_gender() {
      return this.$store.getters["gamificacion/ranking_by_gender"];
    },
  },
};
</script>

<style></style>
