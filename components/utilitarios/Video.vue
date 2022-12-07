<template>
  <div class="grid grid-cols-12 content-center">
    <iframe :src="src" :height="height" :width="width" class="col-span-6 mb-4 lg:mb-0"></iframe>
    <span class="col-span-12 lg:col-span-6 text-xl lg:text-2xl  text-slate-800 ">
      Intervención de <span class="font-bold">Iván Valenzuela, Jefe de División de Fomento e Industria
      GORE Biobío</span>, en el Taller Inicial de la Estrategia de CTCI Biobío 2022,
      destacando la importancia de esta estrategia para el desarrollo de la
      región del Biobío, que se logrará con colaboración, capital humano y todas
      las capacidades que posee nuestra región.
    </span>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    height() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 280;
        case 'sm':
          return 300;
        case 'md':
          return 400;
        case 'lg':
          return 400;
        case 'xl':
          return 400;
      }
    },
    width() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 320;
        case 'sm':
          return 340;
        case 'md':
          return 400;
        case 'lg':
          return 550;
        case 'xl':
          return 600;
      }
    }
  }
};
</script>

<style></style>
