<template lang="">
  <div>
    <v-container>
      <v-responsive :aspect-ratio="16/9" content-class="d-flex align-center justify-center">
        <div class="mb-5 d-flex align-center text-center">
          <div class="d-flex flex-column align-center">

            <iframe class="w-full h-96 mb-10" width="560" height="315" src="https://www.youtube.com/embed/YJecjsYgLZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="text-h3 text-md-h2 font-weight-black">Estrategia de CTCI Biobío</div>
            <div class="text-2xl font-weight-light my-10">Una iniciativa colaborativa para sentar las bases del desarrollo en innovación del 2022-2032</div>
            <div class="flex justify-center align-center gap-10 mb-4">
              <div><no-ssr><img height="100px" src="/img/gorebiobio.png"></no-ssr></div>
              <div><no-ssr><img height="60px" style="max-height:60px;" src="/img/udec_color.png"></no-ssr></div>
            </div>
            <!-- <RedesSociales/> -->
          </div>
        </div>
      </v-responsive>


    </v-container>
    <div class="py-12 text-white bg-gradient-to-r from-stone-900 to-blue-900" id="proyecto">

      <v-container class="flex-md-row d-md-flex gap-x-6 align-center">
        <v-img min-width="400px" width="400px" contain  src="/illustration/2.png"/>
        <div>
          <div class="text-h5 mb-4 font-weight-black">Acerca del proyecto</div>
          <div class="text-2xl">El desarrollo de la estrategia de CTCI para la región del Biobío tiene el fin de potenciar la competitividad de la región, logrando así: una mayor focalización del gasto público en ciencia, tecnología, conocimiento e innovación; facilitar la asociatividad y cooperación entre las entidades del ecosistema CTCI y así, fomentar el dinamismo, cantidad de proyectos, participación del sector privado, disminución del riesgo de iniciativas y aumento de su impacto. </div>
        </div>
      </v-container>

    </div>
  </div>
</template>
<script>
import RedesSociales from './RedeSociales.vue'
export default {
  components: {RedesSociales}
}
</script>
<style lang="">
  
</style>