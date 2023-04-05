<template>
  <div class="max-w-screen-xl mx-auto pb-12">
    <v-container>
      <div class="flex flex-col align-center justify-center">
        <UtilitariosVideo
          :src="activeVideo.src"
          :txt="activeVideo.txt"
        />

        <div class="flex justify-center mt-6 space-x-4">
          <div v-for="delivery in deliviries" :key="delivery.id">
            <v-icon
              :class="[
                activeVideoKey == delivery.id
                  ? 'opacity-100'
                  : 'opacity-25',
                  'cursor-pointer'
              ]"
              small
              @click="activeVideoKey = delivery.id"
              >mdi-circle</v-icon
            >
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeVideoKey: 'delivery_1',
      deliviries: [
        {
          id: "delivery_1",
          src: "https://www.youtube.com/embed/ggQHr_31SVY",
          txt: "Intervención de <span class='font-bold'>Iván Valenzuela, Jefe de División de Fomento e Industria GORE Biobío</span>, en el Taller Inicial de la Estrategia de CTCI Biobío 2022, destacando la importancia de esta estrategia para el desarrollo de la región del Biobío, que se logrará con colaboración, capital humano y todas las capacidades que posee nuestra región.",
        },
        {
          id: "delivery_2",
          src: "https://www.youtube.com/embed/t1-6hozWx0k",
          txt: "Intervención de la Seremi de Ciencia, Tecnología, Conocimiento e Innovación Macrozona Sur, Sofía Valenzuela, en el Taller de Mujeres para la Construcción de la Estrategia de CTCI Biobío 2022. ",
        },
      ],
    };
  },
  computed: {
    activeVideo() {
      return this.deliviries.find((delivery) => delivery.id === this.activeVideoKey);
    },
  }
};
</script>

<style></style>
