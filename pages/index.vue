<template>
  <div>
    <TypesCallsToActionPrincipal></TypesCallsToActionPrincipal>
    <!-- <InfoUltimaNoticiaDestacada></InfoUltimaNoticiaDestacada> -->

    <LazyInfoNoticiasEventos></LazyInfoNoticiasEventos>

    <LazyInfoCifras></LazyInfoCifras>

    <!-- Podcasts -->
    <LazyInfoPodcasts></LazyInfoPodcasts>
    <!-- Podcasts -->

    <!-- Infografías -->
    <LazyInfoInfografias></LazyInfoInfografias>
    <!-- Infografías -->

    <!-- Organizaciones -->
    <div class="my-16">
      <LazyInfoOrganizacionesBlack></LazyInfoOrganizacionesBlack>
    </div>
    <!-- Organizaciones -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      absolute: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("documento/loadDocuments");
  },
  computed: {
    overlay() {
      return this.$store.getters["modals/modal_priorization"];
    },
  },
};
</script>
<style>

</style>
