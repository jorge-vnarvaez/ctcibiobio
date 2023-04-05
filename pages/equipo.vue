<template>
  <div class="grey lighten-4">
    <v-card class="elevation-0 rounded-0" dark>
      <v-img max-height="500px" width="100%" src="/info/equipo_ficr2.jpg" position="50% 20%">
        <!-- <div class="text-h3 mb-10 font-weight-light uppercase">Equipo</div> -->
      </v-img>
    </v-card>


    <div class="flex flex-col align-center justify-center" :style="{ padding: $vuetify.breakpoint.mobile ? '10% 7%' : '4% 0% 2% 0%' }">
      <p class="text-xs text-blue-900 md:text-2xl text-center w-full lg:w-6/12 font-bold">
        Nuestro equipo multidisciplinario está conformado por especialistas y
        expertos en estrategia e innovación
      </p>

      <v-divider></v-divider>
    </div>

    <InfoYoutubeDeliveries></InfoYoutubeDeliveries>

    <v-divider></v-divider> 

    <InfoGobierno></InfoGobierno>

    <v-divider></v-divider>

    <InfoComite />

    <v-divider></v-divider>

    <InfoEquipo />
    <!-- <InfoConvocados /> -->
    <!-- <InfoOrganizaciones /> -->
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
