<template>
  <intersect @enter="showCifras = true" @leave="showCifras = false">
    <div :style="[bg_config, padding_config, height]">
      <span
        class="block text-white text-lg lg:text-3xl font-bold mb-6 lg:text-center"
        >CTCI en cifras</span
      >
      <div style="border-bottom: 1px dashed white"></div>

      <div
        class="flex flex-col lg:flex-row lg:justify-center space-y-4 lg:space-y-0"
      >
        <UtilitariosCifra
          v-for="cifra in cifras"
          :key="cifra.id"
          :item="cifra"
          :can_run="showCifras"
        />
      </div>
    </div>
  </intersect>
</template>

<script>
import Intersect from "vue-intersect";
export default {
  components: { Intersect },
  data() {
    return {
      showCifras: false,
      bg_config: {
        backgroundImage: `
        linear-gradient(rgba(235, 100, 107, 1), rgba(235, 100, 107, 1)), 
        linear-gradient(rgba(235, 100, 107, 0.5), rgba(235, 100, 107, 0.5)), 
        url(/img/bg_cifras.png)`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      cifras: [
        {
          id: "cifra_1",
          value: 60,
          label: "entrevistados",
          icon: "fa-solid fa-person-circle-check",
        },
        {
          id: "cifra_2",
          value: 1000,
          label: "encuestados",
          icon: "fa-solid fa-clipboard-list-check",
        },
        {
          id: "cifra_3",
          value: 250,
          label: "participantes en talleres",
          icon: "fa-solid fa-screen-users",
        },
      ],
    };
  },
  computed: {
    padding_config() {
      return {
        padding: this.$vuetify.breakpoint.mobile ? "15% 10%" : "5% 10%",
      };
    },
    height() {
      return {
        height: this.$vuetify.breakpoint.mobile ? "100vh" : "70vh",
      };
    },
  },
};
</script>

<style></style>
