<template lang="">
  <div>
    <v-carousel
      v-if="$store.state.noticias.featuredNoticias.data"
      :continuous="true"
      :cycle="true"
      :interval="10000"
      :progress="true"
      hide-delimiters
      height="auto"
    >
      <v-carousel-item
        v-for="(noticiaDestacada, index) in $store.state.noticias
          .featuredNoticias.data"
        :key="index"
      >
        <v-card
          dark
          :style="{
            backgroundImage: `url(${
              $config.apiAssetsV2 +
              noticiaDestacada.featured_image.filename_disk
            })`,
            backgroundPosition: 'center',
          }"
          class="bg-fixed bg-cover h-full"
        >
          <div class="bg-slate-800/40 py-10 py-md-0 h-full">
            <div class="max-w-screen-xl mx-auto">
              <v-container>
                <v-responsive
                  :aspect-ratio="16 / 6"
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
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <!-- <v-carousel
      class="blue-grey lighten-5"
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
                  :aspect-ratio="16 / 6"
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
    </v-carousel> -->
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
