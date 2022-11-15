<template>
  <v-img
    src="/patterns/topography.png"
    :class="$vuetify.breakpoint.mobile ? 'py-20 px-8' : 'h-screen px-4'"
  >
    <div class="d-flex h-full align-center justify-center px-8">
      <div class="rounded-lg shadow-xl">
        <v-card
          class="bg-white p-8 rounded-lg"
          :max-width="$vuetify.breakpoint.mobile ? 300 : 520"
          :width="$vuetify.breakpoint.mobile ? 300 : 520"
          flat
        >
          <v-card-title>Bienvenido/a</v-card-title>
          <v-card-subtitle>
            {{
              has_answered
                ? "&#128075; Hola de nuevo, ¿Quieres seguir participando?"
                : "Participar"
            }}</v-card-subtitle
          >
          <v-card-text>
            <v-text-field
              v-model="rut"
              label="Indicanos tu RUT"
              placeholder="Ejemplo: 12345678-9 (sin puntos, con guión)"
            ></v-text-field>

            <v-btn
              outlined
              color="orange darken-1"
              medium
              class="text-capitalize"
              @click="participar"
              >Participar</v-btn
            >

            <span v-if="has_answered" class="block text-xs mt-6"
              >O haz
              <nuxt-link to="/gamificacion/resultados"
                ><span class="text-[#2929c6] font-bold"
                  >click aquí</span
                ></nuxt-link
              >
              si quieres ver los resultados.</span
            >
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-img>
</template>

<script>
export default {
  layout: "encuesta",
  data() {
    return {
      rut: null,
      rut_valido: false,
      has_answered: false,
    };
  },
  mounted() {
    this.has_answered = this.$cookies.get("userRUT") || false;
  },
  methods: {
    async participar() {
      const cookie_token = window.btoa(this.rut);

      const data = await this.$axios
        .$get(`${this.$config.apiUrlV2}/users?filter[rut][_eq]=${this.rut}`)
        .then((res) => res.data);

      if (data.length > 0) {
        this.$cookies.set("userID", data[0].id);
        this.$cookies.set("userRUT", data[0].rut);
        this.$cookies.set("cookie_token", data[0].cookie_token);
      } else {
        
        this.$cookies.remove("userID");
        this.$cookies.remove("userRUT");
        this.$cookies.remove("cookie_token");

        if (this.$cookies.get("cookie_token") === undefined) {
          const data = await this.$axios
            .$post(`${this.$config.apiUrlV2}/users`, {
              role: "2f5d20a2-c287-49a4-be3e-5c2160e8476e",
              cookie_token: cookie_token,
              rut: this.rut,
            })
            .then((res) => res.data);
          this.$cookies.set("userID", data.id);
          this.$cookies.set("userRUT", data.rut);
          this.$cookies.set("cookie_token", cookie_token);
        }
      }

      this.$router.push("/gamificacion/cuestionario");
    },
  },
};
</script>

<style></style>
