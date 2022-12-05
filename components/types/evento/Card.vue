<template lang="">
<v-card 
  :to="`/eventos/${evento.slug}`">
      <v-img 
      v-if="evento.featured_image"
      height="250px" :src="$config.apiUrlV2 + '/assets/' evento.featured_image"></v-img>
      <div class="p-4">
        <!-- <div class="font-sans text-blue-500 font-bold text-sm">{{fechaEvento}}</div> -->
        <div class="text-md font-bold text-slate-500">{{evento.title}}</div>
        <div class="text-sm text-slate-400 font-sans mt-2">{{evento.excerpt}}</div>
      </div>
  </v-card>
</template>
<script>
export default {
  props: {
    evento: {
      type: Object,
      default: () => {
        return {
          id:null,
          featured_image:null,
          title: null,
          excerpt: null,
          date_start: null,
          date_end:null,
        }
      }
    }
  },
  computed:{
    // fechaEvento(){
    //   let targetStartDate = this.evento.data_start
    //   let targetEndDate = this.evento.date_end
      
    //   let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    //   let targetStartDateMonth = targetStartDate ? this.$moment(targetStartDate).month() : null
    //   let targetEndDateMonth = targetEndDate ? this.$moment(targetEndDate).month() : null

    //   if(targetStartDate){
    //     if(targetEndDate){
    //       return `${meses[targetStartDateMonth]} ${this.$moment(targetStartDate).format('DD, YYYY')}`
    //     }
    //     if(!targetEndDate){
    //       return `${meses[targetStartDateMonth]} ${this.$moment(targetStartDate).format('DD, YYYY')}`
    //     }
    //   } else {
    //     return null
    //   }
    // }
  }
}
</script>
<style lang="">
  
</style>