<template>
   <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8" id="equipo">
    <div class="mx-auto mb-10 lg:max-w-xl sm:text-center">
      <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400 w-full text-center">
        Comité Regional de Ciencia, Tecnología e Innovación para el Desarrollo, Región del Biobío
      </p>
      <!-- <p class="text-base text-gray-700 md:text-lg text-center">
        Comité Regional de Ciencia, Tecnología e Innovación para el Desarrollo, Región del Biobío
      </p> -->
    </div>
    <div class="grid gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(member, index) in members" :key="index" class="flex flex-col items-center">
        <img class="object-cover w-20 h-20 mb-2 rounded-full shadow" v-if="member.img" :src="`https://apificr.uinn.cl/assets/${member.img}`" alt="Person" />
        <div class="flex flex-col items-center">
          <p class="text-lg text-center font-bold">{{member.title}}</p>
          <p class="text-sm text-center text-gray-800">{{member.job_title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            members: []
        }
    },
    async fetch() {
        const { data } = await fetch(this.$config.apiUrlV2 + '/items/committee_members').then(res => res.json())

        this.members = data
    }
}
</script>

<style>

</style>