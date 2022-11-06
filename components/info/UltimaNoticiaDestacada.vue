<template lang="">
  <div>
    <v-container
      :fluid="$vuetify.breakpoint.width < 2000"
      :class="{
        'ma-0 pa-0': $vuetify.breakpoint.width < 2000,
        'my-0 py-0': $vuetify.breakpoint.width > 2000,
      }"
    >
      <v-carousel
        id="hc"
        class="blue-grey lighten-5"
        v-if="true"
        :continuous="true"
        :cycle="true"
        :interval="10000"
        :progress="true"
        height="auto"
        :show-arrows="true"
        :hide-delimiters="false"
        :hide-delimiter-background="true"
      >
        <v-carousel-item
          v-if="
            $store.state.noticias.featuredNoticias &&
            $store.state.noticias.featuredNoticias.data
          "
          v-for="(noticiaDestacada, index) in $store.state.noticias
            .featuredNoticias.data"
          :key="index"
          style="background: #2875ff"
          :to="`${'/noticias/' + noticiaDestacada.slug}`"
        >
          <v-card
            dark
            :style="{
              backgroundImage: `url(${
                $config.apiAssetsV2 +
                noticiaDestacada.featured_image.filename_disk
              })`,
            }"
            class="bg-fixed bg-cover"
          >
            <div class="bg-slate-800/60 py-10 py-md-0">
              <v-container>
                <v-responsive
                  :aspect-ratio="16 / 9"
                  container-class=""
                  content-class="flex align-center"
                >
                  <div>
                    <div class="text-h3 font-weight-bold">
                      {{ noticiaDestacada.title }}
                    </div>
                    <div class="font-sans text-xl-2">
                      {{ noticiaDestacada.excerpt }}
                    </div>
                    <v-btn
                      class="mt-5"
                      outlined
                      :to="`${'/noticias/' + noticiaDestacada.slug}`"
                      >Leer más</v-btn
                    >
                  </div>
                </v-responsive>
              </v-container>
            </div>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
