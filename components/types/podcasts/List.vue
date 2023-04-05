<template>
  <div id="wrapper">
    <v-card
      v-for="podcast in podcasts"
      :key="podcast.id"
      rounded="xl"
      class="drop-shadow-xl lg:drop-shadow-2xl decoration-slate-300 cursor-pointer"
      elevation="0"
      :width="$vuetify.breakpoint.mobile ? 320 : 700"
      :min-width="$vuetify.breakpoint.mobile ? 320 : 450"
      :height="$vuetify.breakpoint.mobile ? 420 : 620"
      :href="podcast.url"
      target="_blank"
    >
      <div>
        <v-img
          v-if="podcast.featured_image"
          :src="$config.apiUrlV2 + '/assets/' + podcast.featured_image"
          contain
          class="rounded-t-xl"
        ></v-img>
      </div>

      <div class="px-4 px-lg-6 py-2 py-lg-4">
        <span class="block text-[15px] lg:text-[17px] text-blue-900 font-bold h-10">{{
          podcast.title
        }}</span>
        <span class="block text-[12px] lg:text-[15px] text-slate-500 h-28">{{
          podcast.excerpt
        }}</span>
        <div class="flex justify-between">
          <div>
            <v-chip color="#2929C6" text-color="white">{{ podcast.duration }} min</v-chip>
            <v-chip color="red darken-1" text-color="white">Youtube</v-chip>
          </div>

          <div>
            <v-btn class="text-capitalize text-[14px] lg:text-base" color="red darken-1" text>
              Sintonizar
            </v-btn>
          </div>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch("podcasts/loadPodCasts");
  },
  computed: {
    podcasts() {
      return this.$store.getters["podcasts/podcasts"];
    },
  },
};
</script>

<style lang="postcss">
#wrapper {
  @apply snap-x space-x-8;
  @apply pb-12;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  height: fit-content;
}

#wrapper::-webkit-scrollbar {
  height: 8px;
}

#wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}
#wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
  max-width: 20px;
}
</style>
