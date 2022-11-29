<template lang="">
  <div class="p-3">
    <!-- v-if: se encuentran capítulos |INICIO| -->
    <div v-if="capitulos">
      <!-- v-if: el capítulo tiene datos |INICIO| -->
      <!-- Layout de capítulos |INICIO| -->
      <div id="capitulos-layout">
        <!-- Selector de capitulo |INICIO| -->
        <div id="capitulos-index-wrapper">
          <!-- Tarjeta de Capítulo |INICIO| -->
          <div
            :class="`${$store.getters['capitulos/activeCapitulo'].sort === capitulo.sort ? 'capitulo-card-active' : 'capitulo-card'}`"
            v-for="(capitulo, indexCapitulo) in capitulos"
            :key="indexCapitulo"
            @click="$store.commit('capitulos/updateCapituloActivo', capitulo.sort)"
          >
            <div>
              <div class="text-xs font-black">Capítulo {{ capitulo.sort  }}</div>
              <div class="text-base font-bold">
                {{ capitulo.title }}
              </div>
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
              <div v-if="['xs', 'md'].includes($vuetify.breakpoint.name)" class="mt-4"> 
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
              @click="$store.commit('capitulos/updateContenidoActivo',contenidoCapitulo.id)"
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
          <div class="contenido-content" v-if="$store.getters['capitulos/activeContenido']">
              <div id="contenido-head">
                <div id="c-title">
                  <div class="text-lg lg:text-3xl font-bold flex flex-col lg:flex-row justify-between lg:align-center">
                    <div>
                      <span>{{ $store.getters["capitulos/activeContenido"].title }}</span>
                      <div v-if="$store.getters['capitulos/activeContenido'].featured" class="flex align-center space-x-2 mb-2">
                        <font-awesome-icon 
                          icon="fa-solid fa-circle-star"
                          class="w-4 h-4"
                          fixed-width
                        />

                        <span class="font-bold text-sm">Contenido destacado</span>
                      </div>
                    </div> 

                    <!-- DOWNLOAD PDF BUTTON -->
                    <div v-if="['Presentación PDF'].includes($store.getters['capitulos/activeContenido'].format) && $store.getters['capitulos/activeContenido'].file">
                     <a :href="$config.apiUrlV2 + '/assets/' + $store.getters['capitulos/activeContenido'].file.id + '?download'" target="_blank" :download="$store.getters['capitulos/activeContenido'].file.filename_download">
                      <v-btn outlined color="red darken-1" :small="['xs', 'md'].includes($vuetify.breakpoint.name)">
                        <span>Descargar</span>
                        <font-awesome-icon icon="fa-solid fa-file-arrow-down" class="w-4 h-4 ml-2" :style="{ color: 'red' }" />
                      </v-btn>
                      </a>
                    </div>
                    <!-- DOWNLOAD PDF BUTTON -->
                  </div>
                </div>
              </div>

              <div id="contenido-body">
                <div class="c-content min-h-24">
                  <!-- FOTOS REFERENCALES -->
                  <UtilitariosLightBox 
                  v-if="['Foto referencial'].includes($store.getters['capitulos/activeContenido'].format) && $store.getters['capitulos/activeContenido'].file"
                  :images="[$config.apiUrlV2 + '/assets/' + $store.getters['capitulos/activeContenido'].file.id + '?fit=contain&width=' + width + '&height=' + height]">
                  </UtilitariosLightBox>
                  <!-- FOTOS REFERENCALES -->

                  <!-- INFOGRAFIAS -->
                 <UtilitariosLightBox
                  v-if="['Infografía'].includes($store.getters['capitulos/activeContenido'].format)"
                  :images="[$config.apiUrlV2 + '/assets/' + $store.getters['capitulos/activeContenido'].file.id]"
                  is_infografia
                  :width="width"
                  :height="height">
                  </UtilitariosLightBox>
                  <!-- INFOGRAFIAS -->

                  <!-- VIDEOS ONLINE -->
                  <div
                    v-if="['Video Online'].includes($store.getters['capitulos/activeContenido'].format)"
                  >
                    <iframe
                      v-if="$store.getters['capitulos/activeContenido'].url"
                      :src="get_video_params.outputUrl"
                      :width="width"
                      :height="height"
                    ></iframe>
                  </div>
                  <!-- VIDEOS ONLINE -->

                  <!-- PRESENTACION PDF -->
                  <div v-if="['Presentación PDF'].includes($store.getters['capitulos/activeContenido'].format)">
                    <iframe
                      :src="$config.apiUrlV2 + '/assets/' + $store.getters['capitulos/activeContenido'].file.id"
                      :width="width"
                      :height="height"
                    ></iframe>
                  </div>
                  <!-- PRESENTACION PDF -->

                  <!-- CODIGO EMBED -->
                  <div v-if="['Código embedido'].includes($store.getters['capitulos/activeContenido'].format)"> 
                    <div v-html="$store.getters['capitulos/activeContenido'].embed_code"></div>
                  </div>
                  <!-- CODIGO EMBED -->
                </div>

                <div class="c-description" v-if="markedBody">
                  <div
                    id="marked-wrapper"
                    v-html="markedBody"
                    class="marked"
                  ></div>
                </div>
            </div>
          </div>
          <!-- Capítulo > Contenido activo |FIN| -->
        </div>
        <!-- Layout contenido y selector |FIN| -->
      </div>

      <!-- v-if: el capítulo tiene datos |FIN| -->
    </div>
    <!-- v-if: se encuentran capítulos |FIN| -->

    <!-- v-if: no se encuentran capítulos |INICIO| -->
    <!-- <div v-else>No hay capítulos</div> -->
    <!-- v-if: no se encuentran capítulos |FIN| -->
  </div>
</template>
<script>
import { marked } from "marked";

export default {
  computed: {
    capitulos() {
      return this.$store.state.capitulos.capitulos;
    },
    contenido_is_featured() {
      return this.$store.getters["capitulos/activeContenido"].featured
        ? "contenido-card-active"
        : "contenido-card";
    },
    get_video_params() {
      let res = {
        provider: null,
        params: {
          v: null,
          h: null,
          list: null,
        },
        inputUrl: null,
        outputUrl: null,
      };

      res.inputUrl = this.$store.getters["capitulos/activeContenido"].url;

      // get provider of the url (youtube or youtu.be) and set the provider
      if (res.inputUrl.includes("youtube.com")) {
        res.provider = "youtube";
      } else if (res.inputUrl.includes("youtu.be")) {
        res.provider = "youtu.be";
      }

      switch (res.provider) {
        case "youtube":
          res.params.v = res.inputUrl.split("v=")[1].split("&")[0];
          res.outputUrl = `https://www.youtube.com/embed/${res.params.v}`;
          break;
        case "youtu.be":
          res.params.v = res.inputUrl.split("youtu.be/")[1].split("&")[0];
          res.outputUrl = `https://www.youtube.com/embed/${res.params.v}`;
          break;
      }

      /**
       * Casos youtube
       * Ej1 - Default: https://www.youtube.com/watch?v=Iu3Vez0StvM
       * Ej2 - Lista: https://www.youtube.com/watch?v=kSVMHdtylns&list=PLPBuBFdoK1doZSP8LkjXwOtcTMqLHQKj4
       * Ej3 - Short: https://youtu.be/kSVMHdtylns
       * Embed: https://www.youtube.com/embed/Iu3Vez0StvM
       *
       */

      /**
       * Casos Vimeo
       * Ej1 - Default: https://vimeo.com/393528399/326ab2ad8a
       * Ej2 - embed: https://player.vimeo.com/video/393528399?h=326ab2ad8a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479
       *
       */

      return res;
    },
    markedBody() {
      if (
        this.$store.getters["capitulos/activeContenido"] &&
        this.$store.getters["capitulos/activeContenido"].body
      ) {
        return marked(this.$store.getters["capitulos/activeContenido"].body);
      } else {
        return null;
      }
    },
    width() {
      const has_body = this.$store.getters["capitulos/activeContenido"].body;

      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 320;
        case 'sm':
          return 400;
        case 'md':
          return 680;
        case 'lg':
          return has_body ? 400 : 680;
        case 'xl':
          return has_body ? 680 : 1280;
      }
    },
    height() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 180;
        case 'sm':
          return 240;
        case 'md':
          return 500;
        case 'lg':
          return 340;
        case 'xl':
          return ['Infografía', 'Video Online', 'Presentación PDF'].includes(this.$store.getters['capitulos/activeContenido'].format) ? 480 : 340;
      }
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

#contenido-body {
  @apply flex lg:space-x-8 space-x-0 flex-col lg:flex-row mb-4 lg:mb-0;
  /* grid-template-columns: repeat(1, minmax(0, 1fr) minmax(0, 1fr)); */
}

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
</style>
