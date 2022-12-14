<template>
  <div>
    <v-card class="elevation-0 rounded-0" dark>
      <v-img
        max-height="500px"
        width="100%"
        src="/info/equipoficr.jpg"
        class="flex text-center align-end justify-center"
      >
        <!-- <div class="text-h3 mb-10 font-weight-light uppercase">Equipo</div> -->
      </v-img>
    </v-card>

    <div class="flex justify-center">
      <p class="text-base text-gray-700 md:text-2xl text-center py-20 w-6/12">
        El proyecto es conformado por un equipo multidisciplinario especialista
        en innovación y política pública
      </p>
    </div>

    <InfoComite />
    <InfoEquipo />
    <InfoConvocados />
    <InfoOrganizaciones />
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
