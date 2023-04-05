<template>
  <div
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8"
    id="equipo"
  >
    <div class="mx-auto mb-10 lg:max-w-xl sm:text-center">
      <p
        class="inline-block px-3 py-px mb-4 text-sm font-bold tracking-wider text-blue-900 uppercase rounded-full w-full text-center"
      >
        Gobierno regional del Biobío
      </p>
    </div>

     <v-row justify="center">
      <v-col
        v-for="(integrante, index) in integrantes"
        :key="index"
        class="flex flex-col items-center"
        cols="6"
        lg="3"
      >
        <img
          class="object-cover w-20 h-20 mb-2 rounded-full shadow"
          v-if="integrante.img"
          :src="`${integrante.img}`"
          alt="Person"
        />
        <div class="flex flex-col items-center">
          <p class="text-sm lg:text-lg text-center text-gray-500 font-bold">
            {{ integrante.nombre }}
          </p>
          <p class="text-[12px] lg:text-sm text-center text-gray-500">
            {{ integrante.cargo }}
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            integrantes: [
                {
                nombre: "Ivan Valenzuela",
                cargo: "Jefe División de Fomento e Industria Gore Biobío",
                img: "/gobierno/IvanValenzuela.jpeg",
                },
                {
                nombre: "Rodrigo Díaz Wórner",
                cargo: "Gobernador Regional de Biobío",
                img: "/gobierno/RodrigoDiaz.jpeg",
                },
            ]
        }
    }
};
</script>

<style></style>
