<template>
  <v-card class="pa-6 drop-shadow-xl" elevation="0" rounded="xl" :width="$vuetify.breakpoint.mobile ? 320 : 800">
    <div class="flex flex-col">
      <iframe
        :src="src"
        :height="height"
        :width="width"
        class="col-span-6 mb-4 lg:mb-0 rounded-lg"
      ></iframe>
      <div
        class="col-span-12 lg:col-span-6 text-xl lg:text-2xl text-slate-800 mb-4 lg:mb-0 flex align-center"
      >
        <span v-html="txt" class="text-[14px] lg:text-[21px] leading-snug"> </span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    txt: {
      type: String,
      required: true,
    },
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 220;
        case "md":
          return 400;
        case "lg":
          return 400;
        case "xl":
          return 400;
      }
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 270;
        case "sm":
          return 270;
        case "md":
          return 400;
        case "lg":
          return 750;
        case "xl":
          return 750;
      }
    },
  },
};
</script>

<style></style>
