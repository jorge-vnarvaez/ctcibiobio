<template>
  <div>
    <TypesCapacitacionesCard v-for="capacitacion in capacitaciones" :key="capacitacion.id" :capacitacion="capacitacion" />
  </div>
</template>

<script>
export default {
    async fetch() {
        await this.$store.dispatch("capacitaciones/loadCapacitaciones");
    },
    computed: {
        capacitaciones() {
            return this.$store.getters["capacitaciones/capacitaciones"];
        }
    }
}
</script>

<style>

</style>