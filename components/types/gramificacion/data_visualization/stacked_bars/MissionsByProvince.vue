<template>
  <div :class="$gridLargeColsTransformer($vuetify.breakpoint.name)">
    <v-card class="px-8 py-8" v-if="chartVisualizationLoaded">
      <div>
        <span class="block mb-8 text-lg">Priorizaciones según provincia</span>
      </div>


      <div class="flex space-x-4 lg:space-x-0">
        <ChartSvg :width="width" :height="height" contain>
          <ChartG
            :scales="{
              missions: {
                scale: 'scaleBand',
                bands: Object.keys(tf_missions_by_province).length,
                range: [0, height + 120],
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
                v-for="(item, index) in Object.keys(tf_missions_by_province)"
                :key="index + '_mission_label_graph_province'"
              >
                <ChartText
                  :bx="0"
                  :tx="-400"
                  :ty="scales.missions(index)"
                  :by="scales.missions.bandwidth() * 3.5"
                  :font-size="18"
                >
                  {{ item }}
                </ChartText>

                <ChartText
                  :tx="-400"
                  :font-size="16"
                  :ty="scales.missions(index)"
                  :by="scales.missions.bandwidth() * 3.2"
                  fill="#64748b"
                >
                  Total:
                  {{
                    Object.values(tf_missions_by_province)[index].total
                  }}
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
                bands: Object.keys(tf_missions_by_province).length,
                range: [0, height + 120],
                clamp: false,
                round: true,
                paddingOuter: 0,
                paddingInner: 0,
                align: 0.5,
              },
              provinces: {
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
                v-for="(value, index) in 6"
                :key="index + '_stack_graph_province'"
                :ty="scales.missions(index)"
                :tx="$vuetify.breakpoint.mobile ? 350 : 200"
                :by="scales.missions.bandwidth() * 3.2"
              >
                <ChartRect
                  v-for="(item, key) in 3"
                  :key="item + '_rect_graph_province'"
                  :width="getWidthOfBar(index, key)"
                  :tx="key == 0 ? 0 : getWidthOfBar(index, key - 1)"
                  :height="25"
                  :fill="colors[key]"
                  v-tippy
                  :content="
                    getPercentageOfBar(index, key).toFixed(2) +
                    '% de preferencias'
                  "
                  class="cursor-pointer"
                >
                </ChartRect>
              </ChartG>
            </template>
          </ChartG>
        </ChartSvg>
      </div>

       <ChartSvg :width="$vuetify.breakpoint.mobile ? 250 : 400" :height="90" contain>
          <ChartG v-for="(province, index) in provinces" :key="province">
            <ChartRect :fill="colors[index]" :width="$vuetify.breakpoint.mobile ? 8 : 4" :height="$vuetify.breakpoint.mobile ? 8 : 4" :tx="txOfProvinceBarColor(index)">
            </ChartRect>

            <ChartText :font-size="$vuetify.breakpoint.mobile ? 8 : 5" :tx="txOfProvinceTitle(index)">
              {{ province }}
            </ChartText>
          </ChartG>
        </ChartSvg>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['#ffac00', '#ffbd00', '#ffdf00'],
      provinces: ['Arauco', 'Bio Bio', 'Concepción'],
      max: 0,
      chartVisualizationLoaded: false,
    };
  },
  mounted() {
    this.chartVisualizationLoaded = true;
  },
  async fetch() {
    await this.$store.dispatch("gamificacion/loadTfMissionsByProvince");
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  methods: {
    getWidthOfBar(index, key) {
      if (Object.values(this.tf_missions_by_province)[index].total > this.max) {
        this.max = Object.values(this.tf_missions_by_province)[index].total;
      }

      let width =
        this.stacked_width *
        (Object.values(
          Object.values(this.tf_missions_by_province)[index].provinces
        )[key] /
          this.max);

      return width;
    },
    getPercentageOfBar(index, key) {
      let percentage =
        (Object.values(
          Object.values(this.tf_missions_by_province)[index].provinces
        )[key] /
          Object.values(this.tf_missions_by_province)[index].total) *
        100;

      return percentage;
    },
    txOfProvinceBarColor(index) {
      return index * 50
    },
    txOfProvinceTitle(index) {
      switch(index) {
        case 0:
          return 10;
        case 1:
          return 60;
        case 2:
          return 110;
      }
    },
  },
  computed: {
    tf_missions_by_province() {
      return this.$store.getters["gamificacion/tf_missions_by_province"];
    },
    width() {
      return this.$vuetify.breakpoint.mobile ? 280 : 350;
    },
    stacked_width() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 300;
        case 'sm':
          return 300;
        case 'md':
          return 400;
        case 'lg':
          return 700;
        case 'xl':
          return 700;
      }
    },
    height() {
      return this.$vuetify.breakpoint.mobile ? 280 : 350;
    }
  },
};
</script>

<style></style>
