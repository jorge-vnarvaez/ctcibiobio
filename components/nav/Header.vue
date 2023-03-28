<template>
<v-app-bar elevation="0" height="90px" color="white">
  <v-container fluid class="d-flex justify-space-between align-center">

    <div class="d-flex">
      <nuxt-link to="/">
        <no-ssr>
          <v-img max-height="45px" height="45px" max-width="210px" contain position="center left" src="/img/iso_ctci.png" />
        </no-ssr>
      </nuxt-link>
    </div>
    <div class="d-none d-md-block mx-auto">
      <v-btn text class="mx-1 text-capitalize font-weight-bold cursor-pointer" color="blue-grey darken-1" medium to="/">Inicio</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold cursor-pointer" color="blue-grey darken-1" medium to="/acerca_del_proyecto">Acerca</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey darken-1" medium to="/documento">Documento</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey darken-1" medium to="/comunidad">Comunidad</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey darken-1" medium to="/noticias">Noticias</v-btn>
      <v-btn text class="mx-1 text-capitalize font-weight-bold" color="blue-grey darken-1" medium to="/equipo">Equipo</v-btn>
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

        <!-- Menú desplegable -->
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
        <!-- Contenido menú -->
        <v-card rounded="lg" width="200" outlined color="grey lighten-4" class="elevation-0">
          <v-list dense class="pa-0">
            <v-list-item-group>
              <v-list-item to="/acerca_del_proyecto" class="px-3 text-body-2 grey--text text--darken-3">
                Acerca
              </v-list-item>
              <v-list-item to="/documento" class="px-3 text-body-2 grey--text text--darken-3">
                Documento
              </v-list-item>
              <v-list-item to="/comunidad" class="px-3 text-body-2 grey--text text--darken-3">
                Comunidad
              </v-list-item>
              <v-list-item to="/noticias" class="px-3 text-body-2 grey--text text--darken-3">
                Noticias
              </v-list-item>
              <v-list-item to="/equipo" class="px-3 text-body-2 grey--text text--darken-3">
                Equipo
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
        <!-- Contenido menú -->
      </v-menu>
        <!-- Menú desplegable -->


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