<template>
  <div>
    <div v-if="!reverse" class="grid grid-cols-12 content-center gap-x-0 lg:gap-x-8">
      <iframe
        :src="src"
        :height="height"
        :width="width"
        class="col-span-6 mb-4 lg:mb-0"
      ></iframe>
       <div
        class="col-span-12 lg:col-span-6 text-xl lg:text-2xl text-slate-800  mb-4 lg:mb-0 flex align-center"
      >
        <span v-html="txt"> </span>
      </div>
    </div>

    <div v-if="reverse" class="grid grid-cols-12 content-center gap-x-0 lg:gap-x-8">
      <div
        class="col-span-12 lg:col-span-6 text-xl lg:text-2xl text-slate-800  mb-4 lg:mb-0 flex align-center"
      >
        <span v-html="txt"> </span>
      </div>

      <iframe
        :src="src"
        :height="height"
        :width="width"
        class="col-span-6"
      ></iframe>
    </div>
  </div>
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
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 280;
        case "sm":
          return 300;
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
          return 320;
        case "sm":
          return 340;
        case "md":
          return 400;
        case "lg":
          return 550;
        case "xl":
          return 600;
      }
    },
  },
};
</script>

<style></style>
