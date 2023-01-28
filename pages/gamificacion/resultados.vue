<template>
  <div class="scroll-smooth">
    <div class="bg-gradient-to-b from-stone-900 to-blue-900 py-12">
      <!-- HERO IMAGE -->
      <v-container>
        <span class="blcok text-xl lg:text-5xl font-bold text-white"
          >Resultados</span
        >
        <span
          class="block text-sm lg:text-xl mt-4 text-zinc-100 lg:leading-loose"
        >
          ¡Conoce los temas que importan para la Región del Biobío! Los
          resultados de nuestra encuesta de priorización de focos, recolectados
          de la participación activa de diversos actores, revelan los 10
          problemas más críticos que requieren nuestra atención. ¡No te pierdas
          esta valiosa perspectiva sobre los desafíos y oportunidades que
          enfrenta nuestra Región!
        </span>
        <div v-if="isUserSet">
          <span
            class="block text-sm lg:text-2xl mt-8 mb-4 text-zinc-100 font-black"
            >¿Te interesa seguir priorizando?</span
          >
          <v-btn
            color="amber darken-3"
            class="white--text"
            depressed
            to="/gamificacion/cuestionario"
            >Seguir Priorizando</v-btn
          >
        </div>

        <div v-if="!isUserSet">
          <span
            class="block text-sm lg:text-2xl mt-8 mb-4 text-zinc-100 font-black"
            >¿Quieres priorizar?</span
          >
          <v-btn
            color="amber darken-3"
            class="white--text"
            depressed
            to="/gamificacion"
            >Comenzar a priorizar</v-btn
          >
        </div>
      </v-container>
    </div>
    <!-- HERO IMAGE -->

    <!-- GAMIFICACION DATA -->
    <TypesGramificacionData></TypesGramificacionData>
    <!-- GAMIFICACION DATA -->

    <div class="bg-gradient-to-b from-stone-900 to-blue-900 py-16">
      <v-container class="text-white">
        <!-- COMO FUNCIONA LA PRIORIZACION -->
        <span class="block text-xl lg:text-4xl font-bold text-white mb-4"
          >¿Cómo funciona la priorización de focos CTCI?</span
        >
        <div class="flex text-sm lg:text-xl lg:leading-loose mb-16">
          <span
            >En la práctica el sistema de clasificación
            <a
              href="https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/"
              target="_blank"
              ><span class="text-[#ffac00] font-black"
                >True Skill&#8482;</span
              ></a
            >
            se utiliza para clasificar jugadores en videojuegos utilizando como
            criterio su skill o habilidad para jugar. Para el caso práctico de
            los focos CTCI el
            <b>nivel de aceptación</b>
            (<font-awesome-icon
              icon="fa-solid fa-stars"
              class="h-6 w-6 inline-flex"
            />) de un foco se ha de utilizar como un criterio de
            clasificación (priorización) de los focos que impulsarán el
            desarrollo en la Región del Biobío. Usando la
            <a
              href="https://es.wikipedia.org/wiki/Inferencia_bayesiana"
              target="_blank"
              ><span class="text-[#ffac00] font-black"
                >inferencia bayesiana</span
              ></a
            >, el sistema de clasificación se caracteriza por su capacidad de
            adaptar el nivel de aceptación de los focos en base a la
            incertidumbre de la naturaleza estadística, debido a que es
            altamente probable que el nivel de aceptación de un foco varíe
            a lo largo del tiempo.
          </span>
        </div>
        <!-- COMO FUNCIONA LA PRIORIZACION -->

        <!-- COMO SE AJUSTA LA PRIORIZACION -->
        <span class="block text-xl lg:text-4xl font-bold text-white mb-4"
          >¿Cómo se ajusta el nivel de aceptación de un foco?</span
        >
        <span class="block text-sm lg:text-xl lg:leading-loose mb-16">
          En este estudio, se analiza cómo la aceptación de un foco no
          depende solo del número de victorias o derrotas, sino también de dos
          factores: el "nivel de aceptación" (μ) y el grado de incertidumbre en
          la aceptación de un foco de cada uno de los usuarios participantes. 
          Tenemos siempre presente que cada usuario tiene criterios y preferencias
          sobre los focos que se deben priorizar en la región, es por esto que
          cada votación se individualiza para posteriormente, crear
          una ponderación general en base a la votación de todos los participantes.
          Para entender esto, utilizamos un
          método llamado "inferencia bayesiana", que nos permite clasificar los 
          focos basándonos en cómo cambian nuestras creencias sobre ellas.
          Por ejemplo, si creemos que un foco A tiene un alto nivel de
          aceptación (90 puntos) y un bajo grado de incertidumbre (4.3), pero lo
          comparamos con un foco B con un nivel de aceptación más bajo (50
          puntos) y un mayor grado de incertidumbre (8.3), es posible que el
          foco B gane en popularidad y su aceptación aumente drásticamente.
          Sin embargo, al continuar haciendo elecciones y comparando los focos, 
          los niveles de aceptación y grado de incertidumbre se
          estabilizarán y se obtendrán resultados más precisos y justos gracias
          a la inferencia bayesiana.
        </span>
        <!-- COMO SE AJUSTA LA PRIORIZACION -->

        <!-- CUANTOS HAN PARTICIPADO -->
        <span class="block text-xl lg:text-4xl font-bold text-white mb-4"
          >Participación en la encuesta: ¡Conoce el número de
          participantes!</span
        >
        <div class="text-sm lg:text-xl leading-loose mt-16">
          <div
            class="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12"
          >
            <div>
              <span
                ><span class="text-2xl lg:text-5xl font-black text-[#ffac00]">{{
                  totalParticipants
                }}</span>
                participantes</span
              >
            </div>

            <div>
              <span class="text-2xl lg:text-5xl font-black text-[#ffac00]">{{
                totalMatchs
              }}</span>
              priorizaciones
            </div>
          </div>
        </div>
        <!-- CUANTOS HAN PARTICIPADO -->
      </v-container>
    </div>

    <TypesGramificacionResultados></TypesGramificacionResultados>
  </div>
</template>

<script>
export default {
  layout: "encuesta",
  computed: {
    totalParticipants() {
      return this.$store.getters["gamificacion/totalParticipants"];
    },
    totalMatchs() {
      return this.$store.getters["gamificacion/totalMatchs"];
    },
    // check if userID is set
    isUserSet() {
      return this.$store.getters["gamificacion/getUserId"];
    },
  },
};
</script>

<style></style>
