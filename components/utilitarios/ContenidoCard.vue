<template>
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

              <div :class="`${$store.getters['capitulos/activeContenido'].file ? 'lg:space-x-8' : 'lg:space-x-0'}` + ' flex flex-col lg:flex-row'">
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
</template>

<script>

import { marked } from "marked";

export default {
    computed: {
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
    },
    }
}
</script>

<style>

</style>