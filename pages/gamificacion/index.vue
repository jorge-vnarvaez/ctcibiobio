<template>
  <!-- HERO IMAGE -->
  <v-img src="/patterns/cork-wallet.png" class="pt-8" :height="$vuetify.breakpoint.mobile ? '100%' : '720'">
    <v-container>
      <span class="block text-sm lg:text-xl mt-4">
        Te damos la bienvenida a la “Encuesta para la Priorización de las
        Misiones que impulsarán el desarrollo de la CTCI en Biobío”, la cual, es
        un instrumento generado por la Unidad de Innovación de la Universidad de
        Concepción, en el marco del desarrollo del proyecto FIC-R “Estrategia de
        Ciencia, Tecnología, Conocimiento e Innovación”. El objetivo de esta
        encuesta es Determinar cuáles son, según la ciudadanía, las principales
        misiones para el futuro del Biobío, y Agruparlas por orden de prioridad.
      </span>

      <span class="block text-sm lg:text-xl mt-4">
        Las políticas orientadas por misiones (POM) conducen a la acción dentro
        de un marco audaz de amplia relevancia social, dirección clara y
        orientada a actividades de innovación ambiciosas. Queremos saber cuáles
        son, en tu opinión, los desafíos prioritarios que debemos abordar para
        alcanzar nuestro desarrollo.
      </span>

      <span class="block text-sm lg:text-xl mt-4">
        Las respuestas son de carácter anónimo y los datos demográficos son de
        uso exclusivamente identificativo, con el fin de agrupar las respuestas.
        Los resultados serán publicados de forma global, conservando el
        anonimato de los participantes.
      </span>

      <span class="block text-sm lg:text-xl mt-4">
        ¿Quieres saber sobre las misiones que se están priorizando? Haz clic <nuxt-link to="/gamificacion/resultados" target="_blank">aquí</nuxt-link>
      </span>

      <span class="block mt-4">
        Al presionar "comenzar" declaro comprender y aceptar los términos de la siquiente encuesta.
      </span>

      <v-btn color="#ffac00" to="/gamificacion/iniciar" elevation="0" class="mt-4">Comenzar</v-btn>

    
    </v-container>
  </v-img>
  <!-- HERO IMAGE -->
</template>

<script>
export default {
  layout: "encuesta",
};
</script>

<style></style>
