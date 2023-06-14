<template>
  <div
    class="py-10 h-full grey lighten-4" :style="{ padding:
    $vuetify.breakpoint.mobile ? '15% 7%' : '3% 7%' }">
    <v-container>
      <div class="pb-6 pb-lg-16">
        <div class="flex flex-col align-center justify-center">
          <span class="block text-center text-2xl lg:text-5xl text-blue-900 font-bold"
            >Capacitaciones para el ecosistema de CTCI</span
          >
          <span
            class="block text-center my-8 text-sm lg:text-base w-full lg:w-7/12 text-blue-900 font-light"
          >
           Potenciando el crecimiento y el conocimiento: Impulsando el ecosistema de CTCI mediante capacitaciones especializadas.
          </span>
        </div>
      </div>

      <div>
        <TypesCapacitacionesList />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>