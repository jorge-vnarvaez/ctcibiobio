<template>
  <div :style="{ background: '#EB646B', padding: $vuetify.breakpoint.mobile ? '15% 7%' : '3% 7%'}" class="h-fit">
    <span class="block text-white text-lg lg:text-3xl font-bold mb-12 lg:text-center">CTCI en cifras</span>

    <div class="flex flex-col lg:flex-row align-center lg:justify-around space-y-8 lg:space-y-0">
      <UtilitariosCifra v-for="cifra in cifras" :key="cifra.id" :item="cifra" />      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cifras: [
        { id: 'cifra_1', value: '+60', label: 'entrevistados', icon: 'fa-solid fa-person-circle-check' },
        { id: 'cifra_2', value: '+1.000', label: 'encuestados', icon: 'fa-solid fa-clipboard-list-check' },
        { id: 'cifra_3', value: '+250', label: 'participantes en talleres', icon: 'fa-solid fa-screen-users' },
      ]
    }
  }
};
</script>

<style></style>
