<template>
  <div v-if="infografias.length > 0">
    <v-row no-gutters>
      <v-col
        cols="12"
        lg="3"
        v-for="infografia in infografias"
        :key="infografia.image"
      >
        <v-img :src="$config.apiUrlV2 + '/assets/' + infografia.image"> </v-img>
      </v-col>
    </v-row>
    <CoolLightBox
      :items="
        infografias.map((infografia) => {
          return (
            $config.apiUrlV2 + '/assets/' + infografia.image + '?quality=80'
          );
        })
      "
      :index="index"
      :fullScreen="true"
      useZoomBar
      closeOnClickOutsideMobile
      @close="index = null"
    >
    </CoolLightBox>
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
  async fetch() {
    await this.$store.dispatch("infografias/loadInfografias");
  },
  computed: {
    infografias() {
      return this.$store.getters["infografias/getInfografias"];
    },
  },
};
</script>

<style></style>
