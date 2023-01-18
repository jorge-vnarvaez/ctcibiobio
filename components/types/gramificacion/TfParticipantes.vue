<template>
  <div :class="col_span">
    <v-card class="px-8 py-6">
      <span class="block mb-8 text-lg">a. Participantes por género</span>
      <div class="flex flex-col lg:flex-row space-x-8 align-center">
        <ChartSvg contain :width="plotWidth" heigth="1800">
          <ChartG>
            <template>
              <ChartArc
                v-for="(item, index) in angles"
                :key="index + 'arc'"
                :bx="150"
                :by="110"
                :startAngle="index == 0 ? 0 : angles[index - 1]"
                :endAngle="index == angles.length - 1 ? 360 : angles[index]"
                :fill="colors[index]"
                class="cursor-pointer stroke-none"
                v-tippy
                :content="`${Object.keys(tfParticipantes[index])[0].replace(
                  /_/g,
                  ' '
                )} (${Object.values(tfParticipantes[index])[0]})`"
              >
              </ChartArc>
            </template>
          </ChartG>
        </ChartSvg>

        <ChartSvg>
          <ChartG>
            <template class="flex align-center">
              <ChartRect
                v-for="(item, index) in tfParticipantes"
                :key="index + 'rect'"
                :width="15"
                :height="15"
                :by="index * 30 + 10"
                :ty="140"
                :fill="colors[index]"
              ></ChartRect>

              <ChartText
                v-for="(item, index) in tfParticipantes"
                :key="index + 'text'"
                :by="index * 30 + 10"
                :font-size="18"
                :ty="140"
                :tx="20"
                class="text-capitalize"
                >{{ Object.values(item)[0] }}
                {{ Object.keys(item)[0].replace(/_/g, " ") }} ({{
                  p_participantes(Object.values(item)[0])
                }}%)</ChartText
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
  methods: {
    p_radius(total) {
      return (total * 360) / this.totalParticipants;
    },
    p_participantes(total) {
      return Math.round((total * 100) / this.totalParticipants);
    },
  },
  mounted() {
    this.tfParticipantes.forEach((value) => {
      const p_arc = this.p_radius(Object.values(value)[0]);
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
    tfParticipantes() {
      return this.$store.getters["gamificacion/tf_participantes"];
    },
    maxValueGenre() {
      return this.tfParticipantes.reduce((max, item) => {
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
          return "col-span-6";
        case "xl":
          return "col-span-4";
      }
    },
  },
};
</script>

<style></style>
