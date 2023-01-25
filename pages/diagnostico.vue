<template>
  <div id="template">
    <v-container fluid>
      <!-- <div class="text-h3 py-10">Diagnóstico</div> -->
      <TypesEstrategiaNavegadorEstrategiaMobile v-if="$vuetify.breakpoint.mobile" />
      <TypesEstrategiaNavegadorEstrategia v-if="!$vuetify.breakpoint.mobile" />
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#template {
  height: 80vh;
  overflow-y: scroll;
}

#template::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

#template::-webkit-scrollbar-thumb {
  background: #888;
}
</style>