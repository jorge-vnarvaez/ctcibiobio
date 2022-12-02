<template>
  <div>
    <div class="text-lg lg:text-3xl font-bold flex flex-col lg:flex-row justify-between lg:align-center">
      <span class="block mb-8">{{ contenido.title }}</span>
    </div>

    <div :class="`${contenido.file ? 'lg:space-x-8' : 'lg:space-x-0'}` + ' flex flex-col lg:flex-row'">
         <div class="c-content min-h-24">
           <!-- FOTOS REFERENCALES -->
           <UtilitariosLightBox 
           v-if="['Foto referencial'].includes(contenido.format) && contenido.file"
           :images="[$config.apiUrlV2 + '/assets/' + contenido.file.id + '?fit=contain&width=' + width + '&height=' + height]"
           :description="contenido.file.description">
           </UtilitariosLightBox>
           <!-- FOTOS REFERENCALES -->

           <!-- INFOGRAFIAS -->
          <UtilitariosLightBox
          v-if="['Infografía'].includes(contenido.format)"
          :images="[$config.apiUrlV2 + '/assets/' + contenido.file.id]"
          is_infografia
          :width="width"
          :height="height">
          </UtilitariosLightBox>
         <!-- INFOGRAFIAS -->

         <!-- VIDEOS ONLINE -->
        <div v-if="['Video Online'].includes(contenido.format)">
          <iframe
             v-if="contenido.url"
            :src="get_video_params.outputUrl"
            :width="width"
            :height="height"
          ></iframe>
        </div>
        <!-- VIDEOS ONLINE -->

        <!-- PRESENTACION PDF -->
        <div v-if="['Presentación PDF'].includes(contenido.format)">
          <iframe
            :src="$config.apiUrlV2 + '/assets/' + contenido.file.id"
            :width="width"
            :height="height"
          ></iframe>
        </div>
        <!-- PRESENTACION PDF -->

        <!-- CODIGO EMBED -->
         <div v-if="['Código embedido'].includes(contenido.format)"> 
           <div v-html="contenido.embed_code"></div>
         </div>
         <!-- CODIGO EMBED -->
       </div>

       <div class="w-full" v-if="markedBody">
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
    props: {
        contenido: {
            type: Object,
            required: true
        }
    },
    computed: {
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

      res.inputUrl = this.contenido.url;

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
        this.contenido &&
        this.contenido.body
      ) {
        return marked(this.contenido.body);
      } else {
        return null;
      }
    },
    width() {
      const has_body = this.contenido.body;

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
          return has_body ? 680 : 1720;
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
          return ['Infografía', 'Video Online', 'Presentación PDF'].includes(this.contenido.format) ? 480 : 340;
      }
    },
    }
}
</script>

<style>

</style>