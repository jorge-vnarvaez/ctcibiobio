<template lang="">
  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mt-10 mb-10 md:mb-8 xl:mb-12">Convocamos a participar en este proyecto a</h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 xl:gap-8 mb-4 md:mb-8">
        <!-- image - start -->
        <div v-for="(convocado, index) in convocados" :key="index" 
        class="group h-48 md:h-80 flex items-end bg-lb-100 overflow-hidden rounded-lg shadow-lg relative">
          <img 
          :src="'/illustration/'+convocado.id+'.png'" 
          loading="lazy" 
          alt="Photo by Minh Pham" 
          :class="{
            'w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200':true,
            [convocado.bgClass]: true,  
          }" />

          <div class="bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-30 absolute inset-0 pointer-events-none"></div>

          <span class="inline-block text-white text-sm md:text-lg relative ml-4 md:ml-5 mb-3 ">{{convocado.title}}</span>
        </div>
        <!-- image - end -->

       
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      convocados: [
        {
          id: 1,
          title: "Emprendedores",
          bgClass: 'bg-amber-400'
        },
        {
          id: 6,
          title: "Académicos",
          bgClass: 'bg-green-500'
        },
        {
          id: 7,
          title: "Visionarios",
          bgClass: 'bg-cyan-300'
        },
        {
          id: 2,
          title: "Gestores de política pública",
          bgClass: 'bg-rose-600'
        },
        {
          id: 4,
          title: "Ciudadanos",
          bgClass: 'bg-neutral-300'
        },
        {
          id: 16,
          title: "Actores del emprendimiento",
          bgClass: 'bg-purple-400'
        },
        {
          id: 18,
          title: "Sector privado",
          bgClass: 'bg-orange-300'
        },
        {
          id: 19,
          title: "Estudiantes",
          bgClass: 'bg-teal-400'
        },
        
      ]
    }
  }
}
</script>
<style lang="">
  
</style>