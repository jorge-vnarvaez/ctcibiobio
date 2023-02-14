<template>
  <div>
    <v-img
      src="/patterns/spikes.webp"
      height="910"
      v-if="optionsData.length > 0"
      class="py-12 lg:py-0"
    >
      <div
        v-if="
          reachingIndex != 0 &&
          reachingIndex != 1 &&
          reachingIndex != 2 &&
          loadingNewPair == false
        "
        class="d-flex flex-column lg:h-full align-center justify-center lg:max-w-screen-2xl lg:mx-auto"
      >
        <span
          class="block text-2xl lg:text-4xl font-black text-[#2929c6] text-center"
          >Como Región del Biobío, debemos enfocar nuestros esfuerzos en:</span
        >

        <!-- OPTIONS -->
        <div
          class="grid grid-cols-12 mt-12 lg:gap-x-8 gap-y-8 lg:gap-y-0 px-8 lg:px-0"
        >
          <!-- OPTION 1 -->
          <div class="rounded-xl shadow-2xl col-span-12 lg:col-span-6">
            <v-card
              @click="optionSelected(optionsData[firstOption].id)"
              class="px-8 py-8 d-flex flex-column align-center justify-center"
              height="240"
              style="cursor: pointer"
              flat
            >
              <span
                class="block text-base lg:text-lg text-center text-[#2929c6]"
              >
                {{ optionsData[firstOption].title }}
              </span>
              <!-- <span class="block">
                {{ optionsData[firstOption].skill }}
              </span> -->
              <!-- <span>
                {{ optionsData[firstOption].wins.length }}
              </span> -->
            </v-card>
          </div>
          <!-- OPTION 1 -->

          <!-- OPTION 2 -->
          <div class="rounded-xl shadow-2xl col-span-12 lg:col-span-6">
            <v-card
              @click="optionSelected(optionsData[secondOption].id)"
              class="px-8 py-8 d-flex flex-column align-center justify-center"
              height="240"
              style="cursor: pointer"
              flat
            >
              <span class="text-base lg:text-lg text-center text-[#2929c6]">
                {{ optionsData[secondOption].title }}
              </span>
              <!-- <span class="block">
                {{ optionsData[secondOption].skill }}
              </span> -->
              <!-- <span>
                {{ optionsData[secondOption].wins.length }}
              </span> -->
            </v-card>
          </div>
          <!-- OPTION 2 -->
        </div>
        <!-- OPTIONS -->

        <div
          class="d-flex flex-column align-center mt-12 space-y-4 lg:px-0 px-8"
        >
          <!-- SIN PREFERENCIA -->
          <v-btn
            @click="noPreferences"
            color="orange darken-1"
            class="text-capitalize white--text"
            >No tengo preferencia</v-btn
          >
          <!-- SIN PREFERENCIA -->

          <!-- SALIR -->
          <span class="text-xs text-center" v-if="numberOfAnswers == 0"
            >Debes seleccionar al menos 15 opciones para ver los
            resultados</span
          >

          <span
            class="text-xs text-center"
            v-if="numberOfAnswers > 0 && numberOfAnswers < 15"
          >
            Haz seleccionado
            <span class="text-[#2929c6] font-bold">{{ numberOfAnswers }}</span>
            de 15 opciones.
          </span>

          <span class="text-xs text-center" v-if="numberOfAnswers >= 15">
            Ahora tienes
            <span class="text-[#2929c6] font-bold">{{ numberOfAnswers }}</span>
            opciones seleccionadas, puedes seguir seleccionando o ver los
            resultados
          </span>

          <v-progress-linear
            :value="(numberOfAnswers * 100) / 15"
          ></v-progress-linear>

          <v-btn
            color="purple darken-4"
            class="white--text text-capitalize"
            :disabled="numberOfAnswers < 15"
            @click="verResultados"
            >Ver Resultados</v-btn
          >
          <!-- SALIR -->
        </div>
      </div>

      <div
        v-if="loadingNewPair"
        class="d-flex flex-column lg:h-full align-center justify-center lg:max-w-screen-2xl lg:mx-auto"
      >
        <v-progress-circular
          indeterminate
          color="purple darken-4"
          size="32"
        ></v-progress-circular>
        <!-- <span class="text-xs text-slate-400 block mt-2">
          Cargando nueva pareja de focos...
        </span> -->
      </div>
    </v-img>
  </div>
</template>

<script>
export default {
  layout: "encuesta",
  data() {
    return {
      winner: null,
      loser: null,
      firstOption: 0,
      secondOption: 1,
      option1: {},
      option1loaded: false,
      option2: {},
      optionsSelected: 1,
      numberOfAnswers: 0,
      dataStatus: false,
      optionsData: [],
      matchesData: [],
      auxMatchs: [],
      user_id: null,
      reachingIndex: 0,
      loadingNewPair: true,
      slicePostMatch: 0,
    };
  },
  async mounted() {
    this.$store.commit("gamificacion/loadingDeclarations");

    this.$store.commit("gamificacion/setUserId", this.$cookies.get("userID"));

    this.user_id = this.$store.getters["gamificacion/getUserId"];

    this.reachingIndex = this.optionsData.length;

    await this.$store.dispatch("gamificacion/loadDeclarations");

    this.optionsData = this.declarations;

    // get all the matches from the current user
    const query = this.$objectToQueryString({
      filter: {
        user: {
          _eq: this.user_id,
        },
      },
      fields: ["pairs.*.*"],
    });

    const axiosMatches = this.$axios.get(
      this.$config.apiUrlV2 + `/items/matches?${query}`
    );

    await Promise.all([axiosMatches]).then((res) => {
      const data = res[0].data.data;
      if (data.length > 0) {
        this.matchesData = data.map((match) => {
          return {
            pair1: match.pairs[0].item.id,
            pair2: match.pairs[1].item.id,
          };
        });
      } else {
        this.matchesData = [];
      }
    });

    await this.checkMatch();
  },
  methods: {
    async checkMatch() {
      // reaching index represent the number of options that are left to be compared
      // i.e: the optionsData length is always 32, to check if the user has already compared all the options
      // or if there a few options left to be compared, we check the reachingIndex
      this.reachingIndex = this.optionsData.length - this.secondOption;

      if (
        this.reachingIndex != 0 &&
        this.reachingIndex != 1 &&
        this.reachingIndex != 2
      ) {
        // check if the current pair of options has already been compared
        const m = this.matchesData.find((match) => {
          return (
            match.pair1 == this.optionsData[this.firstOption].id &&
            match.pair2 == this.optionsData[this.secondOption].id ||
          (match.pair1 == this.optionsData[this.secondOption].id &&
            match.pair2 == this.optionsData[this.firstOption].id)
          );
        });

        if (m) {
          this.loadingNewPair = true;
          this.moveToNextPair();
        } else {
          this.loadingNewPair = false;
        }
      } else {
        await this.postMatchs();
        this.$router.push("/gamificacion/mensaje");
      } // this line is used to redirect the user to the previus result page, indicating
      // that reaching index is 0, 1 or 2, which means that the user has already compared all the options
    },
    optionSelected(id) {
      this.winner = this.optionsData.find(
        (declaration) => declaration.id == id
      );

      this.loser =
        this.optionsData[this.firstOption].id != id
          ? this.optionsData[this.firstOption]
          : this.optionsData[this.secondOption];

      this.registerMatch();

      this.optionsSelected++;

      this.optionsData.find((item, index) => {
        if (item.id === id) {
          this.firstOption = index;
        }
      });
      this.secondOption =
        this.optionsSelected == this.firstOption
          ? this.firstOption + 1
          : this.optionsSelected;

      this.numberOfAnswers++;

      this.checkMatch();
    },
    registerMatch() {
      // check if the current pair of options has already been compared
      const m = this.matchesData.find((match) => {
        return (
          (match.pair1 == this.optionsData[this.firstOption].id &&
            match.pair2 == this.optionsData[this.secondOption].id) ||
          (match.pair1 == this.optionsData[this.secondOption].id &&
            match.pair2 == this.optionsData[this.firstOption].id)
        );
      });

      if (!m) {
        this.auxMatchs.push({
          user: this.user_id,
          winner: this.winner.id,
          individualized: false,
          pairs: [
            {
              collection: "declarations",
              item: this.optionsData[this.firstOption].id,
            },
            {
              collection: "declarations",
              item: this.optionsData[this.secondOption].id,
            },
          ],
        });
      }

    },
    async postMatchs() {
      this.loadingNewPair = true;

      this.$store.commit("gamificacion/setMatchs", this.auxMatchs);

      let matchs = this.matchs;

      matchs.forEach(async (match) => {
        await this.$axios
          .$post(`${this.$config.apiUrlV2}/items/matches`, match)
          .then((res) => {
            return res.data;
          });
      });
    },
    async noPreferences() {
      this.loadingNewPair = true;

      // check if the current pair of options has already been compared
      const m = this.matchesData.find((match) => {
        return (
          (match.pair1 == this.optionsData[this.firstOption].id &&
            match.pair2 == this.optionsData[this.secondOption].id) ||
          (match.pair1 == this.optionsData[this.secondOption].id &&
            match.pair2 == this.optionsData[this.firstOption].id)
        );
      });

      if (!m) {
        this.auxMatchs.push({
          user: this.user_id,
          winner: null,
          individualized: false,
          pairs: [
            {
              collection: "declarations",
              item: this.optionsData[this.firstOption].id,
            },
            {
              collection: "declarations",
              item: this.optionsData[this.secondOption].id,
            },
          ],
        });
      }

      this.loadingNewPair = false;

      // Pasa al siguiente set de opciones
      this.optionsSelected = this.optionsSelected + 2;
      this.firstOption = this.optionsSelected - 1;
      this.secondOption = this.firstOption + 1;

      this.numberOfAnswers++;

      await this.checkMatch();
    },
    moveToNextPair() {
      this.loadingNewPair = false;

      this.optionsSelected = this.optionsSelected + 2;
      this.firstOption = this.optionsSelected - 1;
      this.secondOption = this.firstOption + 1;

      this.checkMatch();
    },
    async verResultados() {
      if (
        this.reachingIndex != 0 ||
        this.reachingIndex != 1 ||
        this.reachingIndex != 2
      ) {
        await this.postMatchs();
      }

      this.$router.push("/gamificacion/resultados");
    },
  },
  computed: {
    declarations() {
      return this.$store.getters["gamificacion/declarations"];
    },
    matchs() {
      return this.$store.getters["gamificacion/matchs"];
    },
    declarationsLoading() {
      return this.$store.getters["gamificacion/declarationsLoading"];
    },
  },
};
</script>

<style></style>