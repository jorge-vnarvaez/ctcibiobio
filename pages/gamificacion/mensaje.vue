<template>
  <v-img src="/patterns/spikes.webp" height="910" class="py-12 lg:py-0">
    <div
      class="d-flex flex-column lg:h-full align-center justify-center lg:max-w-screen-2xl lg:mx-auto"
    >
      <span
        class="block text-2xl lg:text-4xl font-black text-[#2929c6] text-center w-11/12"
        >Estamos preparando una nueva combinación de focos interesantes para
        ti</span
      >
      <span class="block mt-4 text-center">
        Por mientras te sugerimos revisar la priorización de los focos.
      </span>

      <v-btn
        color="purple darken-4"
        to="/gamificacion/resultados"
        elevation="0"
        class="white--text text-capitalize mt-8"
        >Ver Resultados</v-btn
      >

      <v-btn
        color="#ffac00"
        to="/gamificacion/cuestionario"
        elevation="0"
        class="text-capitalize mt-4"
        >Volver a priorizar</v-btn
      >
    </div>
  </v-img>
</template>

<script>
export default {};
</script>

<style></style>
