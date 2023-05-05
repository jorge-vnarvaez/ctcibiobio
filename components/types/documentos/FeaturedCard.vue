<template>
  <v-col cols="12" md="6" lg="6" xl="4">
    <v-card elevation="0" :height="height" rounded="xl" class="drop-shadow-xl">
      <div class="flex space-x-3">
        <!-- FEATURED IMAGE -->
        <v-img
          v-if="document.featured_image"
          :src="$config.apiUrlV2 + '/assets/' + document.featured_image"
          class="rounded-l-xl"
          width="50%"
          :height="height"
        >
        </v-img>
        <!-- FEATURED IMAGE -->

        <div class="flex flex-col">
          <!-- TITLE -->
          <span
            class="block mt-2 font-bold text-[12px] lg:text-sm w-10/12 text-blue-900 h-10 lg:h-12"
            >{{ document.title }}</span
          >
          <!-- TITLE -->

          <!-- EXCERPT -->
          <span
            v-html="document.excerpt"
            class="text-[10px] lg:text-[14px] block h-20 lg:h-32 mt-2 w-11/12 leading-tight"
          ></span>
          <!-- EXCERPT -->

          <!-- BUTTON -->
          <div class="flex" v-if="document.file">
            <a
              :href="
                $config.apiUrlV2 + '/assets/' + document.file + '?download'
              "
            >
              <v-btn
                outlined
                color="#068AC6"
                class="py-2 px-2"
                :x-small="$vuetify.breakpoint.mobile"
                :small="!$vuetify.breakpoint.mobile"
              >
                <span class="text-[10px] lg:text-[12px] font-bold">
                  Descargar PDF
                </span>
              </v-btn>
            </a>
          </div>
          <!-- BUTTON -->
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 250;
        case "md":
          return 300;
        case "lg":
          return 280;
        case "xl":
          return 280;
      }
    },
  },
};
</script>

<style></style>
