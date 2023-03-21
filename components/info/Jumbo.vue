<template lang="">
  <div>
    <v-container>
      <div class="flex flex-col align-center py-12">
        <span
          class="block text-xl lg:text-5xl font-bold text-blue-900 text-center w-10/12 mb-6"
          >Estrategia de CTCI para la Región del Biobío</span
        >

        <v-img src="/img/CTCI.png" v-if="$vuetify.breakpoint.mobile"></v-img>
        <v-img
          src="/img/CTCI.png"
          v-if="!$vuetify.breakpoint.mobile"
          width="100%"
          height="400"
          contain
          class="my-8"
        ></v-img>

        <span
          class="text-[14px] lg:text-xl text-blue-900 text-center lock mt-6 w-full lg:w-4/12"
        >
          Una iniciativa colaborativa para sentar las bases del desarrollo en
          Ciencia, Tecnología, Conocimiento e Innovación del 2022-2032
        </span>

        <iframe
          :width="$vuetify.breakpoint.mobile ? 300 : '70%'"
          :height="$vuetify.breakpoint.mobile ? 200 : 500"
          src="https://www.youtube.com/embed/YJecjsYgLZ8"
          frameborder="0"
          allowfullscreen
          class="rounded-2xl my-16"
        ></iframe>

        <InfoOrganizacionesBlack></InfoOrganizacionesBlack>
      </div>
    </v-container>

    <div :style="bg_config" class="text-white">
      <span class="block mb-6 font-bold text-base lg:text-3xl"
        >Descripción del proyecto</span
      >

      <span class="text-[14px] lg:text-lg text-center w-full lg:w-6/12">
        El desarrollo de la estrategia de CTCI para la región del Biobío tiene
        el fin de potenciar la competitividad de la región, logrando así: una
        mayor focalización del gasto público en ciencia, tecnología,
        conocimiento e innovación; facilitar la asociatividad y cooperación
        entre las entidades del ecosistema CTCI y así, fomentar el dinamismo,
        cantidad de proyectos, participación del sector privado, disminución del
        riesgo de iniciativas y aumento de su impacto.
      </span>

      <v-img src="/illustration/23.svg" class="mt-8"></v-img>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg_config: {
        backgroundImage: `url(/img/logo_blanco.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "bottom right",
        backgroundColor: "#354394",
        height: "fit-content",
        padding: "10% 10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    };
  },
};
</script>
<style lang=""></style>
