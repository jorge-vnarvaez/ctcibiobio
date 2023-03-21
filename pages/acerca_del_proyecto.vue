<template>
  <div class="grey lighten-4">
    <InfoJumbo />

    <v-container>
      <InfoComponentes />
    </v-container>

    <!-- <v-container>
      <TypesEstrategiaNavegadorEstrategia />
    </v-container> -->
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Estrategia",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Metodología y avances en nuestro modelo estratégico",
        },
      ],
    };
  },
};
</script>
