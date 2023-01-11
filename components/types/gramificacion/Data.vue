<template>
  <div>
    <v-container class="mt-10">
      <span class="block text-2xl text-slate-800 font-black mb-4"
        >Priorización en cifras</span
      >
      <div class="grid grid-cols-12 lg:gap-x-8 gap-y-6 mb-8" v-if="loading == false">
        <!-- TOTAL PRIORIZATIONS -->
        <v-card :class="col_span + ' p-4'">
          <div class="flex align-center space-x-2">
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-booth-curtain"
              class="h-8 w-8"
            />
            <div class="flex flex-col">
              <span class="font-black">{{ totalMatchs }}</span>
              <span class="text-xs">Priorizaciones</span>
            </div>
          </div>
        </v-card>
        <!-- TOTAL PRIORIZATIONS -->

        <!-- TOTAL USERS -->
        <v-card :class="col_span + ' p-4'">
          <div class="flex align-center space-x-2">
            <font-awesome-icon icon="fa-solid fa-user" class="h-8 w-8" />
            <div class="flex flex-col">
              <span class="font-black">{{ totalParticipants }}</span>
              <span class="text-xs">Participantes</span>
            </div>
          </div>
        </v-card>
        <!-- TOTAL USERS -->
      </div>

      <div class="grid grid-cols-12 lg:gap-x-8 gap-y-8" v-if="loading == false">
        <TypesGramificacionTfParticipantes></TypesGramificacionTfParticipantes>
        <TypesGramificacionTfProvincias></TypesGramificacionTfProvincias>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
    }
  },
  async fetch() {
    await Promise.all([
      this.$store.dispatch("gamificacion/loadTotalParticipants"),
      this.$store.dispatch("gamificacion/loadMatchsLength"),
      this.$store.dispatch("gamificacion/loadTfParticipantes"),
      this.$store.dispatch("gamificacion/loadTfProvincias"),
    ]).then((res) => {
      if(res) {
        this.loading = false
      } else {
        this.loading = true
      }
    })
  },
  computed: {
    totalParticipants() {
      return this.$store.getters["gamificacion/totalParticipants"];
    },
    totalMatchs() {
      return this.$store.getters["gamificacion/totalMatchs"];
    },
    col_span() {
        switch(this.$vuetify.breakpoint.name) {
            case 'xs':
                return 'col-span-12';
            case 'sm':
                return 'col-span-12';
            case 'md':
                return 'col-span-3';
            case 'lg':
                return 'col-span-3';
            case 'xl':
                return 'col-span-2';
        }
    }
  },
};
</script>

<style></style>
