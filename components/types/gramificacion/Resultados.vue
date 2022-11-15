<template>
  <div class="pb-14 grey lighten-4 pb-20">
    <!-- HERO IMAGE -->
    <v-img src="/patterns/cork-wallet.png" class="pt-8" height="420">
      <v-container>
        <span class="blcok text-xl lg:text-5xl font-bold fic-2--text text--darken-3">Ranking de priorización</span>
        <span class="block text-sm lg:text-xl mt-4">
          Aquí podrás ver el ranking de priorización de propuestas, ordenadas de mayor a menor el ranking se compone
          de aquellas propuestas que han obtenido el mejor nivel de aceptación entre todos los usuarios participantes utilizando
          el sistema de clasificación de <a href="https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/" target="_blank">True Skill&#8482;</a>. 
        </span>
        <span class="block text-sm lg:text-2xl mt-8 mb-4">¿Te interesan más propuestas?</span>
        <v-btn outlined text color="purple darken-1" to="/gamificacion">Seguir Votando</v-btn>
      </v-container>
    </v-img>
    <!-- HERO IMAGE -->

    <!-- RANKING -->
    <v-container class="mt-10">
      <div class="grid grid-cols-12 h-full lg:gap-x-8 gap-y-8">
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
            :height="$vuetify.breakpoint.mobile ? '290' : '280'"
            flat
          >
            <div>
              <div class="d-flex align-end">
                <v-icon v-if="declaration.rank == 1 || declaration.rank == 2 || declaration.rank == 3" class="mr-2" :color="trophy_color(declaration.rank)" large>mdi-trophy-variant</v-icon>
                <span class="text-2xl">{{ declaration.rank }}</span
                ><span class="text-xl">/{{ ranking.length }}</span>
              </div>

              <span class="text-body-1 d-block h-20">{{
                declaration.title
              }}</span>
            </div>

            <div>
              <span class="text-h6"
                >{{ percentageOfVictories(declaration.n_wins) }}%
                Victorias</span
              >
              <v-progress-linear
                color="#f5a623"
                height="10"
                :value="
                  declaration.n_wins > 0
                    ? (declaration.n_wins * 100) / totalMatchs
                    : 0
                "
                :buffer-value="100"
                striped
              ></v-progress-linear>
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
      matchsPerPage: 9
    }
  },
  async fetch() {
    await this.$store.dispatch('gamificacion/totalMatchs');
    await this.$store.dispatch("gamificacion/loadMatchs");
    await this.$store.dispatch("gamificacion/loadRanking");
  },
  methods: {
    percentageOfVictories(nWins) {
      return this.totalMatchs != 0
        ? Math.round((nWins * 100) / this.totalMatchs)
        : 0;
    },
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
    }
  },
  computed: {
    ranking() {
      return this.$store.getters["gamificacion/ranking"];
    },
    totalMatchs() {
      return this.$store.getters["gamificacion/totalMatchs"];
    },
  },
};
</script>

<style></style>
