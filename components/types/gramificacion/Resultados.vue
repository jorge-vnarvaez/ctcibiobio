<template>
  <div class="py-12 bg-gradient-to-r from-slate-100 to-zinc-100">
    <!-- RANKING -->
    <v-container>
      <!-- SORT RANKING -->
      <UtilitariosSortRanking></UtilitariosSortRanking>
      <!-- SORT RANKING -->

      <!-- DESCRIPTION -->
      <span class="text-sm lg:text-xl lg:leading-loose">
        Aquí podrás ver el ranking de priorización de focos, ordenados de mayor
        a menor. El ranking se compone de aquellos focos que han obtenido el
        mejor nivel de aceptación entre todos los actores participantes
      </span>
      <!-- DESCRIPTION -->

      <div class="grid grid-cols-12 h-full lg:gap-x-8 gap-y-8 mt-12">
        <div
          class="col-span-12 lg:col-span-4 shadow-md rounded-lg"
          v-for="(declaration, index) in ranking.slice(
            matchsPerPage * page - matchsPerPage,
            matchsPerPage * page
          )"
          :key="index"
        >
          <v-card
            class="px-4 py-4 d-flex flex-column justify-space-between h-full"
            :height="height"
            rounded="lg"
            elevation="1"
            flat
          >
            <div>
              <div class="d-flex align-end">
                <v-icon
                  v-if="
                    declaration.rank == 1 ||
                    declaration.rank == 2 ||
                    declaration.rank == 3
                  "
                  class="mr-2"
                  :color="trophy_color(declaration.rank)"
                  large
                  >mdi-trophy-variant</v-icon
                >
                <span class="text-2xl">{{ declaration.rank }}</span
                ><span class="text-xl">/{{ ranking.length }}</span>
              </div>

              <span class="text-body-1 d-block h-20">
                {{ declaration.sort }}.-{{ declaration.title }}</span>
            </div>

            <div class="flex space-x-2 align-end">
              <font-awesome-icon
                icon="fa-solid fa-stars"
                class="w-5 h-5"
              />
              <span class="text-sm">
                {{ Math.round(declaration.skill) }}
              </span>
            </div>
          </v-card>
        </div>
      </div>
    </v-container>
    <!-- RANKING -->

    <!-- PAGINATION -->
    <v-pagination
      class="mt-4"
      color="purple darken-4"
      v-model="page"
      :length="Math.ceil(ranking.length / matchsPerPage)"
    ></v-pagination>
    <!-- PAGINATION -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      matchsPerPage: 9,
    };
  },
  async fetch() {
    await this.$store.dispatch("gamificacion/loadRanking");
  },
  methods: {
    trophy_color(index) {
      switch (index) {
        case 1:
          return "yellow darken-2";
        case 2:
          return "blue-grey lighten-4";
        case 3:
          return "deep-orange darken-4";
        default:
          return "blue-grey lighten-4";
      }
    },
  },
  computed: {
    ranking() {
      return this.$store.getters["gamificacion/ranking"];
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 280;
        case "sm":
          return 300;
        case "md":
          return 310;
        case "lg":
          return 300;
        case "xl":
          return 220;
      }
    },
  },
};
</script>

<style></style>
