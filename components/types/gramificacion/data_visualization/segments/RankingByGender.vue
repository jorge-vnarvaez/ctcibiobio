<template>
  <div>
    <v-row>
      <!-- MOST RELEVANT -->
      <v-col
        cols="12"
        lg="6"
        class="transition ease-in duration-1000 delay-300"
      >
        <span class="text-sm text-blue-900 font-bold"> Más relevantes </span>
        <div
          v-for="relevant_foco in ranking_by_gender[activeGenre].ranking.slice(
            0,
            16
          )"
          :key="relevant_foco.winner_id"
          :class="[
            'bg-red-500 my-2 px-4 py-2',
            activeMission == null
              ? 'opacity-100'
              : opacity(relevant_foco.winner_mision_id),
          ]"
        >
          <span class="text-xs text-white font-bold">
            {{ relevant_foco.winner_title }}
          </span>
        </div>
      </v-col>
      <!-- MOST RELEVANT -->

      <!-- LESS RELEVANT -->
      <v-col cols="12" lg="6">
        <span class="text-sm text-blue-900 font-bold"> Menos relevantes </span>
        <div
          v-for="irrelevant_foco in ranking_by_gender[
            activeGenre
          ].ranking.slice(17, 32)"
          :key="irrelevant_foco.winner_id"
          :class="[
            'bg-blue-900 my-2 px-4 py-2',
            activeMission == null
              ? 'opacity-100'
              : opacity(irrelevant_foco.winner_mision_id)
          ]"
        >
          <span class="text-xs text-white font-bold">
            {{ irrelevant_foco.winner_title }}
          </span>
        </div>
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
  },
  computed: {
    ranking_by_gender() {
      return this.$store.getters["gamificacion/ranking_by_gender"];
    },
  },
};
</script>

<style></style>
