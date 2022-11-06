<template lang="">
    <v-card 
      :to="`/noticias/${noticia.slug}`">
          <v-img 
          v-if="noticia.featured_image"
          height="250px" :src="$config.apiAssetsV2 + noticia.featured_image.filename_disk"></v-img>
          <div class="p-4">
            <div class="text-md font-bold text-slate-500">{{noticia.title}}</div>
            <div class="text-sm text-slate-400 font-sans mt-2">{{noticia.excerpt}}</div>
          </div>
    </v-card>
</template>
<script>
export default {
  props: {
    noticia: {
        type: [Object],
        // Devolver con una función
        default: function () {
            return {
              data: null
            }
        }
    },
  },
}
</script>
<style lang="">
  
</style>