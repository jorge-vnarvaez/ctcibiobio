<template>
  <div :style="{ background: '#354394', padding: $vuetify.breakpoint.mobile ? '15% 10%' : '3% 10%'}" class="h-fit">
    <span class="block text-white text-lg lg:text-3xl font-bold mb-10 lg:text-center">Noticias y Eventos</span>

    <div>
        <v-row>
            <TypesNoticiaFeaturedCard v-for="noticia in latestNoticias" :key="noticia.id" :noticia="noticia"></TypesNoticiaFeaturedCard>
        </v-row>
    </div>

    <div class="flex justify-center mt-8">
        <v-btn outlined rounded color="white" to="/noticias" class="px-6 py-6">
            <span class="block text-[10px] lg:text-xs font-bold text-white uppercase">
                 Ver más noticias
            </span>
        </v-btn>
    </div>
  </div>
</template>

<script>
export default {
    async fetch() {
        await this.$store.dispatch('noticias/loadLatestNoticias')
    },
    computed: {
        latestNoticias() {
            return this.$store.getters['noticias/latestNoticias']
        }
    }
}
</script>

<style lang="sass">
$btn-outline-border-width: medium
</style>