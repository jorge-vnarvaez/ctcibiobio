<template lang="">
  <div class="p-3" id="page-wrapper">
    <!-- v-if: se encuentran capítulos |INICIO| -->
    <div v-if="capitulos" ref="top">
      <!-- v-if: el capítulo tiene datos |INICIO| -->
      <!-- Layout de capítulos |INICIO| -->
      <div id="capitulos-layout">
        <!-- Selector de capitulo |INICIO| -->
        <div id="capitulos-index-wrapper">
          <!-- Tarjeta de Capítulo |INICIO| -->
          <div
            :class="`${$store.getters['capitulos/activeCapitulo'].sort === capitulo.sort ? 'capitulo-card-active' : 'capitulo-card'}` + ' cursor-pointer'"
            v-for="(capitulo, indexCapitulo) in capitulos"
            :key="indexCapitulo"
            @click="capituloSeleccionado(capitulo.sort)"
          >
            <div>
              <div class="text-xs font-black">Capítulo {{ capitulo.sort  }}</div>
              <div class="text-base font-bold">{{ capitulo.title }}</div>
            </div>
            <div class="text-xs">{{ capitulo.excerpt }}</div>
          </div>
          <!-- Tarjeta de Capítulo |FIN| -->
        </div>
        <!-- Selector de capitulo |FIN| -->

        <!-- Layout contenido y selector |INICIO| -->
        <div id="layout-estrategia-content">
          <!-- Selector de contenidos |INICIO| -->
          <div id="layout-slides-navigation" class="slides-wrapper">
            <!-- MENU DESPLEGABLE FOR SMALL AND MEDIUM DEVICES -->
              <div class="mt-4"> 
                  <span class="font-bold">Contenidos</span>
              </div>
            <!-- MENU DESPLEGABLE FOR SMALL AND MEDIUM DEVICES -->


            <!-- Slide card |INICIO| -->
            <div
              v-for="(contenidoCapitulo, index) in $store.getters[
                'capitulos/activeCapitulo'
              ].contents"
              :key="index"
              :class="`${
                $store.getters['capitulos/activeContenido'].id ===
                contenidoCapitulo.id
                  ? 'contenido-card-active'
                  : contenidoCapitulo.featured === true
                  ? 'contenido-card-featured'
                  : 'contenido-card'
              }`"
              @click="contenidoSeleccionado(contenidoCapitulo.id, index)"
            >
              <div>
                <div class="flex lg:justify-between lg:align-center lg:space-x-4">
                  <div class="flex flex-col justify-end">
                    <div class="flex align-center space-x-2">
                      <span class="block text-2xl font-black"
                        >{{ contenidoCapitulo.sort < 9 ? "0" : ""
                        }}{{ contenidoCapitulo.sort + 1  }}</span
                      >
                      <font-awesome-icon
                        v-if="contenidoCapitulo.featured"
                        icon="fa-solid fa-circle-star"
                        class="w-4 h-4"
                        fixed-width
                      />

                      <!-- ICONO [VIDEO, CODIGO EMBEDIDO, PDF] -->
                      <font-awesome-icon 
                      v-if="['Presentación PDF'].includes(contenidoCapitulo.format)" 
                      icon="fa-solid fa-file-pdf"  
                      class="w-4 h-4"
                      fixed-width />

                      <font-awesome-icon
                        v-if="['Video Online'].includes(contenidoCapitulo.format)"
                        icon="fa-solid fa-video"
                        class="w-4 h-4"
                        fixed-width />

                      <font-awesome-icon
                        v-if="['Código embedido'].includes(contenidoCapitulo.format)"
                        icon="fa-solid fa-presentation-screen"
                        class="w-4 h-4"
                        fixed-width />
                      <!-- ICONO [VIDEO, CODIGO EMBEDIDO, PDF] -->

                    </div>
                    <div class="flex flex-col">
                      <div class="font-black text-xs lg:text-sm">{{ contenidoCapitulo.title }}</div>
                      <div class="text-xs font-thin">
                        {{ contenidoCapitulo.excerpt }}
                      </div>
                    </div>
                  </div>

                  <div>
                    <!-- THUMBNAIL [FOTO REFERENCIAL, INFOGRAFIAS] -->
                    <v-img
                      v-if="contenidoCapitulo.file && !$vuetify.breakpoint.mobile"
                      class="rounded-lg"
                      :src="$config.apiUrlV2 +'/assets/' +contenidoCapitulo.file.id + '?fit=cover&width=120&height=80&quality=25&withoutEnlargement'"
                      contain
                    ></v-img>
                    <!-- THUMBNAIL [FOTO REFERENCIAL, INFOGRAFIAS] -->
                  </div>
                </div>
              </div>
            </div>
            <!-- Slide card |INICIO| -->
          </div>
          <!-- Selector de contenidos |FIN| -->

          <!-- Capítulo > Contenido activo |INICIO| -->
          <UtilitariosContenidoCard />
          <!-- Capítulo > Contenido activo |FIN| -->
        </div>
        <!-- Layout contenido y selector |FIN| -->
      </div>

      <!-- v-if: el capítulo tiene datos |FIN| -->
    </div>
    <!-- v-if: se encuentran capítulos |FIN| -->



    <div class="mt-20" ref="moreContent">
      <div id="section-content" class="my-12 h-4/12" v-for="contenido in $store.getters['capitulos/activeCapitulo'].contents.slice(sliceIndex, contentsNumber)" :key="contenido.id">
        <UtilitariosContenidoCardDetail :contenido="contenido" />
      </div>
    </div>

    <div class="absolute bottom-24 w-full flex">
      <v-btn
        fab
        dark
        color="#0c92cc"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>

      <!-- <div v-if="text" class="w-full flex justify-center align-center">
        <v-btn
          v-if="$store.getters['capitulos/activeCapitulo'].contents.length > 1"
          color="primary"
          outlined
          @click="keepReading"
          >
            <span class="font-bold">Continuar leyendo</span>
          </v-btn>
        </div>
      </div> -->
    </div>

  </div>
</template>
<script>

export default {
  data() {
    return {
      text: true,
      windowTop: 0,
      sliceIndex: 1,
    }
  },
  mounted() {
     let that = this;
     window.addEventListener("wheel", function(){
           that.windowTop = window.pageYOffset;
      });
  },
  methods: {
    capituloSeleccionado(sort) {
      this.text = true;
      this.$store.commit('capitulos/updateCapituloActivo', sort)
    },
    contenidoSeleccionado(id, index) {
      this.$store.commit('capitulos/updateContenidoActivo', id)

      if(this.sliceIndex <= this.contentsNumber) {
        this.sliceIndex = index + 1;
      } else {
        this.sliceIndex = index;
      }

    },
    scrollToTop() {
      // scroll to top the div with id="top"
      this.text = true;
      this.$refs.top.scrollIntoView({ behavior: "smooth" });
    },
    keepReading() {
      // scroll to top the div with id="top"
      this.text = false;
      this.$refs.moreContent.scrollIntoView({ behavior: "smooth" });
    }
  },
  computed: {
    capitulos() {
      return this.$store.state.capitulos.capitulos;
    },
    contentsNumber() {
      return this.$store.getters['capitulos/activeCapitulo'].contents.length;
    }
  },
};
</script>
<style lang="postcss">
/* Layout general de sección de capítulos */
#capitulos-layout {
  grid-template-columns: minmax(0, 1fr);
}

/* Estilos de selector de capítulos */
#capitulos-index-wrapper {
  @apply scroll-pl-10 snap-x;
  display: flex;
  overflow-x: scroll;
}

#capitulos-index-wrapper::-webkit-scrollbar {
  height: 10px;
}

#capitulos-index-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

#capitulos-index-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
  max-width: 100px;
}

.capitulo-card {
  @apply p-4 m-2 bg-slate-200 text-slate-800 rounded-xl cursor-pointer;
  min-width: 400px; 
  width: 400px; 
  max-width: 400px;
}

.capitulo-card-active {
  @apply p-4 m-2 bg-neutral-700 text-white rounded-xl cursor-pointer;
  min-width: 400px;
  width: 400px;
  max-width: 400px;
}

/* Contenedor de slides y contenido  */
#layout-estrategia-content {
  @apply grid mt-4;
  grid-template-columns: 400px 1fr;
  height: 50vh;
}

@media screen and (max-width: 768px) {
  #layout-estrategia-content {
    @apply flex flex-col-reverse;
    height: 100%;
  }
}

/* Estilos de slides para selección de contenido */
#layout-slides-navigation {
  @apply grid justify-items-start content-start shadow-inner gap-3 rounded-sm;
  grid-template-columns: repeat(2, minmax(1, 1fr));
  height: 50vh;
}

.slide-preview {
  @apply bg-slate-200 rounded-2xl;
}

.slides-wrapper {
   @apply snap-y scroll-mt-4;
   width: 400px;
   overflow-y: scroll;
}

@media only screen and (max-width: 420px) {
  .slides-wrapper {
    @apply snap-y scroll-mt-8;
    width: 320px;
    overflow-y: scroll;
  }
}

.slides-wrapper::-webkit-scrollbar {
  width: 10px;
}

.slides-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.slides-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
  max-width: 100px;
}

/* Estilos de contenido */
.contenido-content {
  @apply lg:pl-8 pl-0 grid;
}

.contenido-card {
  @apply p-4 bg-slate-200 text-slate-800 rounded-xl cursor-pointer;
  min-width: 380px;
  width: 380px;
  max-width: 380px;
}

.contenido-card-active {
  @apply p-4 bg-slate-800 text-white rounded-xl cursor-pointer;
  min-width: 380px;
  width: 380px;
  max-width: 380px;
}

.contenido-card-featured {
  @apply p-4 bg-slate-400 text-white rounded-xl cursor-pointer;
  min-width: 380px;
  width: 380px;
  max-width: 380px;
}

/* Resize card width for extra small and small devices */
@media only screen and (max-width: 420px) {
  .contenido-card {
    @apply p-4 bg-slate-200 text-slate-800 rounded-xl cursor-pointer;
    min-width: 310px;
    width: 310px;
    max-width: 310px;
  }

  .contenido-card-active {
    @apply p-4 bg-slate-800 text-white rounded-xl cursor-pointer;
    min-width: 310px;
    width: 310px;
    max-width: 310px;
  }

  .contenido-card-featured {
    @apply p-4 bg-slate-400 text-white rounded-xl cursor-pointer;
    min-width: 310px;
    width: 310px;
    max-width: 310px;
  }
}

/* #contenido-body {
  @apply flex space-x-0 flex-col lg:flex-row mb-4 lg:mb-0;
  /* grid-template-columns: repeat(1, minmax(0, 1fr) minmax(0, 1fr)); 
} */

#c-title {
  @apply mb-5 text-slate-700;
}

.marked {
  @apply font-sans px-0;
}

#marked-wrapper {
  @apply scroll-py-10 snap-y;
  overflow-y: scroll;
  height: 50vh;
}

#marked-wrapper::-webkit-scrollbar {
  width: 10px;
}

#marked-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

#marked-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
  max-width: 100px;
}

.image-wrapper {
  @apply snap-x;
  overflow-x: scroll;
}

.image-wrapper::-webkit-scrollbar {
  height: 10px;
}

.image-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.image-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
  max-width: 100px;
}

/* Scroll behavior for general component */
#page-wrapper {
  @apply snap-y scroll-smooth;
  overflow-y: scroll;
  height: 50vh;
}

#page-wrapper::-webkit-scrollbar {
  width: 10px;
}

#page-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

#page-wrapper::-webkit-scrollbar-thumb {
  background: #ffb204;
  border-radius: 5px;
  max-width: 100px;
}

#section-content {
  @apply snap-start;
}

</style>
