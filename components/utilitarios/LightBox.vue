<template>
  <div>
    <CoolLightBox
      :items="images"
      :index="index"
      :fullScreen="true"
      useZoomBar
      closeOnClickOutsideMobile
      @close="index = null"
    >
    </CoolLightBox>

    <div v-if="!is_infografia">
      <span class="text-xs text-slate-500 font-thin block text-left mb-2">Haga clic sobre la imagen para obtener más detalles.</span>
      <div>
        <v-img
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          @click="index = imageIndex"
          :src="image"
          class="cursor-pointer h-[400px] w-[600px]"
        ></v-img>
      </div>
      <span class="block mt-4 mb-4 lg:mb-0 text-xs font-thin text-slate-500">{{
        description !== '' ? description : $store.getters["capitulos/activeContenido"].file.description
      }}</span>
    </div>

    <div v-if="is_infografia">
      <iframe
        v-if="['xl'].includes($vuetify.breakpoint.name)"
         class="image-wrapper"
        :src="images[0]"
        :width="width"
        :height="height"
      ></iframe>

      <div v-if="['xs', 'md', 'lg'].includes($vuetify.breakpoint.name)">
        <v-img
        v-for="(image, imageIndex) in images"
        :key="imageIndex" :src="images[0] + '?fit=contain&width=' + width + '&height=' + height" @click="index = imageIndex"></v-img>
      </div>
    </div>
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
    };
  },
  props: {
    images: {
      type: Array,
      default: null,
      desc: "An array of images to display in the lightbox",
    },
    description: {
      type: String,
      default: null,
      desc: "A description of the image",
    },
    is_infografia: {
      type: Boolean,
      default: false,
      desc: "If the lightbox is for an infografia",
    },
    width: {
        type: [String, Number],
        default: 800,
        desc: "Width of the infografia",
    },
    height: {
        type: [String, Number],
        default: 600,
        desc: "Height of the infografia",
    },
  },
};
</script>

<style></style>
