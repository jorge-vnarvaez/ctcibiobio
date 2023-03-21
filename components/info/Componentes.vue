<template>
  <div
    :style="{ padding: $vuetify.breakpoint.mobile ? '15% 7%' : '3% 7%' }"
    class="h-fit"
  >
    <span
      class=" text-gray-500 text-lg lg:text-3xl font-bold mb-8 lg:text-center"
      >Etapas</span
    >

    <v-card rounded="xl" color="#078BC7" class="pa-6" elevation="0">
      <div class="text-white flex flex-col">
        <span class="block font-black text-3xl lg:text-6xl">
          {{ activeComponent.id }}
        </span>

        <span class="block mb-4 text-xl lg:text-3xl font-black">
          {{ activeComponent.title }}
        </span>

        <span class="block font-bold text-sm lg:text-2xl mb-4">
          {{ activeComponent.sub_title }}
        </span>

        <span class="block text-[14px] lg:text-xl">
          {{ activeComponent.description }}
        </span>
      </div>
    </v-card>

    <div class="flex justify-center mt-6 space-x-4">
      <div v-for="component in components" :key="'etapa' + component.id">
        <v-icon
          :class="
            activeComponentKey == component.key ? 'opacity-100' : 'opacity-25'
          "
          small
          @click="activeComponentKey = component.key"
          >mdi-circle</v-icon
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeComponentKey: 1,
      components: [
        {
          id: "01",
          key: 1,
          title: "Diagnóstico",
          sub_title:
            "Levantamiento de información base del sistema regional de innovación",
          description:
            "Revisión y análisis de información y estrategias regionales relacionadas a la iniciativa. Además de un mapeo inicial del SRI apoyado de bases de datos, encuestas y entrevistas. Todas estas actividades tienen el fin de establecer la línea base del ecosistema de CTCI de la región, sus componentes e indicadores.",
          actividades: ["Revisión", "Mapeo", "Indicadores"],
        },
        {
          id: "02",
          key: 2,
          title: "Sociabilización",
          sub_title:
            "Sociabilización de temas estratégicos y levantamiento de demandas",
          description:
            "Comprende reuniones de cobertura territorial así como mesas de trabajo con distintos representantes tanto del sector académico, gremios, sector privado y miembros del ecosistema de emprendimiento. Finalmente, la iteración de aprendizajes, información y con el Gobierno regional. Esto definirá lineamientos, desafíos y rutas de trabajo de la estrategia.",
          actividades: ["Mesas de trabajo", "Talleres", "Entrevistas"],
        },
        {
          id: "03",
          key: 3,
          title: "Diseño",
          sub_title:
            "Generación de estrategia, desafíos, oportunidades, programas",
          description:
            "Actividades de análisis interno de datos, gira tecnológica, definición de desafíos, validación, generación de estrategia y plan de difusión. Todo con el fin de obtener el marco estratégico, formas y volumen de las acciones y principales programas basados en misiones regionales.",
          actividades: ["Estrategia", "Marco de revisión", "Programas"],
        },
        {
          id: "04",
          key: 4,
          title: "Implementación",
          sub_title:
            "Implementación de plataforma de seguimiento, visualización e información",
          description:
            "Despliegue de una plataforma para el inclusión de métricas e implementación de un sistema de seguimiento con el fin de entregar una visualización y mecanismo de control de la estrategia con gobernanza y gestión sustentable de dicha herramienta.",
          actividades: [
            "Alcances de estrategia",
            "Publicaciones de análisis",
            "Actividades y comunidad",
          ],
        },
      ],
    };
  },
  computed: {
    activeComponent() {
      return this.components[this.activeComponentKey - 1];
    },
  },
};
</script>
<style></style>
