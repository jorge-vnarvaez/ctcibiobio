<template lang="">
  <div class="max-w-screen-xl mx-auto">
    <div v-if="eventosNoticias">
      <!-- Data eventos -->
      <div v-if="eventosNoticias.length > 0">
        <v-container>
          <div class="text-h4 font-weight-bold text-slate-800 mb-5">Noticias y Eventos</div>
          <div id="proximos-eventos-wrapper">
            <TypesContentCard
            v-for="(item, index) in eventosNoticias" 
            :key="index" :content="item"></TypesContentCard>
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
    },
    noticias() {
      return this.$store.state.noticias.noticias
    },
    eventosNoticias() {
      return this.eventos.concat(this.noticias).map((item) => {
        return {
          ...item,
        };
      }).slice(0, 3).sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created);
      });
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