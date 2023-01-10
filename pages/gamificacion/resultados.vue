<template>
  <div class="pb-14 grey lighten-4">
    <!-- HERO IMAGE -->
    <v-img src="/patterns/cork-wallet.png" class="pt-8" height="420">
      <v-container>
        <span class="blcok text-xl lg:text-5xl font-bold fic-2--text text--darken-3">Resultados</span>
        <span class="block text-sm lg:text-xl mt-4">
          Aquí podrás ver el ranking de priorización de focos, ordenados de mayor a menor, el ranking se compone
          de aquellos focos que han obtenido un amplio nivel de aceptación entre todos los participantes utilizando
          el sistema de clasificación de <a href="https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/" target="_blank">True Skill&#8482;</a>. 
        </span>
        <div v-if="isUserSet">
          <span class="block text-sm lg:text-2xl mt-8 mb-4">¿Te interesa seguir priorizando?</span>
          <v-btn color="purple darken-4" class="white--text" to="/gamificacion/cuestionario">Seguir Priorizando</v-btn>
        </div>

        <div v-if="!isUserSet">
          <span class="block text-sm lg:text-2xl mt-8 mb-4">¿Quieres priorizar?</span>
          <v-btn color="purple darken-4" class="white--text" to="/gamificacion">Comenzar a priorizar</v-btn>
        </div>
      </v-container>
    </v-img>
    <!-- HERO IMAGE -->
    <TypesGramificacionData></TypesGramificacionData>
    <TypesGramificacionResultados></TypesGramificacionResultados>
  </div>
</template>

<script>
export default {
    layout: "encuesta",
    computed: {
      // check if userID is set
      isUserSet() {
        return this.$store.getters['gamificacion/getUserId'];
      },
    }
}
</script>

<style>

</style>