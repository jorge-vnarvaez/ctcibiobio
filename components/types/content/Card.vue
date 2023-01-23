<template lang="">
  <v-card :to="`/${content.type}/${content.slug}`">
    <v-img
      v-if="content.featured_image"
      height="250px"
      :src="$config.apiUrlV2 + '/assets/' + content.featured_image + '?quality=80'"
    ></v-img>
    <div class="p-4">
      <div class="text-md font-bold text-slate-500">{{ content.title }}</div>
      <div class="text-sm text-slate-400 font-sans mt-2">
        {{ content.excerpt }}
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
};
</script>
<style lang=""></style>
