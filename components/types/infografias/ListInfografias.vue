<template>
  <div class="max-w-screen-xl mx-auto my-12">
    <v-container>
      <div>
        <div class="text-h4 font-weight-bold text-slate-800 mb-5">
          Infografías
        </div>

        <CoolLightBox
          :items="images"
          :index="index"
          :fullScreen="true"
          useZoomBar
          closeOnClickOutsideMobile
          @close="index = null"
        >
        </CoolLightBox>

        <v-sheet elevation="0">
          <v-slide-group v-model="model" class="pa-4" :show-arrows="false">
            <v-slide-item
              v-for="(image, imageIndex) in images"
              :key="imageIndex"
            >
              <v-card height="400" width="600" class="px-4">
                <v-img
                :src="image"
                @click="index = imageIndex"
                class="col-span-3 cursor-pointer w-full h-full"
              >
              </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  components: {
    CoolLightBox,
  },
  data() {
    return {
      index: null,
      model: null,
      images: [
        "/equipo/AlejandraRojas.jpg",
        "/equipo/CamilaGarcia.jpg",
        "/equipo/GonzaloCastillo.jpg",
        "/equipo/RayenFica.jpeg",
        "/equipo/PaolaVerdugo.jpeg",
        "/equipo/VicenteHernandez.jpeg",
        "/equipo/VicenteHernandez.jpeg",
      ],
    };
  },
};
</script>

<style>
</style>