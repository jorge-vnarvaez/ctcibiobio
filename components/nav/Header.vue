<template>
<v-app-bar elevation="0" height="90px">
  <v-container fluid class="d-flex justify-space-between align-center">

    <div class="d-flex">
      <nuxt-link to="/">
        <no-ssr>
          <v-img max-height="45px" height="45px" max-width="210px" contain position="center left" src="/img/iso_ctci.png" />
        </no-ssr>
      </nuxt-link>
    </div>
    <div class="d-none d-md-block mx-auto">
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey" medium to="/estrategia">Estrategia</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey" medium to="/hoja_de_ruta">Hoja de ruta</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey" medium to="/noticias">Noticias</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey" medium to="/eventos">Eventos</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey" medium to="/equipo">Equipo gestor</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey" medium to="/datos">Datos</v-btn>
    </div>
    
      <div>
        <div class="ml-auto ml-md-0 align-center flex-wrap d-none d-md-flex">
          <v-btn class="" icon href="https://www.linkedin.com/company/estrategia-de-ctci-biobio/" target="_blank">
            <font-awesome-icon style="height:20px;" :icon="['fab','linkedin']" />
          </v-btn>
          <v-btn class="" icon href="https://www.youtube.com/channel/UCT98_1_L2v10ry5Ezfl0wGA" target="_blank">
            <font-awesome-icon style="height:20px;" :icon="['fab','youtube']" />
          </v-btn>
          <v-btn class="" icon href="https://www.instagram.com/ctcibiobio/" target="_blank">
            <font-awesome-icon style="height:20px;" :icon="['fab','instagram']" />
          </v-btn>
          <v-btn class="" icon href="https://www.facebook.com/ctcibiobio" target="_blank">
            <font-awesome-icon style="height:20px;" :icon="['fab','facebook']" />
          </v-btn>
        </div>

        <!-- Men?? desplegable -->
        <v-menu
        bottom
        min-width="200px"
        rounded="lg"
        content-class="elevation-4"        
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="d-md-none">
            <font-awesome-icon style="height:20px;" :icon="['fas', 'bars']"></font-awesome-icon>
          </v-btn>
        </template>
        <!-- Contenido men?? -->
        <v-card rounded="lg" width="200" outlined color="grey lighten-4" class="elevation-0">
          <v-list dense class="pa-0">
            <v-list-item-group>
              <v-list-item to="/estrategia" class="px-3 text-body-2 grey--text text--darken-3">
                Estrategia
              </v-list-item>
              <v-list-item to="/hoja_de_ruta" class="px-3 text-body-2 grey--text text--darken-3">
                Hoja de Ruta
              </v-list-item>
              <v-list-item to="/noticias" class="px-3 text-body-2 grey--text text--darken-3">
                Noticias
              </v-list-item>
              <v-list-item to="/eventos" class="px-3 text-body-2 grey--text text--darken-3">
                Equipo
              </v-list-item>
              <v-list-item to="/equipo" class="px-3 text-body-2 grey--text text--darken-3">
                Evento
              </v-list-item>
              <v-list-item to="/datos" class="px-3 text-body-2 grey--text text--darken-3">
                Datos
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <div class="px-a">
             <v-btn class="" icon href="https://twitter.com/innbiobio2022" target="_blank">
              <font-awesome-icon style="height:20px;" :icon="['fab','twitter']" />
            </v-btn>
            <v-btn class="" icon href="https://www.youtube.com/channel/UCT98_1_L2v10ry5Ezfl0wGA" target="_blank">
              <font-awesome-icon style="height:20px;" :icon="['fab','youtube']" />
            </v-btn>
            <v-btn class="" icon href="https://www.instagram.com/innbiobio2022/" target="_blank">
              <font-awesome-icon style="height:20px;" :icon="['fab','instagram']" />
            </v-btn>
            <v-btn class="" icon href="https://www.facebook.com/innbiobio2022" target="_blank">
              <font-awesome-icon style="height:20px;" :icon="['fab','facebook']" />
            </v-btn>
          </div>
          
        </v-card>
        <!-- Contenido men?? -->
      </v-menu>
        <!-- Men?? desplegable -->


      </div>
  </v-container>
  
</v-app-bar>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  
</style>