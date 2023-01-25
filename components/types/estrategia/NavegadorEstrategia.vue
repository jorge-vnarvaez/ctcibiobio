<template>
  <div class="bg-gray-100" id="wrapper">
    <div class="grid grid-cols-12">
      <!-- NAVIGATION -->
      <div class="bg-white col-span-12 lg:col-span-2 px-4 py-8" id="nav-wrapper">
        <!-- TABS -->
        <span
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          :class="
            activeTab == tab.name
              ? 'block mb-2 border-separate border-spacing-2 border-l-4 border-pink-600 font-bold px-4'
              : '' + ' block px-5 cursor-pointer mb-2'
          "
          >{{ tab.label }}</span
        >
        <!-- TABS -->

        <!-- ACTIVE CAPITULO -->
        <div class="mt-12" v-if="activeTab == 'contenidos'">
         <div v-if="activeCapitulo">
          <span class="block text-lg font-bold">Capitulo {{ activeCapitulo.sort }}</span>
          <v-divider class="my-2 w-9/12"></v-divider>
          <span class="text-xs font-light">{{ activeCapitulo.title }}</span>
          <!-- CONTENIDOS -->
          <div class="mt-12">
            <span class="font-bold text-xs">Contenidos</span>

            <div v-if="activeCapitulo.contents.length > 0" class="mt-4 flex flex-col space-y-8">
              <div
                v-for="(content, index) in activeCapitulo.contents"
                :key="content.id"
                class="flex items-center cursor-pointer"
                @click="$store.commit('capitulos/updateContenidoActivo', content.id)"
              >
                <div :class="`${activeContenido.id == content.id ? 'outline-blue-500' : 'outline-slate-200'}` + ' relative w-11/12 h-[200px] outline outline-2 rounded-md'">
                    
                    <!-- FOTO REFERENCIAL -->
                    <v-img v-if="content.file" :src="$config.apiUrlV2 + '/assets/' + content.file.id +`?width=${width}&height=${height}&quality=80`"></v-img>
                    <!-- FOTO REFERENCIAL -->

                    <!-- WITHOUT FOTO REFERENCIAL -->
                    <div v-if="['Foto referencial'].includes(content.format) && !content.file">
                      <font-awesome-icon icon="fa-solid fa-image" class="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <!-- WITHOUT FOTO REFERENCIAL -->

                    <!-- VIDEO ONLINE -->
                    <div v-if="['Video Online'].includes(content.format)">
                      <font-awesome-icon icon="fa-solid fa-play" class="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <!-- VIDEO ONLINE -->

                    <!-- PDF -->
                    <div v-if="['Presentación PDF'].includes(content.format)">
                      <font-awesome-icon icon="fa-solid fa-file-pdf" class="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <!-- PDF -->

                    <!-- CODIGO EMBED -->
                    <div v-if="content.format == null">
                      <font-awesome-icon icon="fa-solid fa-align-left" class="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <!-- CODIGO EMBED -->


                    <div :class="`${activeContenido.id == content.id ? 'bg-blue-600 text-white ' : 'bg-slate-200 '}` +  inset_x + ' absolute w-8 h-6 rounded-lg -top-4 flex align-center justify-center'">
                      <span class="text-xs font-bold">
                        {{ index + 1}}
                      </span>
                    </div>
                </div>

              </div>
            </div>
          </div>
         </div>
        <!-- CONTENIDOS -->
        </div>
        <!-- ACTIVE CAPITULO -->
      </div>
      <!-- NAVIGATION -->

      <!-- CHAPTERS -->
      <div class="col-span-10 p-8" v-if="activeTab == 'capitulos'">
       <div class="grid grid-cols-12 gap-8">
         <div v-for="(capitulo, index) in capitulos" :key="capitulo.id" class=" bg-slate-200 p-4 col-span-6 rounded-md shadowm-md">
          <div class="flex flex-col">
            <span>Capitulo {{ index + 1 }}</span><span class="block font-bold">{{ capitulo.title }}</span>
          </div>

          <div class="text-sm h-12">
            <span class="block w-10/12">{{ capitulo.excerpt }}</span>
          </div>

          <div class="mt-8 flex align-center space-x-2 cursor-pointer" @click="$store.commit('capitulos/updateCapituloActivo', capitulo.sort); activeTab = 'contenidos'">
            <span class="text-sm">Ver contenidos</span>
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="w-4 h-4" />
          </div>
        </div>
       </div>
      </div>
      <!-- CHAPTERS -->

      <!-- CONTENT -->
      <div class="col-span-10 p-8" v-if="activeTab == 'contenidos'" id="content-wrapper">
        <span class="block mb-8 text-2xl font-bold">{{ activeContenido.title }}</span>
        <!-- FOTOS REFERENCALES -->
           <UtilitariosLightBox 
           v-if="['Foto referencial'].includes(activeContenido.format) && activeContenido.file"
           :images="[$config.apiUrlV2 + '/assets/' + activeContenido.file.id]"
           :description="activeContenido.file.description">
           </UtilitariosLightBox>
        <!-- FOTOS REFERENCALES -->

        <!-- VIDEOS ONLINE -->
        <div v-if="['Video Online'].includes(activeContenido.format)">
          <iframe
             v-if="activeContenido.url"
            :src="get_video_params.outputUrl"
            width="100%"
            height="600"
          ></iframe>
        </div>
        <!-- VIDEOS ONLINE -->

        <!-- PRESENTACION PDF -->
        <div v-if="['Presentación PDF'].includes(activeContenido.format)">
          <iframe
            :src="$config.apiUrlV2 + '/assets/' + activeContenido.file.id"
            width="100%"
            height="800"
          ></iframe>
        </div>
        <!-- PRESENTACION PDF -->

        <!-- DESCRIPTION -->
        <span v-html="activeContenido.body"></span>
        <!-- DESCRIPTION -->
      </div>
      <!-- CONTENT -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "capitulos",
      tabs: [
        { name: "contenidos", label: "Contenidos" },
        { name: "capitulos", label: "Capítulos" },
      ],
    };
  },
  async fetch() {
    await this.$store.dispatch("capitulos/loadCapitulos");
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

      res.inputUrl = this.activeContenido.url;

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
    inset_x() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'inset-x-20';
        case 'sm':
          return 'inset-x-20';
        case 'md':
          return 'inset-x-20';
        case 'lg':
          return 'inset-x-14';
        case 'xl':
          return 'inset-x-20';
        default:
          return 'inset-x-20';
      }
    },
    width() {
      return this.$vuetify.breakpoint.mobile ? '180' : '230';
    },
    height() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return '240';
        case 'sm':
          return '220';
        case 'md':
          return '180';
        case 'lg':
          return '260';
        case 'xl':
          return '180';
        default:
          return '200';
      }
    },
    activeCapitulo() {
      return this.$store.getters["capitulos/activeCapitulo"];
    },
    activeContenido() {
      return this.$store.getters["capitulos/activeContenido"];
    },
    capitulos() {
      return this.$store.getters["capitulos/capitulos"];
    }
  }
}
</script>

<style>
#wrapper {
  height: 100vh;
  overflow-y: scroll;
}

#wrapper::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

#wrapper::-webkit-scrollbar-thumb {
  background: #888;
}

#nav-wrapper {
  height: 100vh;
  overflow-y: scroll;
}

#nav-wrapper::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

#nav-wrapper::-webkit-scrollbar-thumb {
  background: #888;
}

#content-wrapper {
  height: 100vh;
  overflow-y: scroll;
}

#content-wrapper::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

#content-wrapper::-webkit-scrollbar-thumb {
  background: #888;
}
</style>
