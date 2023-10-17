<template>
  <div>
    <div v-if="$vuetify.breakpoint.mobile" :style="bg_config_top">
      <div class="flex space-x-4 justify-between items-center">
        <span class="inline text-[#546E7A] text-sm lg:text-3xl font-bold">Conoce la Estrategia de CTCI (2023-2033) para la Región del Biobío</span>
        <v-img src="/img/ctci_Brochure_Mockup2.png" class="inline rounded-l-lg" width="170" height="180" />
      </div>

      <div class="mt-4">
        <v-btn color="#ff474b" rounded elevation="0" class="px-6 py-6">
          <a :href="$config.apiUrlV2 + '/assets/' + parent_document.estrategia + '?download'">
            <span class="block text-white text-xs font-bold">Descargar Estrategia</span>
          </a>
        </v-btn>
      </div>
    </div>

    <div v-if="!$vuetify.breakpoint.mobile" :style="bg_config_top">
      <div class="flex space-x-4 justify-between items-center">
        <div class="flex flex-col space-y-4">
          <span class="block w-8/12 text-[#546E7A] text-sm lg:text-3xl font-bold">Conoce la Estrategia de CTCI (2023-2033) para la Región del Biobío</span>
          <div>
            <v-btn color="#ff474b" rounded elevation="0" class="px-6 py-6">
              <a :href="$config.apiUrlV2 + '/assets/' + parent_document.estrategia + '?download'">
                <span class="block text-white text-xs font-bold">Descargar Estrategia</span>
              </a>
            </v-btn>
          </div>
        </div>
        <v-img src="/img/ctci_brochure_mockup.png" class="rounded-l-lg" width="500"  height="240" />
      </div>
    </div>

    <div v-if="$vuetify.breakpoint.mobile" :style="bg_config_bottom_m">
      <div class="flex space-x-4 justify-between items-center">
        <v-img src="/illustration/21.png" :width="$vuetify.breakpoint.mobile ? 132 : 300" :height="$vuetify.breakpoint.mobile ? 133 : 300" contain> </v-img>
        <span class="inline text-white text-xs">Revisa las actividades realizadas con la comunidad durante el proceso de desarrollo de la estrategia.</span>
      </div>

      <div class="mt-6 flex justify-center">
        <v-btn rounded color="#fbbf24" elevation="0" to="/comunidad" class="px-2 py-2 px-lg-6 py-lg-6">
          <span class="block pa-4 text-[14px] lg:text-xs text-blue-900 font-bold uppercase">Ver más</span>
        </v-btn>
      </div>
    </div>

    <div v-if="!$vuetify.breakpoint.mobile" :style="bg_config_bottom">
      <div class="flex align-center">
        <v-img src="/illustration/21.png" :width="$vuetify.breakpoint.mobile ? 132 : 300" :height="$vuetify.breakpoint.mobile ? 133 : 300" contain> </v-img>
        <div class="flex flex-col">
          <span class="text-[14px] lg:text-4xl w-full lg:w-10/12 text-white">Revisa las actividades realizadas con la comunidad durante el proceso de desarrollo de la estrategia.</span>
          <div class="mt-4">
            <v-btn rounded :small="$vuetify.breakpoint.mobile" color="#fbbf24" elevation="0" to="/comunidad" class="px-2 py-2 px-lg-6 py-lg-6">
              <span class="block pa-4 text-[10px] lg:text-xs text-blue-900 font-bold uppercase">Ver más</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bg_config_top: {
        height: "45vh",
        padding: "3% 10%",
        backgroundColor: "#ECEFF1",
      },
      bg_config_bottom: {
        backgroundImage: `url(/img/logo_blanco.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "bottom right",
        backgroundColor: "#078BC7",
        height: "45vh",
        display: "flex",
        alignItems: "center",
        padding: "7% 10%",
      },
      bg_config_bottom_m: {
        backgroundImage: `url(/img/logo_blanco.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "bottom right",
        backgroundColor: "#078BC7",
        height: "45vh",
        padding: "7% 10%",
      },
    };
  },
  computed: {
    parent_document() {
      return this.$store.getters["documento/getParentDocument"];
    },
  },
};
</script>

<style>
img {
  width: 120px;
  height: fit-content;
  object-fit: cover;
}
</style>
>
