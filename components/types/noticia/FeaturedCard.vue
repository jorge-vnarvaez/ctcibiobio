<template>
  <v-col cols="12" lg="4">
    <v-card
      elevation="0"
      :height="$vuetify.breakpoint.mobile ? 189 : 250"
      rounded="xl"
      class="drop-shadow-xl"
      :style="{ borderWidth: '0px' }"
    >
      <div class="flex space-x-2">
        <v-img
          v-if="noticia.featured_image"
          :src="$config.apiUrlV2 + '/assets/' + noticia.featured_image.id"
          class="rounded-l-xl"
          :height="$vuetify.breakpoint.mobile ? 189 : 250"
          width="50%"
        >
        </v-img>
        <div
          class="flex flex-col justify-between"
          :style="{ padding: $vuetify.breakpoint.mobile ? '5% 6% 3% 2%' : '3% 6% 3% 2%' }"
        >
          <span class="block text-[12px] lg:text-sm text-blue-900 font-bold leading-tight">{{
            noticia.title
          }}</span>

          <div class="bg-blue-900 h-[2px] w-12 my-2"></div>

          <span class="block text-[10px] lg:text-xs text-slate-400 h-[45px]">
            {{ noticia.excerpt.slice(0, 50) }}...
          </span>

          <div class="flex justify-end align-end">
            <nuxt-link :to="`/noticias/${noticia.slug}`" class="p-0">
              <span class="text-[9px] lg:text-[14px] text-sky-500 capitalize"
                >Leer más</span
              >
            </nuxt-link>
          </div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    noticia: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
