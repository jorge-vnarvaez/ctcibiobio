<template lang="">
  <div>
    <div v-if="eventos">
      <!-- Data eventos -->
      <div v-if="eventos.data">
        <v-container>
          <div class="text-h4 font-weight-bold text-slate-800 mb-5">Próximos eventos</div>
          <div id="proximos-eventos-wrapper">
            <TypesEventoCard 
            v-for="(evento, index) in eventos.data" 
            :key="index" :evento="evento"></TypesEventoCard>
          </div>
        </v-container>
        <!-- <pre>{{eventos.data}}</pre> -->
        
      </div>
      <!-- Data eventos -->

      <!-- No hay eventos con los parámetros solicitados -->
      <div v-else>Error</div>
      <!-- No hay eventos con los parámetros solicitados -->
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    eventos(){
      return this.$store.state.eventos.eventos
    }
  }
}
</script>
<style lang="scss" scoped>
  #proximos-eventos-wrapper {
    display:grid;
    grid-template-columns: repeat(3,minmax(0, 1fr));
    gap:20px;
    @media (max-width:600px) {
      display: flex;
      flex-direction: column;
    }
  }
</style>