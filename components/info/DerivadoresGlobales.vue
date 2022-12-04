<template>
  <div class="max-w-screen-xl mx-auto">
    <v-container>
      <v-responsive :aspect-ratio="16/6" class="flex align-center">
        <div class="d-flex flex-column flex-md-row my-10 justify-between">
            <div class="mx-3 mt-4">
              <v-img width="60px" height="60px" class="mb-5" contain src="/iconos/modelo.png"></v-img>
              <div class="text-xl font-weight-bold text-slate-800 mb-5">Explora el modelo estratégico</div>
              <nuxt-link to="/estrategia">
                <div class="text-base font-weight-bold text-slate-400">Ver modelo</div>
              </nuxt-link>
            </div>
            <div class="mx-3 mt-4">
              <v-img width="60px" height="60px" class="mb-5" src="/iconos/calendario.png"></v-img>
              <div class="text-xl font-weight-bold text-slate-800 mb-5">Participa de las actividades del proyecto</div>
              <nuxt-link to="/eventos">
                <div class="text-base font-weight-bold text-slate-400">Revisar calendario</div>
              </nuxt-link>
            </div>
            <div class="mx-3 mt-4">
              <v-img width="60px" height="60px"  class="mb-5" src="/iconos/grupo.png"></v-img>
              <div class="text-xl font-weight-bold text-slate-800 mb-5">Conoce el equipo gestor del proyecto</div>
              <nuxt-link to="/equipo">
                <div class="text-base font-weight-bold text-slate-400">Conocer equipo</div>
              </nuxt-link>
            </div>
        </div>
      </v-responsive>
    </v-container>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  
</style>