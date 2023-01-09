<template>
  <div class="flex justify-between mb-4">
    <span class="text-2xl text-slate-800 font-black">Priorizaciones</span>
    <div>
        <v-menu offset-y nudge-left="150" nudge-bottom="10" :close-on-content-clic="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon><font-awesome-icon icon="fa-sharp fa-solid fa-bars-sort" :class="activeColor + ' w-5 h-5'" /></v-btn>
            </template>
            <v-list>
                <v-list-item>
                <v-radio-group v-model="activeFilter">
                    <v-radio
                    v-for="item in filters" :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    @click="sortRanking()"
                    ></v-radio>

                
                </v-radio-group>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeColor: 'text-slate-400',
      activeFilter: 1,
      filters: [
        { id: 1, name: "Más aceptado" },
        { id: 2, name: "Menos aceptado" },
        { id: 3, name: "Más votado" },
        { id: 4, name: "Menos votado" },
      ],
    };
  },
  methods: {
    sortRanking() {
        this.activeColor = "text-sky-400"
        this.$store.dispatch('gamificacion/sortRanking', this.activeFilter)
    }
  }
};
</script>

<style></style>
