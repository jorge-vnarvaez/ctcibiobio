<template>
  <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20" id="equipo">
    <div class="mx-auto mb-10 lg:max-w-xl sm:text-center">
      <p  class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-blue-900 uppercase rounded-full w-full text-center">
        Equipo Ejecutor
      </p>
    </div>
    <v-row>
      <v-col v-for="(integrante, index) in integrantesApi" :key="index" class="flex flex-col items-center" cols="6" lg="3">
        <img class="object-cover w-20 h-20 mb-2 rounded-full shadow" v-if="integrante.img" :src="`https://apificr.uinn.cl/assets/${integrante.img.filename_disk}`" alt="Person" />
        <div class="flex flex-col items-center">
          <p class="text-sm lg:text-lg text-center text-gray-500 font-bold">{{integrante.title}}</p>
          <p class="text-[12px] lg:text-sm text-center text-gray-500">{{integrante.job_title}}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      integrantesApi: [
      ],
      integrantes: [
        {
          nombre: "Inti Núñez",
          cargo: "Director del proyecto",
          img: "/equipo/IntiNunez.jpg",
          mail: "intinunez@gmail.com",
          org: "UDEC",
        },
        {
          nombre: "Alejandra Rojas",
          cargo: "Asesor Innovación y Emprendimiento",
          img: "/equipo/AlejandraRojas.jpg",
          mail: "arojas@ubiobio.cl",
          org: "UBB",
        },
        {
          nombre: "Emma Chávez",
          cargo: "Asesor Innovación y Emprendimiento",
          img: "/equipo/EmmaChavez.jpeg",
          mail: "echavez@ucsc.cl",
          org: "UCSC",
        },
        {
          nombre: "Christian Schmitz",
          cargo: "Asesor propiedad intelectual",
          img: "https://www.ucsc.cl/wp-content/uploads/2014/10/christian_schmitz1.jpg",
          mail: "schmitz@ucsc.cl",
          org: "UCSC",
        },
        {
          nombre: "Arnaldo Jelvez",
          cargo: "Asesor Innovación",
          img: "/equipo/ArnaldoJelvez.jpg",
          mail: "ajelvez@ubiobio.cl",
          org: "UBB",
        },
        {
          nombre: "Vicente Hernández",
          cargo: "Asesor",
          img: "/equipo/VicenteHernandez.jpeg",
          mail: "ajelvez@ubiobio.cl",
          org: "UBB",
        },
        {
          nombre: "Paola Verdugo",
          cargo: "Coordinadora",
          img: "/equipo/PaolaVerdugo.jpeg",
        },
        {
          nombre: "Camila García",
          cargo: "Jefa Operativa",
          img: "/equipo/CamilaGarcia.jpg",
        },
        {
          nombre: "Rayén Fica",
          cargo: "Analista de información",
          img: "/equipo/RayenFica.jpeg",
        },
        {
          nombre: "Florencia Llancaleo",
          cargo: "Analista de información",
          img: "/equipo/FlorenciaLlancaleo.jpg",
        },
        {
          nombre: "Muriel Soubelet",
          cargo: "Jefa comunicaciones",
          img: "/equipo/MurielSoubelet.jpeg",
        },
        {
          nombre: "Wuilde San Martín",
          cargo: "Diseñador",
          img: "/equipo/WuildeSanMartin.jpeg",
        },
        {
          nombre: "Martín Mellado",
          cargo: "Lead developer",
          img: "http://www.miet.cl/assets/images/profesores/MartinMellado.jpg",
        },
      ]
    }
  },
  async fetch(){
    // GET information from api using axios
    await this.$axios.$get("https://apificr.uinn.cl/items/team_members?fields[]=title,job_title,sort,img.filename_disk,img.filename_download,*.*&fields[]=parent_organization.title&fields[]=img.id,img.filename_disk&sort[]=sort")
    .then(response => {
      this.integrantesApi = response.data
    })
  },  
}
</script>
