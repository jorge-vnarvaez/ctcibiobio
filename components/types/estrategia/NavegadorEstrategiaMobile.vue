<template>
  <div>
    <div>
      <span class="block text-xl font-bold"
        >Capitulo {{ activeCapitulo.sort }}</span
      >
      <span class="block text-sm font-light">{{ activeCapitulo.title }}</span>
    </div>

    <v-divider class="my-4"></v-divider>
    
    <!-- TABS -->
    <div class="flex">
      <span
        v-for="tab in tabs"
        :key="tab.name"
        @click="activeTab = tab.name"
        :class="
          activeTab == tab.name
            ? 'mb-2 border-separate border-spacing-2 border-l-4 border-pink-600 font-bold px-4'
            : '' + ' block px-5 cursor-pointer mb-2'
        "
        >{{ tab.label }}</span
      >
    </div>
    <!-- TABS -->

    <!-- CHAPTERS -->
    <div v-if="activeTab == 'capitulos'" class="flex overflow-auto">
        <div
          v-for="(capitulo) in capitulos"
          :key="capitulo.id"
          class="p-4  rounded-md shadowm-md"
        >
          <div class="bg-slate-200 w-[200px] h-[150px] mb-2">

          </div>
          <div class="flex flex-col text-sm">
            <span class="block font-bold">{{ capitulo.title }}</span>
          </div>

          <div class="text-xs">
            <span class="block w-10/12">{{ capitulo.excerpt.slice(0, 50) }}...</span>
          </div>

          <div
            class="mt-8 flex align-center space-x-2 cursor-pointer"
            @click="
              $store.commit('capitulos/updateCapituloActivo', capitulo.sort);
              activeTab = 'contenidos';
            "
          >
            <span class="text-sm">Ver contenidos</span>
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="w-4 h-4" />
          </div>
        </div>
    </div>
    <!-- CHAPTERS -->

    <!-- CONTENTS -->
    <div v-if="activeTab == 'contenidos'">  
        <div v-if="activeCapitulo.contents.length > 0" class="mt-4 flex overflow-auto space-x-8">
            <div v-for="content in activeCapitulo.contents"
                :key="content.id"
                class="cursor-pointer relative"
                @click="$store.commit('capitulos/updateContenidoActivo', content.id)">

              

                    <!-- FOTO REFERENCIAL -->
                    <div v-if="['Foto referencial'].includes(content.format)">
                      <v-img v-if="content.file" :src="$config.apiUrlV2 + '/assets/' + content.file.id +`?width=200&height=150&quality=80`"></v-img>
                    </div>
                    <!-- FOTO REFERENCIAL -->

                    <!-- WITHOUT FOTO REFERENCIAL -->
                    <div v-if="['Foto referencial'].includes(content.format) && !content.file" class="bg-slate-200 w-[200px] h-[150px] flex align-center justify-center">
                      <font-awesome-icon icon="fa-solid fa-image" class="w-8 h-8" />
                    </div>
                    <!-- WITHOUT FOTO REFERENCIAL -->

                    <!-- VIDEO -->
                    <div v-if="['Video Online'].includes(content.format)" class="bg-slate-200 w-[200px] h-[150px] flex align-center justify-center">
                      <font-awesome-icon icon="fa-solid fa-play" class="w-8 h-8" />
                    </div>
                    <!-- VIDEO -->

                    <!-- PRESENTACION PDF -->
                    <div v-if="['Presentación PDF'].includes(content.format)" class="bg-slate-200 w-[200px] h-[150px] flex align-center justify-center">
                      <font-awesome-icon icon="fa-solid fa-file-pdf" class="w-8 h-8" />
                    </div>
                    <!-- PRESENTACION PDF -->

                    <!-- CODIGO EMBED -->
                    <div v-if="content.format == null" class="bg-slate-200 w-[200px] h-[150px] flex align-center justify-center">
                      <font-awesome-icon icon="fa-solid fa-align-left" class="w-8 h-8" />
                    </div>
                    <!-- CODIGO EMBED -->

                    <!-- PRESENTACION PDF -->
                    <div class="text-xs font-bold mt-2">
                        <span>{{ content.title }}</span>
                    </div>
            </div>
        </div>
    </div>
    <!-- CONTENTS -->

    <v-divider class="my-4"></v-divider>

    <!-- CONTENT -->
    <div>
        <span class="block text-xl font-bold mb-4">{{ activeContenido.title }}</span>

        <!-- FOTOS REFERENCALES -->
           <UtilitariosLightBox 
           v-if="['Foto referencial'].includes(activeContenido.format) && activeContenido.file"
           :images="[$config.apiUrlV2 + '/assets/' + activeContenido.file.id]"
           :description="activeContenido.file.description">
           </UtilitariosLightBox>
        <!-- FOTOS REFERENCALES -->

        <!-- VIDEO -->
        <div v-if="['Video Online'].includes(activeContenido.format)">
            <iframe
             v-if="activeContenido.url"
            :src="get_video_params.outputUrl"
            width="100%"
            height="400"
            ></iframe>
        </div>
        <!-- VIDEO -->

        <!-- PRESENTACION PDF -->
        <div v-if="['Presentación PDF'].includes(activeContenido.format)">
            <iframe
            v-if="activeContenido.file"
            :src="$config.apiUrlV2 + '/assets/' + activeContenido.file.id"
            width="100%"
            height="400"
            ></iframe>
        </div>

        <span v-html="activeContenido.body" class="text-xs"></span>
    </div>

    <!-- CONTENT -->
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
    activeCapitulo() {
      return this.$store.getters["capitulos/activeCapitulo"];
    },
    activeContenido() {
      return this.$store.getters["capitulos/activeContenido"];
    },
    capitulos() {
      return this.$store.getters["capitulos/capitulos"];
    },
  },
};
</script>

<style></style>
