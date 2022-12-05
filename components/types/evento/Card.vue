<template lang="">
<v-card 
  :to="`/eventos/${evento.slug}`">
      <v-img 
      v-if="evento.featured_image"
      height="250px" :src="$config.apiUrlV2 + '/assets/' + evento.featured_image"></v-img>
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
}
</script>
<style lang="">
  
</style>