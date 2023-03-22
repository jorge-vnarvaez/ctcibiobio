<template>
  <div>
    <div :style="bg_config_top">
      <div class="flex flex-col">
          <span class="text-white text-xs lg:text-5xl font-bold">
            Estrategia de CTCI Biobío dio el vamos a su etapa de focalización
          </span>

           <div class="mt-6">
            <v-btn rounded :small="$vuetify.breakpoint.mobile"  elevation="0" to="/documento" class="px-2 py-2 px-lg-6 py-lg-6" color="white" outlined>
              <span class="block pa-2 font-bold text-[10px] lg:text-xs text-white uppercase">Ver documento</span>
            </v-btn>
          </div>

      </div>
    </div>

    <div :style="bg_config_bottom">
      <div class="flex align-center">
        <v-img src="/illustration/21.png" :width="$vuetify.breakpoint.mobile ? 132 : 300" :height="$vuetify.breakpoint.mobile ? 133 : 300" contain>
        </v-img>
        <div class="flex flex-col">
          <span class="text-[14px] lg:text-4xl w-full lg:w-10/12 text-white"
            >Participa en la selección de los focos que impulsarán el Desarrollo
            de la CTCI en la Región del Biobío</span
          >
          <div class="mt-4">
            <v-btn rounded :small="$vuetify.breakpoint.mobile" color="#fbbf24" elevation="0" to="/gamificacion" class="px-2 py-2 px-lg-6 py-lg-6">
              <span class="block pa-4 text-[10px] lg:text-xs text-blue-900 font-bold uppercase">Participar</span>
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(/img/image_14421.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "45vh",
        display: "flex",
        alignItems: "center",
        padding: "0 10%",
      },
      bg_config_bottom: {
        backgroundImage: `url(/img/logo_blanco.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "bottom right",
        backgroundColor: "#078BC7",
        height: "45vh",
        padding: "0 10%",
        display: "flex",
        alignItems: "center",
      },
    };
  },
};
</script>

<style lang="sass">
</style>>
