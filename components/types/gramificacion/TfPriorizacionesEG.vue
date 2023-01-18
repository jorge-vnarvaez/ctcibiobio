<template>
  <div :class="col_span">
    <v-card class="p-4">
      <span class="font-medium text-slate-700"
        >Priorizaciones según género y rango de edad</span
      >
      <ChartSvg contain :width="plotWidth" :height="plotHeight">
        <!-- Y AXIS RANGOS DE EDAD -->
        <ChartG
          :scales="{
            edades: {
              scale: 'scaleBand',
              bands: edadRanges.length,
              range: [0, plotHeight - 50],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0.5,
              align: 0.5,
            },
            values: {
              scale: 'scaleBand',
              bands: edadRanges.length,
              range: [0, plotHeight],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            valuesToPlot: {
              scale: 'scaleLog',
              range: [0.1, plotHeight + 50],
              domain: [0.1, maxVotes],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartText
              v-for="(item, index) in edadRanges"
              :key="index + 'text_edad'"
              :bx="0"
              :tx="-80"
              :ty="scales.edades(index) * 2.8"
              :by="scales.valuesToPlot(index + 1) * 0.2"
              :font-size="37"
            >
              {{ item }}
            </ChartText>
          </template>
        </ChartG>
        <!-- Y AXIS RANGOS DE EDAD -->

        <!-- PLOT X AXIS VALUES -->
        <ChartG
          :scales="{
            widthToPlot: {
              scale: 'scaleLinear',
              range: [0, plotWidth],
              domain: [0, maxVotes],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartText
              v-for="(item, index) in plotValues"
              :key="index + 'plot_text_edad'"
              :tx="80"
              :ty="680"
              :bx="(scales.widthToPlot(index) * (maxVotes * 65)) / 100"
              :font-size="37"
            >
              {{ item }}
            </ChartText>
          </template>
        </ChartG>
        <!-- PLOT X AXIS VALUES -->

        <!-- VOTES BY GENDER AND AGE RANGE -->
        <ChartG
          :scales="{
            edades: {
              scale: 'scaleBand',
              bands: edadRanges.length,
              range: [0, plotHeight - 50],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0.5,
              align: 0.5,
            },
            valuesToPlot: {
              scale: 'scaleLog',
              range: [0.1, plotHeight + 50],
              domain: [0.1, maxVotes],
            },
            widthToPlot: {
              scale: 'scaleLinear',
              range: [0, plotWidth],
              domain: [0, maxVotes],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartRect
              v-for="(item, index) in maleVotes"
              :key="index + 'male_text_edad'"
              :tx="80"
              :ty="scales.edades(index) * 2.8"
              fill="#ffac00"
              height="30"
              :width="scales.widthToPlot(item) * multiplier"
              :by="scales.valuesToPlot(index + 1) * 0.2"
              class="cursor-pointer"
              v-tippy
              :content="'Masculino ' + item + ' priorizaciones'"	
            >
            </ChartRect>

            <ChartRect
              v-for="(item, index) in femaleVotes"
              :key="index + 'female_text_edad'"
              :tx="80"
              :ty="scales.edades(index) * 2.8"
              fill="#ff6469"
              height="30"
              :width="scales.widthToPlot(item) * multiplier"
              :by="scales.valuesToPlot(index + 1) * 0.2"
              class="cursor-pointer"
              v-tippy
              :content="'Femenino ' + item + ' priorizaciones'"	
            >
            </ChartRect>

            <ChartRect
              v-for="(item, index) in otherVotes"
              :key="index + 'other_text_edad'"
              :tx="80"
              :ty="scales.edades(index) * 2.8"
              fill="#3333ff"
              height="30"
              :width="scales.widthToPlot(item) * multiplier"
              :by="scales.valuesToPlot(index + 1) * 0.2"
              class="cursor-pointer"
              v-tippy
              :content="'Otro ' + item + ' priorizaciones'"	
            >
            </ChartRect>

            <ChartRect
              v-for="(item, index) in preferNotToSayVotes"
              :key="index + 'prefer_not_to_say_text_edad'"
              :tx="80"
              :ty="scales.edades(index) * 2.8"
              fill="#7f9eff"
              height="30"
              :width="scales.widthToPlot(item) * multiplier"
              :by="scales.valuesToPlot(index + 1) * 0.2"
              class="cursor-pointer"
              v-tippy
              :content="'Prefiero no decirlo ' + item + ' priorizaciones'"	
            >
            </ChartRect>
          </template>
        </ChartG>
        <!-- VOTES BY GENDER AND AGE RANGE -->
      </ChartSvg>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plotHeight: 300,
      edadRanges: [
        "[20-30]",
        "[31-40]",
        "[41-50]",
        "[51-60]",
        "[61-70]",
        "[71+]",
      ],
      data: [],
    };
  },
  mounted() {
    let d = {
      edad_20_30: {
        masculino: 305,
        femenino: 133,
        otro: 55,
        "prefiero-no-decirlo": 0,
      },
      edad_31_40: {
        masculino: 958,
        femenino: 360,
        otro: 0,
        "prefiero-no-decirlo": 29,
      },
      edad_41_50: {
        masculino: 628,
        femenino: 776,
        otro: 0,
        "prefiero-no-decirlo": 0,
      },
      edad_51_60: {
        masculino: 840,
        femenino: 200,
        otro: 0,
        "prefiero-no-decirlo": 0,
      },
      edad_61_70: {
        masculino: 337,
        femenino: 0,
        otro: 0,
        "prefiero-no-decirlo": 0,
      },
      "edad_71+": {
        masculino: 181,
        femenino: 0,
        otro: 0,
        "prefiero-no-decirlo": 0,
      },
    };

    this.data = Object.keys(d).map((key) => {
      return {
        name: key,
        value: d[key],
      };
    });
  },
  computed: {
    plotWidth() {
      return this.$vuetify.breakpoint.mobile ? 280 : 400;
    },
    maleVotes() {
      return this.data.map((item) => item.value.masculino);
    },
    femaleVotes() {
      return this.data.map((item) => item.value.femenino);
    },
    otherVotes() {
      return this.data.map((item) => item.value.otro);
    },
    preferNotToSayVotes() {
      return this.data.map((item) => item.value["prefiero-no-decirlo"]);
    },
    multiplier() {
      return 2.3
    },
    plotValues() {
      // based on maxVotes create range of plot values starting at 0 and ending at maxVotes value (inclusive    )
      // for example maxVotes = 30, make range of 0 to 30 step 5
      // [0, 5, 10, 15, 20, 25, 30] and return as an array
      // this will be used to plot the y axis
      let range = [];
      let step = 5;
      for (let i = 0; i <= this.maxVotes; i += step) {
        range.push(i);
      }

      // si el largo del rango supera los 3 items, asegurate de cortarlo a números grandes representativos
      // por ejemplo, si el rango es [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
      // cortalo a [0, 25, 50, 75, 100]
      if (range.length > 3) {
        let newRange = [];
        let step = Math.floor(range.length / 3);
        for (let i = 0; i < range.length; i += step) {
          newRange.push(range[i]);
        }
        newRange.push(range[range.length - 1]);
        range = newRange;
      }

      return range;
    },
    maxVotes() {
      return Math.max(
        ...this.data
          .map((item) => item.value)
          .map((item) => item)
          .flat()
          .map((item) => Object.values(item))
          .flat()
      );
    },
    tfEdadParticipantes() {
      return this.$store.getters["gamificacion/tf_edad_participantes"];
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
