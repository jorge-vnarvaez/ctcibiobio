<template>
  <div :class="$gridLargeColsTransformer($vuetify.breakpoint.name)">
   <v-card class="px-8 py-8">
     <ChartSvg :width="500" :height="500" contain>
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
            round: false,
            paddingOuter: 0,
            paddingInner: 0,
            align: 0.5,
          },
        }"
      >
        <template #default="{ scales }">
          <ChartText
            :font-size="6"
            :ty="-80"
            :tx="-10"
            writing-mode="tb"
            oy="+"
          >
            Ranking Masculino
          </ChartText>

          <ChartText
            v-for="(number, index) in 6"
            :key="number + '_vertical_plot_scale'"
            :by="scales.segments_by_20(index)"
            :font-size="5"
          >
            {{ Math.floor(scales.segments_by_20(index)) }}
          </ChartText>

          <ChartText
            v-for="(number, index) in 11"
            :key="number + '_horizontal_plot_scale'"
            :bx="scales.segments_by_10(index)"
            :font-size="5"
          >
            {{ Math.floor(scales.segments_by_10(index)) }}
          </ChartText>

          <ChartText :font-size="6" :ty="10" :tx="30">
            Ranking Femenino
          </ChartText>
        </template>
      </ChartG>

      <ChartG
        v-for="(item, index) of ranking_by_gender"
        :key="index + '_mission_group'"
      >
        <ChartArc fill="#18254a" :startAngle="0" :endAngle="360" :tx="getRankingFemenino(item) + 5" :ty="getRankingMasculino(item) - 2" :ro="1.5">

        </ChartArc>


        <ChartText :font-size="4" :tx="getRankingFemenino(item) + 10" :ty="getRankingMasculino(item) - 1">
          {{ Object.keys(item)[0].slice(0, 20) }} ...
        </ChartText>
      </ChartG>
    </ChartSvg>
   </v-card>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch("gamificacion/loadRankingByGender");
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  methods: {
    getRankingFemenino(item) {
      let value = Object.values(item)[0].generos.find((object) => object.genero == "femenino")
      return value ? value.normalized_skill : 0
    },
    getRankingMasculino(item) {
      return Object.values(item)[0].generos.find((object) => object.genero == "masculino").normalized_skill * -1
    }
  },
  computed: {
    ranking_by_gender() {
      return this.$store.getters["gamificacion/ranking_by_gender"];
    },
  },
};
</script>

<style></style>
