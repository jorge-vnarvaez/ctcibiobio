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
              <span class="block text-base lg:text-lg text-center text-[#2929c6]">
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
            to="/gamificacion/resultados"
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
        <!-- <span class="block mt-4">Cargando...</span>   -->
        <!-- <font-awesome-icon icon="fa-solid fa-alien-8bit" class="h-8 w-8"/> -->
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
      user_id: null,
      reachingIndex: 0,
      loadingNewPair: true,
    };
  },
  async mounted() {
    this.$store.commit("gamificacion/loadingDeclarations");

    this.$store.commit("gamificacion/setUserId", this.$cookies.get("userID"));

    this.user_id = this.$store.getters["gamificacion/getUserId"];

    this.reachingIndex = this.optionsData.length;

    await this.$store.dispatch("gamificacion/loadMatchs");
    await this.$store.dispatch("gamificacion/loadDeclarations");

    this.optionsData = this.declarations;
    this.matchesData = this.matches.map((match) => {
      return {
        id: match.id,
        pairs: match.pairs.map((pair) => {
          return pair.item;
        }),
      };
    });

    await this.checkMatch();
  },
  methods: {
    async checkMatch() {
      let res = false;

      await this.$store.dispatch("gamificacion/loadDeclarations");
      this.optionsData = this.declarations;

      this.reachingIndex = this.optionsData.length - this.secondOption;

      if (
        this.reachingIndex != 0 &&
        this.reachingIndex != 1 &&
        this.reachingIndex != 2
      ) {
        // find in matchesData if the first and second options exists in the pairs array of any match object

        const query = this.$objectToQueryString({
          filter: {
            user: {
              _eq: this.user_id,
            },
          },
          fields: ['pairs.*.*']
        })

        const axiosMatches = this.$axios.get(this.$config.apiUrlV2 + `/items/matches?${query}`)

        const m = await Promise.all([axiosMatches]).then((res) => {
          return res[0].data.data.find((match) => {
            return (
              match.pairs[0].item.id == (this.optionsData[this.firstOption].id) && match.pairs[1].item.id == (this.optionsData[this.secondOption].id)
            );
          });
        }).then((match) => {
          if (match !== undefined) {
            this.loadingNewPair = true
            this.moveToNextPair();
          } else {
            this.loadingNewPair = false
          }

          res = true;
        });

        return res;

      } else {
        this.$router.push("/gamificacion/mensaje");
      }
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
    },
    async registerMatch() {
      this.loadingNewPair = true;

      // Inserta un nuevo match registrando las 2 opciones que se compararon y la opcion ganadora
      const data = await this.$axios
        .$post(`${this.$config.apiUrlV2}/items/matches`, {
          user: this.user_id,
          winner: this.winner.id,
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
        })
        .then((res) => {
          return res.data;
        });

      const query = this.$objectToQueryString({
        fields: ["id", "wins.*"],
        deep: {
          wins: {
            _limit: -1,
          },
        },
      });

      // Obtener las wins de la declaracion ganadora
      let wins = await this.$axios
        .$get(
          `${this.$config.apiUrlV2}/items/declarations/${this.winner.id}?${query}`
        )
        .then((res) => {
          return res.data.wins;
        });

      // Agregar el nuevo match a la lista de wins de la declaracion ganadora
      wins.push({
        declarations_id: this.winner.id,
        matches_id: data.id,
      });

      // Actualizar las wins de la declaracion ganadora
      await this.$axios.$patch(
        `${this.$config.apiUrlV2}/items/declarations/${this.winner.id}`,
        {
          wins: wins,
        }
      );

      const trueskill = require("trueskill");

      // Update skill of the winner and loser declarations
      let winner = {};
      let loser = {};

      winner.skill = JSON.parse(this.winner.skill);
      loser.skill = JSON.parse(this.loser.skill);

      winner.rank = 1;
      loser.rank = 2;

      trueskill.AdjustPlayers([winner, loser]);

      await this.$axios.$patch(
        `${this.$config.apiUrlV2}/items/declarations/${this.winner.id}`,
        {
          skill: JSON.stringify(winner.skill),
        }
      );

      // Actualizar las skills de la declaracion perdedora
      await this.$axios.$patch(
        `${this.$config.apiUrlV2}/items/declarations/${this.loser.id}`,
        {
          skill: JSON.stringify(loser.skill),
        }
      );

      this.checkMatch();
    },
    async noPreferences() {
      this.loadingNewPair = true;

      // Registra un match sin ganador
      await this.$axios
        .$post(`${this.$config.apiUrlV2}/items/matches`, {
          user: this.user_id,
          winner: null,
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
        })
        .then((res) => {
          return res.data;
        });

      // Pasa al siguiente set de opciones
      this.optionsSelected = this.optionsSelected + 2;
      this.firstOption = this.optionsSelected - 1;
      this.secondOption = this.firstOption + 1;

      this.numberOfAnswers++;

      await this.checkMatch();
    },
    moveToNextPair() {
      let res = this.checkMatch();

      if(res) {
this.optionsSelected = this.optionsSelected + 2;
      this.firstOption = this.optionsSelected - 1;
      this.secondOption = this.firstOption + 1;
      }

    },
  },
  computed: {
    declarations() {
      return this.$store.getters["gamificacion/declarations"];
    },
    matches() {
      return this.$store.getters["gamificacion/matches"];
    },
    declarationsLoading() {
      return this.$store.getters["gamificacion/declarationsLoading"];
    },
  },
};
</script>

<style></style>
