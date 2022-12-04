<template>
  <v-img
    src="/patterns/topography.png"
    :class="$vuetify.breakpoint.mobile ? 'py-20 px-8' : 'h-screen'"
  >
    <div class="d-flex h-full align-center justify-center px-8">
      <div class="rounded-lg shadow-xl">
        <v-card
          class="bg-white p-8 rounded-lg"
          :max-width="$vuetify.breakpoint.mobile ? 300 : 520"
          :width="$vuetify.breakpoint.mobile ? 300 : 520"
          flat
        >
          <v-card-text>
            <v-form ref="form" v-model="validado" lazy-validation>
              <v-text-field
                v-model="user.rut"
                label="Indicanos tu RUT"
                placeholder="Ejemplo: 12345678-9 (sin puntos, con guión)"
                :rules="reglaRut"
              ></v-text-field>

              <v-text-field
                v-model="user.correo"
                label="¿Cuál es tu correo electrónico?"
                placeholder="Ejemplo: micorreo@gmail.com"
                :rules="notNull"
              ></v-text-field>

              <v-select
                v-model="user.genero"
                label="¿Cuál es tu género?"
                :items="generos"
                :rules="notNull"
              ></v-select>

              <v-select
                v-model="user.provincia"
                label="¿De qué provincia eres?"
                :items="provincias"
                :rules="notNull"
              ></v-select>

              <v-select
                v-model="user.birthyear"
                label="¿En qué año naciste?"
                :items="years"
                :rules="notNull"
              ></v-select>

              <v-btn
                outlined
                color="orange darken-1"
                medium
                class="text-capitalize mt-4"
                @click="participar"
                >Comenzar</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-img>
</template>

<script>
export default {
  data() {
    return {
      validado: false,
      user: {
        rut: "",
        correo: "",
        genero: "",
        provincia: "",
        birthyear: "",
      },
      has_answered: false,
      generos: [
        { text: "Masculino", value: "masculino" },
        { text: "Femenino", value: "femenino" },
        { text: "Otro", value: "otro" },
        { text: "Prefiero no decirlo", value: "prefiero-no-decirlo" },
      ],
      provincias: [
        { text: "Arauco", value: "arauco" },
        { text: "Biobío", value: "biobío" },
        { text: "Concepción", value: "concepción" },
      ],
      // create an array for years between 1930 and 2022
      years: Array.from(new Array(93), (val, index) => 2000 - index),
      reglaRut: [(v) => !!v || "El RUT es obligatorio"],
      notNull: [
        (v) => !!v || "Este campo es obligatorio",
      ]
    };
  },
  mounted() {
    this.has_answered = this.$cookies.get("userRUT") || false;
  },
  methods: {
    async participar() {
      this.$refs.form.validate();

      try {
        const cookie_token = window.btoa(this.user.rut);

        const data = await this.$axios
          .$get(
            `${this.$config.apiUrlV2}/users?filter[rut][_eq]=${this.user.rut}`
          )
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
                rut: this.user.rut,
                response_email: this.user.correo,
                genero: this.user.genero,
                provincia: this.user.provincia,
                birthyear: this.user.birthyear,
              })
              .then((res) => res.data);

            this.$cookies.set("userID", data.id);
            this.$cookies.set("userRUT", data.rut);
            this.$cookies.set("cookie_token", cookie_token);
          }
        }

        this.$router.push("/gamificacion/cuestionario");
      } catch (e) {}
    },
  },
};
</script>

<style></style>
