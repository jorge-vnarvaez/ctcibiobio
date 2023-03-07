<template>
  <div :class="$gridLargeColsTransformer($vuetify.breakpoint.name)">
    <v-card class="px-8 py-8" v-if="chartVisualizationLoaded">
      <div>
        <span class="block mb-8 text-lg">Priorizaciones según género</span>
      </div>

      <div class="flex space-x-4 lg:space-x-0">
        <ChartSvg :width="width" :height="height" contain>
          <ChartG
            :scales="{
              missions: {
                scale: 'scaleBand',
                bands: Object.keys(tf_missions_by_gender).length,
                range: [0, height + 260],
                clamp: false,
                round: false,
                paddingOuter: 0,
                paddingInner: 0,
                align: 0.1,
              },
            }"
          >
            <template #default="{ scales }">
              <ChartG
                v-for="(item, index) in Object.keys(tf_missions_by_gender)"
                :key="index + '_mission_label_graph_gender'"
              >
                <ChartText
                  :bx="0"
                  :tx="-200"
                  :ty="scales.missions(index)"
                  :by="scales.missions.bandwidth() * 1.5"
                  :font-size="32"
                >
                  {{ item }}
                </ChartText>

                <ChartText
                  :tx="-200"
                  :font-size="20"
                  :ty="scales.missions(index)"
                  :by="scales.missions.bandwidth() * 1.2"
                >
                  Total:
                  {{ Object.values(tf_missions_by_gender)[index].total }}
                  priorizaciones
                </ChartText>
              </ChartG>
            </template>
          </ChartG>
        </ChartSvg>

        <ChartSvg :width="stacked_width" :height="height" contain>
          <ChartG
            :scales="{
              missions: {
                scale: 'scaleBand',
                bands: Object.keys(tf_missions_by_gender).length,
                range: [0, height + 120],
                clamp: false,
                round: true,
                paddingOuter: 0,
                paddingInner: 0,
                align: 0.5,
              },
              genres: {
                scale: 'scaleBand',
                bands: 3,
                range: [0, stacked_width],
                clamp: false,
                round: true,
                paddingOuter: 0,
                paddingInner: 0,
                align: 0.5,
              },
            }"
          >
            <template #default="{ scales }">
              <ChartG
                v-for="(value, index) in 4"
                :key="index + '_stack_graph_gender'"
                :ty="scales.missions(index)"
                :tx="$vuetify.breakpoint.mobile ? 350 : 200"
                :by="scales.missions.bandwidth() * 1.58"
              >
                <ChartRect
                  v-for="(item, key) in 4"
                  :key="item + '_rect_graph_gender'"
                  :width="getWidthOfBar(index, key)"
                  :tx="key == 0 ? 0 : getWidthOfBar(index, key - 1)"
                  :height="$vuetify.breakpoint.mobile ? 25 : 40"
                  :fill="colors[key]"
                  v-tippy
                  :content="
                    getPercentageOfBar(index, key).toFixed(2) +
                    '% de priorizaciones'
                  "
                  class="cursor-pointer"
                >
                </ChartRect>
              </ChartG>
            </template>
          </ChartG>
        </ChartSvg>
      </div>

      <ChartSvg
        :width="$vuetify.breakpoint.mobile ? 250 : 450"
        :height="90"
        contain
      >
        <ChartG v-for="(gender, index) in genres" :key="gender.label + '_info_graph_gender'">
          <template>
            <ChartRect
              :fill="gender.color"
              :width="$vuetify.breakpoint.mobile ? 8 : 5"
              :height="$vuetify.breakpoint.mobile ? 8 : 5"
              :tx="txOfGenderBarColor(index)"
            >
            </ChartRect>

            <ChartText :font-size="$vuetify.breakpoint.mobile ? 8 : 5" :tx="txOfGenderTitle(index)">
               {{ $vuetify.breakpoint.mobile ? gender.abbreviation : gender.label }}
            </ChartText>
          </template>
        </ChartG>
      </ChartSvg>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["#3e5cbd", "#3333ff", "#ff6469", "#253771"],
      genres: [
        {
          label: "Otro",
          abbreviation: "Otro",
          color: "#3e5cbd",
        },
        {
          label: "Prefiero no decirlo",
          abbreviation: "P",
          color: "#3333ff",
        },
        {
          label: "Femenino",
          abbreviation: "F",
          color: "#ff6469",
        },
        {
          label: "Masculino",
          abbreviation: "M",
          color: "#253771",
        },
      ],
      max: 0,
      chartVisualizationLoaded: false,
    };
  },
  mounted() {
    this.chartVisualizationLoaded = true;
  },
  async fetch() {
    await this.$store.dispatch("gamificacion/loadTfMissionsByGender");
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  methods: {
    getWidthOfBar(index, key) {
      if (Object.values(this.tf_missions_by_gender)[index].total > this.max) {
        this.max = Object.values(this.tf_missions_by_gender)[index].total;
      }

      let width =
        this.stacked_width *
        (Object.values(Object.values(this.tf_missions_by_gender)[index].genres)[
          key
        ] /
          this.max);

      return width;
    },
    getPercentageOfBar(index, key) {
      let percentage =
        (Object.values(Object.values(this.tf_missions_by_gender)[index].genres)[
          key
        ] /
          Object.values(this.tf_missions_by_gender)[index].total) *
        100;

      return percentage;
    },
    txOfGenderBarColor(index) {
      const tx_mutiplier = this.$vuetify.breakpoint.mobile ? 40 : 50;
      const tx_prefiero_no_decirlo = 110;
      const tx = index == 2 ? tx_prefiero_no_decirlo : index * tx_mutiplier;
      const tx_mobile = index * tx_mutiplier;
      return this.$vuetify.breakpoint.mobile ? tx_mobile : tx;
    },
    txOfGenderTitle(index) {
      switch (index) {
        case 0:
          return 10;
        case 1:
          return this.$vuetify.breakpoint.mobile ? 50 : 60;
        case 2: 
          return this.$vuetify.breakpoint.mobile ? 90 : 120;
        case 3:
          return this.$vuetify.breakpoint.mobile ? 130 : 160;
      }
    },
  },
  computed: {
    tf_missions_by_gender() {
      return this.$store.getters["gamificacion/tf_missions_by_gender"];
    },
    width() {
      return this.$vuetify.breakpoint.mobile ? 200 : 150;
    },
    stacked_width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 300;
        case "sm":
          return 300;
        case "md":
          return 400;
        case "lg":
          return 700;
        case "xl":
          return 700;
      }
    },
    height() {
      return this.$vuetify.breakpoint.mobile ? 200 : 250;
    },
  },
};
</script>

<style></style>
