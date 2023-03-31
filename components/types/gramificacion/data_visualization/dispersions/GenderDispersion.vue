<template>
  <div class="col-span-12" v-if="chartVisualizationLoaded">
    <!-- MOBILE VERSION -->
    <v-card class="px-8 py-8" v-if="['xs', 'sm', 'md'].includes($vuetify.breakpoint.name)">
      <span class="block text-center mb-8 text-lg"
        >Dispersión de preferencias</span
      >
      <ChartSvg width="100%" height="auto" contain>
        <ChartG
          :scales="{
            segments_by_20: {
              scale: 'scaleBand',
              bands: 6,
              range: [0, 120],
              clamp: false,
              round: false,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            segments_by_10: {
              scale: 'scaleBand',
              bands: 11,
              range: [0, 110],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 1,
              align: 0.5,
            },
            plotX: {
              scale: 'scaleLinear',
              range: [0, 400],
              domain: [0, 10],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartText
              :font-size="6"
              :ty="-75"
              :tx="-10"
              writing-mode="tb"
            >
              Ranking Masculino
            </ChartText>

            <ChartText
              v-for="(number, index) in 11"
              :key="number + '_vertical_plot_scale'"
              :by="scales.segments_by_10(index)"
              :font-size="$vuetify.breakpoint.mobile ? 5 : 3"
            >
              {{ Math.floor(scales.segments_by_10(index) - index) }}
            </ChartText>

            <ChartText
              v-for="(number, index) in 11"
              :key="number + '_horizontal_plot_scale'"
              :bx="Math.floor(scales.segments_by_10(index))"
              :font-size="$vuetify.breakpoint.mobile ? 5 : 3"
            >
              {{ Math.floor(scales.segments_by_10(index)) }}
            </ChartText>

            <ChartText
              :font-size="6"
              :ty="10"
              :tx="40"
            >
              Ranking Femenino
            </ChartText>
          </template>
        </ChartG>

        <ChartG
          v-for="(item, index) of ranking_by_gender"
          :key="index + '_mission_group'"
        >
          <ChartArc
            fill="#18254a"
            :class="activeArc == index ? 'opacity-100' : 'opacity-10'"
            :startAngle="0"
            :endAngle="360"
            :tx="getRankingFemenino(item)"
            :ty="getRankingMasculino(item) - 2"
            :ro="2.5"
          >
          </ChartArc>

          <ChartText
            :font-size="6"
            :tx="getRankingFemenino(item) + 5"
            :ty="getRankingMasculino(item) -  0.9"
            :class="activeArc == index ? 'opacity-100' : 'opacity-10'"
          >
            {{
              $vuetify.breakpoint.mobile
                ? Object.keys(item)[0].slice(0, 25)
                : Object.keys(item)[0].slice(0, 35)
            }}
            ...
          </ChartText>
        </ChartG>
      </ChartSvg>
    </v-card>
    <!-- MOBILE VERSION -->
    <!-- DESKTOP VERSION -->
    <v-card class="px-8 py-8" v-if="['md', 'lg', 'xl'].includes($vuetify.breakpoint.name)">
      <span class="block text-center mb-8 text-lg"
        >Dispersión de preferencias</span
      >
      <ChartSvg width="100%" height="auto" contain>
        <ChartG
          :scales="{
            segments_by_20: {
              scale: 'scaleBand',
              bands: 6,
              range: [0, 120],
              clamp: false,
              round: false,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            segments_by_10: {
              scale: 'scaleBand',
              bands: 11,
              range: [0, 110],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 1,
              align: 0.5,
            },
            plotX: {
              scale: 'scaleLinear',
              range: [0, 400],
              domain: [0, 10],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartText
              :font-size="6"
              :ty="-80"
              :tx="-10"
              writing-mode="tb"
            >
              Ranking Masculino
            </ChartText>

            <ChartText
              v-for="(number, index) in 11"
              :key="number + '_vertical_plot_scale'"
              :by="scales.segments_by_10(index)"
              :font-size="$vuetify.breakpoint.mobile ? 5 : 3"
            >
              {{ Math.floor(scales.segments_by_10(index) - index) }}
            </ChartText>

            <ChartText
              v-for="(number, index) in 11"
              :key="number + '_horizontal_plot_scale'"
              :bx="
                $vuetify.breakpoint.mobile
                  ? Math.floor(scales.segments_by_10(index))
                  : scales.plotX(index)
              "
              :font-size="$vuetify.breakpoint.mobile ? 5 : 3"
            >
              {{
                $vuetify.breakpoint.mobile
                  ? Math.floor(scales.segments_by_10(index))
                  : (scales.plotX(index) * 100) / 400
              }}
            </ChartText>

            <ChartText
              :font-size="6"
              :ty="10"
              :tx="180"
            >
              Ranking Femenino
            </ChartText>
          </template>
        </ChartG>

        <ChartG
          v-for="(item, index) of ranking_by_gender"
          :key="index + '_mission_group'"
        >
          <ChartArc
            fill="#18254a"
            :class="activeArc == index ? 'opacity-100' : 'opacity-10'"
            :startAngle="0"
            :endAngle="360"
            :tx="getRankingFemenino(item)"
            :ty="getRankingMasculino(item) - 2"
            :ro="2"
          >
          </ChartArc>

          <ChartText
            :font-size="$vuetify.breakpoint.mobile ? 5 : 4"
            :tx="getRankingFemenino(item) + 5"
            :ty="
              getRankingMasculino(item) -  0.9
            "
            :class="activeArc == index ? 'opacity-100 font-bold' : 'opacity-10'"
          >
            {{
              $vuetify.breakpoint.mobile
                ? Object.keys(item)[0].slice(0, 10)
                : Object.keys(item)[0].slice(0, 35)
            }}
            ...
          </ChartText>
        </ChartG>
      </ChartSvg>
    </v-card>
    <!-- DESKTOP VERSION -->

    <!-- THERE'S A BUG WITH THE SVG IN MOBILE VERSION THAT'S WHY 
    WE HAVE TO USE TWO DIFFERENT VERSIONS AND CANNOT USE 
    $VUETIFY.BREAKPOINT.MOBILE INTO CHARTGROUPS TO SIMPLIFY CODE -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeArc: 0,
      chartVisualizationLoaded: false,
    };
  },
  mounted() {
    this.chartVisualizationLoaded = true;
    // create interval evey 5 seconds
    setInterval(() => {
      this.activeArc++;

      if (this.activeArc == this.ranking_by_gender.length) {
        this.activeArc = 0;
      }
    }, 5000);
  },
  async fetch() {
    await this.$store.dispatch("gamificacion/loadGenderDispersion");
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  methods: {
    getRankingFemenino(item) {
      let value = Object.values(item)[0].generos.find(
        (object) => object.genero == "femenino"
      );
      let normalized_skill = value ? value.normalized_skill : 0;
      return this.$vuetify.breakpoint.mobile
        ? normalized_skill
        : (normalized_skill * 400) / 100;
    },
    getRankingMasculino(item) {
      return (
        Object.values(item)[0].generos.find(
          (object) => object.genero == "masculino"
        ).normalized_skill * -1
      );
    },
  },
  computed: {
    ranking_by_gender() {
      return this.$store.getters["gamificacion/gender_dispersion"];
    },
    is_mobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
};
</script>

<style></style>
