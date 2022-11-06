<template>
  <v-img>
    <v-responsive :aspect-ratio="16/5" min-height="300px" content-class="d-flex flex-column justify-center py-12" id="actividades">
      
      <div class="text-h2 font-weight-black mb-5 fic-2--text text--darken-3">Etapas del proyecto</div>
      <div class="grilla overflow-x-scroll snap-x snap-mandatory flex w-full space-x-8 py-4" id="componentes-proyecto">
        <!-- Componentes |INICIO| -->
        <div v-for="(componente, index) in componentes" :key="index" :class="clasesComponentes">
          <div>
            <div class="text-h2 font-weight-black nombre-componente">0{{index+1}}</div>
            <div class="yellow--text text--darken-4">
              <div class="text-h5 font-weight-light mb-3 nombre-componente">{{componente.title}}</div>
              <div class="text-body-2">{{componente.description}}</div>
            </div>
          </div>
          <div class="my-n1">
            <v-divider class="my-3"></v-divider>
            <div class="text-overline yellow--text text--darken-4 font-weight-medium">Actividades</div>
            <!-- Actividades |INICIO| -->
            <div v-for="(actividad, key) in componente.actividades" :key="key" :class="clasesTags">{{actividad}}</div>
            <!-- Actividades |FIN| -->
          </div>
        </div>
        <!-- Componentes |FIN| -->
      </div>
    </v-responsive>
  </v-img>
</template>
<script>
export default {
  data(){
    return {
      componentes: [
        {
          title: "Levantamiento de información base del sistema regional de innovación",
          description: "Revisión y análisis de información y estrategias regionales relacionadas a la iniciativa. Además de un mapeo inicial del SRI apoyado de bases de datos, encuestas y entrevistas. Todas estas actividades tienen el fin de establecer la línea base del ecosistema de CTCI de la región, sus componentes e indicadores.",
          actividades: [
            "Revisión",
            "Mapeo",
            "Indicadores",
          ],
        },
        {
          title: "Sociabilización de temas estratégicos y levantamiento de demandas",
          description: "Comprende reuniones de cobertura territorial así como mesas de trabajo con distintos representantes tanto del sector académico, gremios, sector privado y miembros del ecosistema de emprendimiento. Finalmente, la iteración de aprendizajes, información y con el Gobierno regional. Esto definirá lineamientos, desafíos y rutas de trabajo de la estrategia.",
          actividades: [
            "Mesas de trabajo",
            "Talleres",
            "Entrevistas",
          ],
        },
        {
          title: "Generación de estrategia, desafíos, oportunidades, programas",
          description: "Actividades de análisis interno de datos, gira tecnológica, definición de desafíos, validación, generación de estrategia y plan de difusión. Todo con el fin de obtener el marco estratégico, formas y volumen de las acciones y principales programas basados en misiones regionales.",
          actividades: [
            "Estrategia",
            "Marco de revisión",
            "Programas",
          ],
        },
        {
          title: "Implementación de plataforma de seguimiento, visualización e información",
          description: "Despliegue de una plataforma para el inclusión de métricas e implementación de un sistema de seguimiento con el fin de entregar una visualización y mecanismo de control de la estrategia con gobernanza y gestión sustentable de dicha herramienta.",
          actividades: [
            "Alcances de estrategia",
            "Publicaciones de análisis",
            "Actividades y comunidad",
          ],
        },
      ],
      clasesComponentes: {
        "fic-2--block--base invert--block w-9/12 md:w-5/12 flex-shrink-0": true,
        "componente-card pa-10 elevation-0 rounded-lg flex flex-column justify-space-between": true,
      },
      clasesTags: {
        " fic-2--block--darken-2 block-grayscale-0": true,
        "pa-2 my-1 text-caption": true,
      },
    }
  }
}
</script>
<style lang="scss" scoped>

  *::v-deep {
    // .grilla {
      
    // }

    #componentes-proyecto {
      &::-webkit-scrollbar {
        height: 10px;
      }
      &::-webkit-scrollbar-track {
        background:#fef3c7;
      }
      &::-webkit-scrollbar-thumb {
        background:#fcd34d;
        border-radius: 5px;
      }
    }

    .nombre-componente {
      min-height: 80px;
    }
  }
</style>