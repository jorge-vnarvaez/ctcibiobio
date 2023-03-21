<template>
  <!-- HERO IMAGE -->
  <v-card
    :height="$vuetify.breakpoint.mobile ? 'auto' : '100vh'"
    class="bg-cover bg-fixed h-fit"
    :style="{
      backgroundImage: `url(/illustration/encuesta_ctci.svg)`,
      backgroundPosition: 'center',
      borderWidth: '0px',
    }"
    flat
    tile
  >
    <div class="text-white bg-slate-800/90 h-full py-10">
      <div class="flex flex-col align-center justify-center h-full">
        <span
          class="block text-xs lg:text-base mt-4 text-center w-11/12 lg:w-full xl:w-8/12 font-thin"
        >
          <span class="font-black"
            >Te damos la bienvenida a la “Encuesta para la priorización de los
            focos que impulsarán el desarrollo de la CTCI en Biobío”.</span
          >
          enmarcada en el proyecto FIC-R “Estrategia de Ciencia, Tecnología,
          Conocimiento e Innovación para la Región del Biobío”.
        </span>

        <span
          class="block text-xs lg:text-base mt-4 text-center w-11/12 lg:w-10/12 xl:w-8/12"
        >
          Con los resultados de esta encuesta, diseñaremos una estrategia para
          impulsar el desarrollo de la Región del Biobío en base a la ciencia,
          la tecnología, el conocimiento y la innovación.
        </span>

        <span
          class="block text-xs lg:text-base mt-4 text-center w-11/12 lg:w-10/12 xl:w-6/12"
        >
          Ya hemos identificado más de 30 posibles focos de actuación ¿quieres
          conocer los resultados parciales de esta encuesta?, Haz clic
          <nuxt-link to="/gamificacion/resultados" target="_blank"
            ><span class="text-yellow-500 font-black">aquí</span></nuxt-link
          >
        </span>

        <span class="block text-xs lg:text-base mt-4 text-center w-11/12 lg:w-4/12 xl:w-6/12">
          Los resultados serán publicados conservando el anonimato de los participantes.
        </span>

        <span
          class="block text-xs lg:text-base mt-4 text-center w-11/12 lg:w-8/12 xl:w-6/12"
        >
          Al presionar "comenzar" declaro comprender y aceptar los términos de
          la siquiente encuesta.
        </span>

        <v-btn
          color="#ffac00"
          to="/gamificacion/iniciar"
          elevation="0"
          outlined
          class="mt-4"
          small
          rounded
          >Comenzar</v-btn
        >
      </div>
    </div>
  </v-card>
  <!-- HERO IMAGE -->
</template>

<script>
export default {
  layout: "encuesta",
};
</script>

<style></style>
