<template>
  <v-app>
    <v-main>
      <!-- NAV BAR -->
      <v-app-bar elevation="0" height="90px">
        <v-container fluid class="d-flex justify-space-between align-center">
          <div class="d-flex">
            <nuxt-link to="/">
              <no-ssr>
                <v-img
                  max-height="45px"
                  height="45px"
                  max-width="210px"
                  contain
                  position="center left"
                  src="/img/iso_ctci.png"
                />
              </no-ssr>
            </nuxt-link>
          </div>
        </v-container>
      </v-app-bar>
      <!-- NAV BAR -->

      <!-- CONTENT -->
      <div>
        <Nuxt />
      </div>
      <!-- CONTENT -->

      <!-- FOOTER -->
      <NavFooter />
      <!-- FOOTER -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  async fetch() {
    this.$store.commit("gamificacion/setUserId", this.$cookies.get("userID"));
    this.user_id = this.$store.getters["gamificacion/getUserId"];
  }
};
</script>

<style></style>
