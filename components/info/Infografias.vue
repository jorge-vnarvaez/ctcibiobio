<template>
  <div v-if="infographics.length > 0">
    <div class="max-w-screen-xl mx-auto py-12" :style="{ padding: $vuetify.breakpoint.mobile ? '5% 10%' : '3% 7%' }">
      <v-container>
        <span
          class="block text-blue-900 text-lg lg:text-3xl mb-6 font-bold lg:text-center"
          >Infografías</span
        >

        <div style="border-bottom: 1px dashed #1e3a8a"></div>
        
      </v-container>
    </div>

    <CoolLightBox
      :items="
        infographics.map((infographic) => {
          return (
            $config.apiUrlV2 + '/assets/' + infographic.image + '?quality=80'
          );
        })
      "
      :index="index"
      :fullScreen="true"
      useZoomBar
      closeOnClickOutsideMobile
      @close="index = null"
    >
    </CoolLightBox>

    <VueSlickCarousel
      v-bind="settings"
      :slidesToShow="$vuetify.breakpoint.mobile ? 1 : 3"
    >
      <v-img
        v-for="(infographic, infographicIndex) in infographics"
        :key="infographic.id"
        :src="$config.apiUrlV2 + '/assets/' + infographic.image + '?quality=80'"
        @click="index = infographicIndex"
        class="cursor-pointer h-full w-full"
      ></v-img>
    </VueSlickCarousel>

    <div class="flex justify-center mt-12">
      <v-btn rounded outlined color="#1e3a8a" to="/infografias">
        Ver más infografías
      </v-btn>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  components: {
    VueSlickCarousel,
    CoolLightBox,
  },
  data() {
    return {
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "ease-out",
      },
      index: null,
    };
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    await this.$store.dispatch("infografias/loadFeatured");
  },
  computed: {
    infographics() {
      return this.$store.getters["infografias/getFeatured"];
    },
  }
};
</script>

<style></style>
