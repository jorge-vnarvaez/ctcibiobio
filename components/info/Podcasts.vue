<template>
  <div :style="{ padding: $vuetify.breakpoint.mobile ? '5% 10%' : '3% 7%' }">
    <div
      class="max-w-screen-xl mx-auto"
    >
      <v-container>
        <span
          class="block text-blue-900 text-lg lg:text-3xl mb-4 font-bold lg:text-center"
          >Podcasts CTCI</span
        >

        <span class="block text-slate-400 text-xs lg:text-xl lg:text-center mb-6">
          Sintoniza nuestros podcasts y adéntrate en el ecosistema de ciencia, tecnología, conocimiento e innovación de la región del Biobío
        </span>

        <div style="border-bottom: 1px dashed #1e3a8a" class="mb-4"></div>
      </v-container>
    </div>

    <v-container>
      <TypesPodcastsList />
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
