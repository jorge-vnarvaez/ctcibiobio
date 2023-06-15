<template>
  <v-row>
    <v-col cols="12">
      <v-divider class="my-6"></v-divider>
    </v-col>

    <!-- NOMBRE DE LA CAPACITACIÓN -->
    <v-col cols="12">
      <v-row>
        <v-col cols="12" lg="3">
          <span class="block font-bold text-slate-700">{{
            capacitacion.name
          }}</span>
        </v-col>
      </v-row>
    </v-col>
    <!-- NOMBRE DE LA CAPACITACIÓN -->

    <!-- CUERPO -->
    <v-col cols="12" lg="12">
      <v-row>
        <!-- FLYER -->
        <v-col cols="12" xl="4" lg="6">
          <v-img
            :src="$config.apiUrlV2 + '/assets/' + capacitacion.flyer"
            :width="$vuetify.breakpoint.mobile ? '100%' : 500"
            :height="$vuetify.breakpoint.mobile ? '100%' : 500"
            class="rounded-sm"
          ></v-img>
        </v-col>
        <!-- FLYER -->


        <v-col cols="12" xl="8" lg="6">
          <div class="flex flex-col justify-between">
            <div>
              <!-- EXPOSITOR -->
              <div>
                <span class="block text-[12px]">Expositor</span>
                <span class="block font-bold">
                  {{ capacitacion.expositor }}
                </span>
              </div>
              <!-- EXPOSITOR -->

              <!-- DESCRIPCIÓN -->
              <div class="mt-6 h-full lg:h-[254px]">
                <span class="block text-[12px]">Descripción</span>
                <span
                  v-if="capacitacion.description"
                  class="block text-slate-400 text-[16px]"
                  v-html="capacitacion.description"
                >
                </span>

                <span
                  v-if="!capacitacion.description"
                  class="block text-slate-400 text-[16px]"
                >
                  En breve se publicará la descripción de la capacitación.
                </span>
              </div>
              <!-- DESCRIPCIÓN -->
            </div>

            <div class="mt-6 lg:mt-0">
              <!-- MATERIAL -->
              <div>
                <v-btn
                  outlined
                  small
                  color="orange darken-4"
                  :href="
                    $config.apiUrlV2 +
                    '/assets/' +
                    capacitacion.material +
                    '?download'
                  "
                  :disabled="!capacitacion_has_material"
                >
                  <v-icon left>mdi-file-pdf-box</v-icon>
                  Descargar presentación
                </v-btn>
              </div>
              <!-- MATERIAL -->

              <!-- RECURSOS DE APOYO -->
              <div class="mt-2">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined small v-bind="attrs" v-on="on" :disabled="!capacitacion_has_resources" >
                      <v-icon left>mdi-folder-arrow-down</v-icon>
                      Recursos de apoyo
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="recurso in capacitacion.recursos"
                      :key="recurso.directus_files_id.id"
                      :href="
                        $config.apiUrlV2 +
                        '/assets/' +
                        recurso.directus_files_id.id +
                        '?download'
                      "
                    >
                      <v-list-item-title>
                        <span class="text-[16px]">
                          {{ recurso.directus_files_id.title }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <!-- RECURSOS DE APOYO -->


              <!-- YOUTUBE -->
              <div class="mt-2">
                <v-btn
                  outlined
                  small
                  color="red darken-1"
                  :href="capacitacion.youtube_link"
                  target="_blank"
                  :disabled="!capacitacion.youtube_link"
                >
                  <v-icon left>mdi-youtube</v-icon>
                  Ver en Youtube
                </v-btn>
              </div>
              <!-- YOUTUBE -->

              <!-- ZOOM -->
              <div class="mt-2">
                <v-btn
                  outlined
                  small
                  color="blue darken-1"
                  :href="capacitacion.zoom_link"
                  target="_blank"
                  :disabled="broadcast_date_expired"
                >
                  <v-icon left>mdi-video</v-icon>
                  Conectarse Vía Zoom
                </v-btn>
              </div>
              <!-- ZOOM -->
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <!-- CUERPO -->

    <!-- FECHA DE TRANSMISIÓN -->
    <v-col cols="12">
      <v-row>
        <v-col cols="12" lg="6">
          <span class="block text-[12px]">Fecha de transmisión</span>
          <div class="flex align-center space-x-2 mt-2">
            <font-awesome-icon
              :icon="['fas', 'calendar-days']"
              style="color: #246deb; height: 20px"
            />
            <span class="text-slate-600">
              {{ $moment(capacitacion.broadcast_date).format("LLL") }}
            </span>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <!-- FECHA DE TRANSMISIÓN -->
  </v-row>
</template>

<script>
export default {
  props: {
    capacitacion: {
      type: Object,
      required: true,
    },
  },
  computed: {
    broadcast_date_expired() {
      return this.$moment(this.capacitacion.broadcast_date).isBefore(
        this.$moment()
      );
    },
    capacitacion_has_material() {
      return this.capacitacion.material;
    },
    capacitacion_has_resources() {
      return this.capacitacion.recursos.length > 0;
    },
  },
};
</script>

<style>
</style>