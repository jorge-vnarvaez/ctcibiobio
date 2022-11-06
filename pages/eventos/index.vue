<template lang="">
  <div  class="max-w-screen-xl mx-auto pt-[35px]">
    <div v-if="eventos">
      <!-- Data eventos -->
      <div v-if="eventos.data">
        <v-container>
          <div id="eventos-wrapper">
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
  head(){
    return {
      title: 'Eventos',
      meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Actividades del proyecto'
          }
      ],
    }  
  },
  computed: {
    eventos(){
      return this.$store.state.eventos.eventos
    }
  },
}
</script>
<style lang="scss">
  #eventos-wrapper {
    display:grid;
    grid-template-columns: repeat(3,minmax(0, 1fr));
    gap:20px;

    @media (max-width:600px) {
      grid-template-columns: 1fr;
      display:flex;
      flex-direction: column;
    }
  }
</style>