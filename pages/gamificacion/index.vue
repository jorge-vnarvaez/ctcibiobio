<template>
  <!-- HERO IMAGE -->
  <v-card
    :height="$vuetify.breakpoint.mobile ? 'auto' : '100vh'"
    class="bg-cover bg-fixed"
    :style="{
      backgroundImage: `url(illustration/encuesta_ctci.svg)`,
      backgroundPosition: 'center',
    }"
  >
    <div class="text-white bg-blue-900/60 h-full py-8">
      <div class="flex flex-col align-center justify-center h-full">
        <span class="block text-sm lg:text-base mt-4 text-center w-11/12 lg:w-6/12">
          Te damos la bienvenida a la <b>“Encuesta para la priorización de los
          focos que impulsarán el desarrollo de la CTCI en Biobío”.</b> Este es un
          instrumento generado por el equipo ejecutor del proyecto FIC-R
          “Estrategia de Ciencia, Tecnología, Conocimiento e Innovación para la
          Región del Biobío”.
        </span>

        <span class="block text-sm lg:text-base mt-4 text-center w-11/12 lg:w-6/12">
          Para conocer cuáles son en tu opinión, los desafíos prioritarios que
          debemos abordar para alcanzar un mejor futuro para el Biobío, hemos
          identificado más de 30 opciones entre las que podrás elegir.
        </span>

        <span class="block text-sm lg:text-base mt-4 text-center w-11/12 lg:w-6/12">
          Las respuestas son de carácter anónimo y los datos demográficos son de
          uso exclusivamente identificativo, con el fin de agrupar las
          respuestas. Los resultados serán publicados de forma global,
          conservando el anonimato de los participantes.
        </span>

        <span class="block text-sm lg:text-base mt-4 text-center w-11/12 lg:w-6/12">
          ¿Quiéres saber sobre los focos que se están priorizando? Haz clic
          <nuxt-link to="/gamificacion/resultados" target="_blank"
            ><span class="text-yellow-500 font-bold">aquí</span></nuxt-link
          >
        </span>

        <span class="block mt-4 text-center w-11/12 lg:w-6/12">
          Al presionar "comenzar" declaro comprender y aceptar los términos de
          la siquiente encuesta.
        </span>

        <v-btn
          color="#ffac00"
          to="/gamificacion/iniciar"
          elevation="0"
          class="mt-4"
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
