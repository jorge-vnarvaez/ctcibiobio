<template>
  <div :class="col_span">
    <v-card class="p-4">
      <span class="font-medium text-slate-700"
        >Priorizaciones 05 ene. 2023 - 23 ene. 2023</span
      >
      <ChartSvg contain :width="plotWidth" :height="plotHeight">
        <!-- Y AXIS PLOT VALUES -->
        <ChartG
          :scales="{
            edades: {
              scale: 'scaleBand',
              bands: plotValues.length,
              range: [0, plotHeight],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0.5,
              align: 0.5,
            },
            valuesToPlot: {
              scale: 'scaleLog',
              range: [0.1, plotHeight + 50],
              domain: [0.1, maxValue],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartText
              v-for="(item, index) in plotValues"
              :key="index + 'text_edad'"
              :bx="0"
              :ty="scales.edades(index) * 2.8"
              :by="scales.edades.bandwidth() * 2"
              :font-size="37"
            >
              {{ item }}
            </ChartText>
          </template>
        </ChartG>
        <!-- Y AXIS PLOT VALUES -->

        <!-- FECHAS X AXIS -->
        <ChartG
          :scales="{
            fechas: {
              scale: 'scaleBand',
              bands: dateValues.length,
              range: [0, plotWidth + 1500],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0.5,
              align: 0.5,
            },
            valuesToPlot: {
              scale: 'scaleLog',
              range: [0.1, plotHeight + 50],
              domain: [0.1, maxValue],
            },
          }"
        >
          <template #default="{ scales }">
            <ChartText
              v-for="(item, index) in dateValues"
              :key="index + 'plot_text_edad'"
              :ty="680"
              :tx="80"
              :width="scales.fechas.bandwidth()"
              :bx="scales.fechas(index) * 1.2"
              :font-size="37"
            >
              {{ item }}
            </ChartText>

            <!-- PLOT -->
            <ChartCurve
              :ty="620"
              :tx="100"
              fill="transparent"
              :strokeWidth="8.8"
              stroke="#ffac00"
              autoPoints
              :data="values"
              :width="plotWidth + 2000"
              :height="plotHeight + 450"
              :curveStyle="'curveCardinal'"
              :min="0"
              :max="maxValue"
            >
            </ChartCurve>
            <!-- PLOT -->
          </template>
        </ChartG>
        <!-- FECHAS X AXIS -->
      </ChartSvg>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      plotHeight: 300,
      data: [],
    };
  },
  mounted() {
    let d = [
      {
        "01/05/2023": 2662,
      },
      {
        "01/06/2023": 956,
      },
      {
        "01/07/2023": 150,
      },
      {
        "01/08/2023": 0,
      },
      {
        "01/09/2023": 361,
      },
      {
        "01/10/2023": 152,
      },
      {
        "01/11/2023": 66,
      },
      {
        "01/12/2023": 455,
      },
      {
        "01/13/2023": 0,
      },
      {
        "01/14/2023": 0,
      },
      {
        "01/15/2023": 0,
      },
      {
        "01/16/2023": 0,
      },
      {
        "01/17/2023": 0,
      },
      {
        "01/18/2023": 0,
      },
      {
        "01/19/2023": 0,
      },
      {
        "01/20/2023": 0,
      },
      {
        "01/21/2023": 0,
      },
      {
        "01/22/2023": 0,
      },
      {
        "01/23/2023": 0,
      },
    ];
    this.data = d;
  },
  computed: {
    plotWidth() {
      return this.$vuetify.breakpoint.mobile ? 280 : 1100;
    },
    dateValues() {
      return this.data.map((obj) =>
        moment(Object.keys(obj)[0]).format("DD MMM")
      );
    },
    values() {
      return this.data.map((obj) => Object.values(obj)[0]);
    },
    plotValues() {
      // based on maxVotes create range of plot values starting at 0 and ending at maxVotes value (inclusive    )
      // for example maxVotes = 30, make range of 0 to 30 step 5
      // [0, 5, 10, 15, 20, 25, 30] and return as an array
      // this will be used to plot the y axis
      let range = [];
      let step = 5;
      for (let i = 0; i <= this.maxValue; i += step) {
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
        // newRange.push(range[range.length - 1]);
        range = newRange.sort((a, b) => b - a);
      }

      return range;
    },
    maxValue() {
      return Math.max(...this.data.map((obj) => Object.values(obj)[0]));
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
          return "col-span-8";
      }
    },
  },
};
</script>

<style></style>
