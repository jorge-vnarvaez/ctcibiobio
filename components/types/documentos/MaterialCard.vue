<template>
  <v-col cols="12">
    <v-card elevation="0" height="300" rounded="lg" class="drop-shadow-lg">
      <div class="flex space-x-3">
        <!-- FEATURED IMAGE -->
        <div>
          <v-img
            v-if="material.featured_image && !$vuetify.breakpoint.mobile"
            :src="$config.apiUrlV2 + '/assets/' + material.featured_image"
            class="rounded-l-lg"
            width="200"
            height="300"
          />
        </div>
        <!-- FEATURED IMAGE -->

        <div class="flex flex-col p-4 lg:p-0">
          <div class="h-20 mb-2">
            <!-- TITLE -->
            <span
              class="block mt-2 font-bold text-[15px] lg:text-base whitespace-normal break-normal text-blue-900"
              >{{ material.title }}</span
            >
            <!-- TITLE -->

            <!-- TAG -->
            <v-chip
              label
              :color="
                ['Elaboración propia'].includes(material.tag)
                  ? '#2929c6'
                  : '#ff6469'
              "
              text-color="white"
              small
              class="text-[13px] w-fit"
              >{{ material.tag }}</v-chip
            >
            <!-- TAG -->
          </div>

          <!-- EXCERPT -->
          <span
            v-html="material.excerpt"
            class="text-[13px] lg:text-[14px] block h-24 lg:h-28 mt-2 w-11/12 leading-tight"
          ></span>
          <!-- EXCERPT -->

          <!-- BUTTON -->
          <div v-if="material.file">
            <a
              :href="
                $config.apiUrlV2 + '/assets/' + material.file + '?download'
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
    material: {
      type: Object,
      required: true,
    },
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 250;
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
