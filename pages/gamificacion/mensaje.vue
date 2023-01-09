<template>
  <v-img src="/patterns/spikes.webp" height="910" class="py-12 lg:py-0">
    <div
      class="d-flex flex-column lg:h-full align-center justify-center lg:max-w-screen-2xl lg:mx-auto"
    >
      <span
        class="block text-2xl lg:text-4xl font-black text-[#2929c6] text-center w-7/12"
        >Hemos preparado una nueva combinación de focos que pueden resultar interesantes
        ti.</span
      >

      <v-btn
        color="purple darken-4"
        to="/gamificacion/cuestionario"
        elevation="0"
        class="text-capitalize mt-6 white--text"
        >Continuar / seguir priorizando</v-btn
      >

      <span class="block mt-8 text-center">
        ¿Quieres conocer los resultados parciales de esta encuesta?
      </span>

      <v-btn
        color="#ff6469"
        to="/gamificacion/resultados"
        elevation="0"
        class="white--text text-capitalize mt-4"
        >Ver Resultados</v-btn
      >

      
    </div>
  </v-img>
</template>

<script>
export default {};
</script>

<style></style>
