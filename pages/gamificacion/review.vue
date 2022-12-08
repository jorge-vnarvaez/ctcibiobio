<template>
  <div class="pb-14 grey lighten-4">
    <!-- HERO IMAGE -->
    <v-img src="/patterns/cork-wallet.png" class="pt-8" :height="height_bg">
      <v-container>
        <span
          class="blcok text-xl lg:text-5xl font-bold fic-2--text text--darken-3"
          >Resultados</span
        >
        <span class="block text-sm lg:text-xl mt-4">
          Aquí podrás ver el ranking de priorización de propuestas ordenadas de
          mayor a menor, el ranking se compone de aquellas propuestas que han
          obtenido el mejor nivel de aceptación entre todos los usuarios
          participantes utilizando el sistema de clasificación de
          <a
            href="https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/"
            target="_blank"
            >True Skill&#8482;</a
          >.
        </span>

        <div class="flex space-x-2 mt-4 mb-2">
          <span class="font-bold">Nivel de aceptación</span>
        </div>

        <div class="flex">
          <span
            >En la práctica el sistema de clasificación
            <a
              href="https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/"
              target="_blank"
              >True Skill&#8482;</a
            >
            se utiliza para clasificar jugadores de videojuegos a utilizando
            como criterio su skill o habilidad para jugar. A partir de este
            punto el
            <b>nivel de aceptación</b>
            <font-awesome-icon
              icon="fa-solid fa-telescope"
              class="w-4 h-4 inline-flex"
            />
            se ha de utilizar como un criterio de clasificación (priorización de
            propuestas) de las misiones que impulsarán el desarrollo en la
            región. Usando la
            <a
              href="https://es.wikipedia.org/wiki/Inferencia_bayesiana"
              target="_blank"
              >inferencia bayesiana</a
            >, el sistema de clasificación está caracterizado por su capacidad
            de adaptarse a los cambios en el nivel de aceptación de las
            propuestas en base a la incertidumbre o imprecisión de la naturaleza
            estadística, por lo que es posible que el nivel de aceptación de una
            propuesta cambie a lo largo del tiempo.
          </span>
        </div>

        <span class="block mt-4">
          Sin importar el número o porcentaje de victorias y/o derrotas, el
          nivel de aceptación de una propuesta varía únicamente en función de
          dos números. El nivel de aceptación de la propuesta el cual se mide en
          puntos de aceptación <b>(μ)</b> y el grado de incertidumbre en el
          nivel de aceptación de una propuesta <b>(σ)</b>. En este sentido la
          <a
            href="https://es.wikipedia.org/wiki/Inferencia_bayesiana"
            target="_blank"
            >inferencia bayesiana</a
          >
          permite clasificar las propuestas en base a la creencias cambiantes,
          por ejemplo, supongamos que tenemos la creencia de que el nivel de
          aceptación de una propuesta es 25 y el grado de incertidumbre es 8.3,
          si damos a elegir a los usuarios entre una <b>propuesta A</b> con alto
          nivel de aceptación frente a una <b>propuesta B</b> con poco nivel de
          aceptación, existe la posibilidad de que la propuesta B gane y su
          nivel de aceptación incremente drásticamente al desfasar a una
          propuesta que creíamos que podía tener alto nivel de aceptación. Sin
          embargo, tras un par más de elecciones de los usuarios los niveles de
          aceptación y el grado de incertidumbre se irán nivelando hasta así
          conseguir resultados parejos en base a la inferencia.</span
        >
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
          <!-- DECLARATION CARD -->
          <v-card
            class="px-4 py-4 d-flex flex-column justify-space-between h-full"
            :height="height"
            flat
          >
            <div>
              <!-- RANK # -->
              <div class="d-flex justify-between align-center">
                <div class="d-flex align-center">
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

                <span class="text-sm font-medium">{{ declaration.mission }}</span>
              </div>
              <!-- RANK # -->

              <!-- DECLARATION TITLE -->
              <span class="text-body-1 d-block h-32">{{
                declaration.title
              }}</span>
              <!-- DECLARATION TITLE -->

              <!-- SKILL, PERCENTAGE OF VICTORIES AND WINS -->
              <div class="flex space-x-2 justify-between">
                <div class="flex flex-col">
                  <font-awesome-icon
                    icon="fa-solid fa-telescope"
                    class="w-5 h-5"
                  /><span>{{ Math.ceil(declaration.skill[0]) }}</span>
                </div>
                <div class="flex flex-col align-end w-full">
                  <span class="block"
                    >Porcentaje victorias:
                    {{ percentageOfVictories(declaration.n_wins) }}%</span
                  >
                  <span>Victorias: {{ declaration.n_wins }}</span>
                </div>
              </div>
              <!-- SKILL, PERCENTAGE OF VICTORIES AND WINS -->
            </div>

            <!-- PERCENTAGE BAR -->
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
            <!-- PERCENTAGE BAR -->
          </v-card>
          <!-- DECLARATION CARD -->
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
    },
  },
  async fetch() {
    await this.$store.dispatch("gamificacion/loadMatchs");
    await this.$store.dispatch("gamificacion/loadRanking");
  },
  computed: {
    ranking() {
      return this.$store.getters["gamificacion/ranking"];
    },
    totalMatchs() {
      return this.$store.getters["gamificacion/totalMatchs"];
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 340;
        case "sm":
          return 310;
        case "md":
          return 310;
        case "lg":
          return 300;
        case "xl":
          return 320;
      }
    },
    height_bg() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2380;
        case "sm":
          return 1000;
        case "md":
          return 820;
        case "lg":
          return 820;
        case "xl":
          return 680;
      }
    },
  },
};
</script>

<style></style>
