<template lang="">
  <div class="grey lighten-4 pt-[35px]">
    <InfoJumbo/>

    <v-container>
      <InfoComponentes />
    </v-container>
  </div>
</template>
<script>
export default {
  head(){
    return {
      title: 'Estrategia',
      meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Metodología y avances en nuestro modelo estratégico'
          }
      ],
    }
  },
}
</script>
