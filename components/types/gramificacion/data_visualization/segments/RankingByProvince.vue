<template>
  <div>
    <v-row>
      <!-- MOST RELEVANT -->
      <v-col
        cols="12"
        lg="6"
        class="transition ease-in duration-1000 delay-300"
      >
        <span class="text-sm text-blue-900 font-bold">Más relevantes</span>

        <div
          v-for="relevant_foco, index in ranking_by_province[
            activeProvince
          ].ranking.slice(0, 16)"
          :key="relevant_foco.winner_id"
          :class="[
            'relative bg-red-500 my-2 px-4 py-2 cursor-pointer',
            activeMission == null
              ? 'opacity-100'
              : opacity(relevant_foco.winner_mision_id),
          ]"
          @mouseover="activeFoco = relevant_foco.winner_id"
          @mouseleave="activeFoco = null"
        >
          <span :class="['text-xs text-white font-bold']">
            {{ relevant_foco.winner_title }}
          </span>

          <div
            v-if="activeFoco == relevant_foco.winner_id"
            class="bg-slate-700 text-white absolute bottom-8 right-16 z-50 px-4 py-3 w-[250px]"
          >
            <span class="block mb-4 text-xs font-bold">
              {{ relevant_foco.winner_title }}
            </span>

            <div>
              <div class="flex justify-between">
                <span class="text-[14px] font-bold text-slate-300">Ranking</span>
                <span class="text-[14px]">{{ index + 1 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-[14px] font-bold text-slate-300">Aceptación</span>
                <span class="text-[14px]">{{ parseFloat(relevant_foco.normalized_skill).toFixed(2) }}</span>
              </div>
          </div>
          </div>
        </div>
      </v-col>
      <!-- MOST RELEVANT -->

      <!-- LESS RELEVANT -->
      <v-col cols="12" lg="6">
        <span class="text-sm text-blue-900 font-bold">Menos relevantes</span>
        <div
          v-for="irrelevant_foco in ranking_by_province[
            activeProvince
          ].ranking.slice(17, 32)"
          :key="irrelevant_foco.winner_id"
          :class="[
            'bg-blue-900 my-2 px-4 py-2',
            activeMission == null
              ? 'opacity-100'
              : opacity(irrelevant_foco.winner_mision_id),
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
    ranking_by_province() {
      return this.$store.getters["gamificacion/ranking_by_province"];
    },
  },
};
</script>

<style></style>
