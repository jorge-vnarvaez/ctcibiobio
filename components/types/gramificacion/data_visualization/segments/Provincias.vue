<template>
  <div
    :class="$gridColsTransformer($vuetify.breakpoint.name)"
    v-if="tfProvincias.length > 0"
  >
    <v-card class="px-8 py-6">
      <span class="block mb-8 text-lg">b. Participantes según provincia</span>
      <div class="flex flex-col lg:flex-row space-x-8 align-center">
        <ChartSvg contain :width="plotWidth" heigth="1800">
          <ChartG :scales="{
              colors: {
                scale: 'scaleLinear',
                domain: [0, tfProvincias.length - 1],
                range: ['#ffac00', '#ffce00'],
              }
            }">
            <template #default="{ scales }">
              <ChartArc
                v-for="(item, index) in angles"
                :key="index + 'arc'"
                :bx="150"
                :by="110"
                :startAngle="index == 0 ? 0 : angles[index - 1]"
                :endAngle="index == angles.length - 1 ? 360 : angles[index]"
                :fill="scales.colors(index)"
                class="cursor-pointer text-capitalize"
                v-tippy
                :content="`${tfProvincias[index].name.replace(/_/g, ' ')} (${
                  tfProvincias[index].value
                })`"
              >
              </ChartArc>
            </template>
          </ChartG>
        </ChartSvg>

        <ChartSvg>
          <ChartG :scales="{
              colors: {
                scale: 'scaleLinear',
                domain: [0, tfProvincias.length - 1],
                range: ['#ffac00', '#ffce00'],
              }
            }">
            <template #default="{ scales }">
              <ChartRect
                v-for="(item, index) in tfProvincias"
                :key="index + 'rect'"
                :width="15"
                :height="15"
                :by="index * 30 + 10"
                :ty="120"
                :fill="scales.colors(index)"
              ></ChartRect>

              <ChartText
                v-for="(item, index) in tfProvincias"
                :key="index + 'text'"
                :by="index * 30 + 10"
                :font-size="18"
                :ty="120"
                :tx="20"
                class="text-capitalize"
                >{{ item.value }}
                {{
                  // replace _ for white spaces
                  item.name.replace(/_/g, " ")
                }}
                ({{ p_participantes(item.value) }}%)</ChartText
              >
            </template>
          </ChartG>
        </ChartSvg>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      acum: 0,
      angles: [],
      colors: ["#2DB372", "#8524B3", "#FFAC00"],
    };
  },
  methods: {
    p_radius(total) {
      return (total * 360) / this.totalParticipants;
    },
    p_participantes(total) {
      return Math.round((total * 100) / this.totalParticipants);
    },
  },
  mounted() {
    this.tfProvincias.forEach((item) => {
      const p_arc = this.p_radius(item.value);
      this.acum += p_arc;
      this.angles.push(this.acum);
    });
  },
  computed: {
    plotWidth() {
      return this.$vuetify.breakpoint.mobile ? 150 : 300;
    },
    plotHeight() {
      return this.$vuetify.breakpoint.mobile ? 150 : 300;
    },
    totalParticipants() {
      return this.$store.getters["gamificacion/totalParticipants"];
    },
    tfProvincias() {
      return this.$store.getters["gamificacion/tf_provincias"];
    },
    maxValue() {
      return this.tfProvincias.reduce((max, item) => {
        return Math.max(max, item.value);
      }, 0);
    },
  },
};
</script>

<style></style>
