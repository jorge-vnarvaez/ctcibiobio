<template>
  <v-col cols="12">
    <v-card elevation="4" :height="height" rounded="xl">
      <div class="flex space-x-3">
        <!-- FEATURED IMAGE -->
          <v-img
            v-if="material.featured_image"
            :src="$config.apiUrlV2 + '/assets/' + material.featured_image"
            class="rounded-l-xl"
            :width="$vuetify.breakpoint.mobile ? '40%' : '55%'"
            :height="height"
          >
          </v-img>
        <!-- FEATURED IMAGE -->

        <div class="flex flex-col">
          <div class="h-16 mb-2">
            <!-- TITLE -->
            <span
              class="block mt-2 font-bold text-[12px] lg:text-sm w-9/12 text-blue-900"
              >{{ material.title.length > 34 ? material.title.slice(0, 34) + '...' : material.title }}</span
            >
            <!-- TITLE -->

            <!-- TAG -->
              <v-chip label :color="['Elaboración propia'].includes(material.tag) ? '#2929c6' : '#ff6469'" text-color="white" small class="text-[10px] w-fit">{{ material.tag }}</v-chip>
            <!-- TAG -->
          </div>

          <!-- EXCERPT -->
          <span
            v-html="material.excerpt"
            class="text-[10px] lg:text-[14px] block h-20 lg:h-28 mt-2 w-11/12 leading-tight"
          ></span>
          <!-- EXCERPT -->

          <!-- BUTTON -->
          <div class="flex" v-if="material.file">
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
