<template lang="">
  <div>
    <v-responsive :aspect-ratio="16 / 6" class="flex align-center">
      <InfoUltimaNoticiaDestacada></InfoUltimaNoticiaDestacada>

      <v-container>
        <v-card
          color="amber lighten-5"
          class="elevation-0 mt-4"
          flat
          href="https://form.typeform.com/to/O4QHEvzE"
          target="_blank"
        >
          <div class="d-flex flex-column flex-md-row align-center">
            <img src="/img/rrssfic2.jpg" height="400px" width="400px" />
            <div class="pa-10">
              <div class="text-2xl font-weight-bold text-slate-800 mb-5">
                ¡Ayúdanos a construir la estrategia de CTCI del Biobío!
              </div>
              <div class="text-lg text-slate-800 mb-5">
                El objetivo principal de esta encuesta es recoger impresiones
                sobre la importancia de la innovación y su desempeño en la
                región del Biobío.
              </div>
              <v-btn
                outlined
                color="black"
                medium
                class="mt-4 text-capitalize font-weight-bold text-slate-800"
                href="https://form.typeform.com/to/O4QHEvzE"
                target="_blank"
                >Realizar encuesta</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-container>

      <!-- Derivadores globales -->
      <InfoDerivadoresGlobales></InfoDerivadoresGlobales>
      <!-- Derivadores globales -->

      <!-- Próximos eventos -->
      <TypesEventoProximosEventos></TypesEventoProximosEventos>
      <!-- Próximos eventos -->
    </v-responsive>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
