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
            :class="`${
              $store.getters['capitulos/activeCapitulo'].sort === capitulo.sort
                ? 'capitulo-card-active'
                : 'capitulo-card'
            }`"
            v-for="(capitulo, indexCapitulo) in capitulos"
            :key="indexCapitulo"
            @click="
              $store.commit('capitulos/updateCapituloActivo', capitulo.sort)
            "
          >
            <div>
              <div class="text-xs font-black">Capítulo {{ capitulo.sort }}</div>
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
          <div id="layout-slides-navigation">
            <!-- Slide card |INICIO| -->
            <div
              v-for="(contenidoCapitulo, index) in $store.getters[
                'capitulos/activeCapitulo'
              ].contents"
              :key="index"
              class="cursor-pointer"
              @click="
                $store.commit(
                  'capitulos/updateContenidoActivo',
                  contenidoCapitulo.id
                )
              "
            >
              <!-- <v-img
                v-if="contenidoCapitulo.file.data"
                contain
                :aspect-ratio="16 / 9"
                class="bg-white rounded-lg p-5 shadow-md shadow-slate-300"
                :src="
                  $config.apiUrl + contenidoCapitulo.file.data.attributes.url
                "
              ></v-img> -->

              <!-- <v-img
                v-if="contenidoCapitulo.Formato == 'Video'"
                contain
                :aspect-ratio="16 / 9"
                class="bg-white rounded-lg p-5 shadow-md shadow-slate-300"
                :src="
                  'https://img.youtube.com/vi/' +
                  contenidoCapitulo.embedUrl +
                  '/0.jpg'
                "
              ></v-img> -->

              <!-- <div class="font-bold text-xs">{{index}}</div> -->
              <div
                :class="`${
                  $store.getters['capitulos/activeContenido'].id ===
                  contenidoCapitulo.id
                    ? 'contenido-card-active'
                    : 'contenido-card'
                }`"
              >
                <span class="block text-2xl font-black"
                  >{{ contenidoCapitulo.sort < 10 ? "0" : ""
                  }}{{ contenidoCapitulo.sort + 1 }}</span
                >
                <div class="font-black">{{ contenidoCapitulo.title }}</div>
                <div class="text-xs font-thin">{{
                  contenidoCapitulo.excerpt
                }}</div>
              </div>
              <!-- <div>{{contenidoCapitulo.Formato}}</div> -->
              <!-- <div>{{contenidoCapitulo.embedUrl}}</div> -->
            </div>
            <!-- Slide card |INICIO| -->
          </div>
          <!-- Selector de contenidos |FIN| -->

          <!-- Capítulo > Contenido activo |INICIO| -->
          <v-responsive
            :aspect-ratio="16 / 5"
            content-class="contenido-content"
          >
            <!-- <div>{{$store.state.capitulos.contenidoActivoId}}</div> -->

            <div v-if="$store.getters['capitulos/activeContenido']">
              <div id="contenido-head">
                <div id="c-title">
                  <div class="text-3xl font-bold">
                    {{ $store.getters["capitulos/activeContenido"].title }}
                  </div>
                </div>
                <!-- <div id="c-index">
                      <div>{{$store.getters['capitulos/activeContenido'].id}}</div>
                    </div> -->
                <!-- <div id="c-type">
                      <div>{{$store.getters['capitulos/activeContenido'].Formato}}</div>
                    </div> -->
              </div>
              <div id="contenido-body">
                <div class="c-content w-full min-h-24">
                  <div
                    v-if="
                      ['Foto referencial', 'Infografía'].includes(
                        $store.getters['capitulos/activeContenido'].format
                      )
                    "
                  >
                    <div
                      v-if="$store.getters['capitulos/activeContenido'].file"
                    >
                      <v-img
                        :src="
                          $config.apiUrlV2 +
                          '/assets/' +
                          $store.getters['capitulos/activeContenido'].file.id
                        "
                      >
                      </v-img>

                      <span class="block mt-4 text-xs font-thin text-slate-500">{{
                        $store.getters["capitulos/activeContenido"].file
                          .description
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="c-description" v-if="markedBody">
                  <div
                    id="marked-wrapper"
                    v-html="markedBody"
                    class="marked"
                  ></div>
                </div>

                <!--<div
                    v-if="
                      ['Video'].includes(
                        $store.getters['capitulos/activeContenido'].Formato
                      ) && $store.getters['capitulos/activeContenido'].embedUrl
                    "
                  >
                    <iframe
                      width="100%"
                      class="aspect-video"
                      :src="`https://www.youtube.com/embed/${$store.getters['capitulos/activeContenido'].embedUrl}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    >
                    </iframe> -->
              </div>
            </div>
          </v-responsive>
          <!-- Capítulo > Contenido activo |FIN| -->
        </div>
        <!-- Layout contenido y selector |FIN| -->
      </div>

      <!-- v-if: el capítulo tiene datos |FIN| -->
    </div>
    <!-- v-if: se encuentran capítulos |FIN| -->

    <!-- v-if: no se encuentran capítulos |INICIO| -->
    <div v-else>No hay capítulos</div>
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
      /**
       * Casos youtube
       * Ej1 - Default: https://www.youtube.com/watch?v=Iu3Vez0StvM
       * Ej2 - Lista: https://www.youtube.com/watch?v=kSVMHdtylns&list=PLPBuBFdoK1doZSP8LkjXwOtcTMqLHQKj4
       * Ej3 - Short: https://youtu.be/kSVMHdtylns
       * Embed: https://www.youtube.com/embed/Iu3Vez0StvM
       *
       */
      res.provider = "youtube";

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
  @apply p-4 m-2 bg-slate-100 text-slate-800 rounded-xl cursor-pointer;
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

/* Estilos de slides para selección de contenido */
#layout-slides-navigation {
  @apply grid justify-items-start px-2 content-start shadow-inner gap-3 rounded-sm;
  grid-template-columns: repeat(2, minmax(1, 1fr));
}
.slide-preview {
  @apply bg-slate-200 rounded-2xl;
}

.contenido-card {
  @apply p-4 bg-slate-100 text-slate-800 rounded-xl cursor-pointer;
  min-width: 400px;
  width: 400px;
  max-width: 400px;
}

.contenido-card-active {
  @apply p-4 bg-neutral-700 text-white rounded-xl cursor-pointer;
  min-width: 400px;
  width: 400px;
  max-width: 400px;
}

/* Estilos de contenido */
.contenido-content {
  @apply p-5 grid;
}

#contenido-body {
  @apply grid gap-5;
  grid-template-columns: repeat(1, minmax(0, 1fr) minmax(0, 1fr));
}

#c-title {
  @apply mb-5 text-slate-700 px-4;
}


.marked {
  @apply font-sans;
}

#marked-wrapper {
  @apply scroll-py-10 pl-8 snap-y mr-4;
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
</style>
