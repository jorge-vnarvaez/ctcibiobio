<template>
  <div :class="col_span">
    <v-card class="px-8 py-6">
      <span class="block mb-8 text-lg">c. Participantes por rango de edad</span>
      <div class="flex flex-col lg:flex-row  justify-center space-y-8 lg:space-y-0 lg:space-x-8 align-center">
        <ChartSvg contain :width="plotWidth" heigth="1800">
          <ChartG
            :scales="{
              colors: {
                scale: 'scaleLinear',
                domain: [0, tfEdadParticipantes.length - 1],
                range: ['#31435e', '#6b94d0'],
              },
            }"
          >
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
                :content="`${tfEdadParticipantes[index].name.replace(/_/g, ' ')} (${
                  tfEdadParticipantes[index].value
                })`"
              >
              </ChartArc>
            </template>
          </ChartG>
        </ChartSvg>

        <ChartSvg>
          <ChartG
            :scales="{
              colors: {
                scale: 'scaleLinear',
                domain: [0, tfEdadParticipantes.length - 1],
                range: ['#31435e', '#6b94d0'],
              },
            }"
          >
            <template #default="{ scales }" class="flex align-center">
              <ChartRect
                v-for="(item, index) in tfEdadParticipantes"
                :key="index + 'rect'"
                :width="15"
                :height="15"
                :by="index * 25 + 10"
                :ty="150"
                :fill="scales.colors(index)"
              ></ChartRect>

              <ChartText
                v-for="(item, index) in tfEdadParticipantes"
                :key="index + 'text'"
                :by="index * 25 + 10"
                :font-size="19"
                :ty="150"
                :tx="20"
                >
                {{ item.value }} entre
                {{
                    // replace first underscore with space, it is suposed after that
                    // is going to be two spaces, so we replace the second one with
                    // a dash - 
                    item.name.replace(/_/g, ' ').replace('  ', ' - ')
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
      colors: ["#3e5cbd", "#3333ff", "#ff6469", "#253771"],
    };
  },
  mounted() {
    this.tfEdadParticipantes.forEach((item) => {
      const p_arc = this.p_radius(item.value);
      this.acum += p_arc;
      this.angles.push(this.acum);
    });
  },
  methods: {
    p_radius(total) {
      return (total * 360) / this.totalParticipants;
    },
    p_participantes(total) {
      return Math.round((total * 100) / this.totalParticipants);
    },
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
    tfEdadParticipantes() {
      return this.$store.getters["gamificacion/tf_edad_participantes"];
    },
    maxValue() {
      return this.tf_edad_participantes.reduce((max, item) => {
        return Math.max(max, Object.values(item)[0]);
      }, 0);
    },
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-12";
        case "sm":
          return "col-span-12";
        case "md":
          return "col-span-6";
        case "lg":
          return "col-span-12";
        case "xl":
          return "col-span-4";
      }
    },
  },
};
</script>

<style></style>
