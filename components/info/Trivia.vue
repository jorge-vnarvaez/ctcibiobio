<template>
  <div class="bg-[#ffb204] w-full h-96 px-4 lg:px-0">
    <div class="max-w-screen-xl mx-auto py-2 lg:py-8">
      <div class="h-80 flex w-full">
        <!-- ILUSTRATION -->
        <div v-if="!$vuetify.breakpoint.mobile">
          <v-img
            src="/illustration/ilustracion.png"
            height="100%"
            width="400"
            contain
          />
        </div>
        <!-- ILUSTRATION -->

        <!-- ILUSTRATION -->

        <div v-if="!$vuetify.breakpoint.mobile">
          <v-img
            src="/illustration/vector-linea-de-puntos.png"
            height="100%"
            width="100%"
            contain
          />
        </div>
        <!-- ILUSTRATION -->

        <!-- TEXT AND BUTTON -->
        <div class="flex flex-col justify-center">
          <span class="block white--text font-black text-3xl lg:text-5xl">
            Queremos saber tu opinión sobre las misiones que queremos cumplir en la región del
            Biobío.
          </span>

          <span class="block white--text font-light text-2xl mt-2">
            Ayúdanos a responder el siguiente instrumento.
          </span>

          <div class="mt-4">
            <v-btn outlined color="white" elevation="0" to="/gamificacion">Participar</v-btn>
          </div>
        </div>
        <!-- TEXT AND BUTTON -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
