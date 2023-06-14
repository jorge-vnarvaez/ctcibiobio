<template>
  <v-row>
    <v-col cols="12">
      <v-divider class="my-6"></v-divider>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" lg="3">
          <span class="block font-bold text-slate-700">{{
            capacitacion.name
          }}</span>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" lg="12">
      <v-row>
        <v-col cols="12" lg="4">
          <v-img
            :src="$config.apiUrlV2 + '/assets/' + capacitacion.flyer"
            :width="$vuetify.breakpoint.mobile ? '100%' : 500"
            :height="$vuetify.breakpoint.mobile ? '100%' : 500"
            :contain="$vuetify.breakpoint.mobile"
            class="rounded-sm"
          ></v-img>
        </v-col>

        <v-col cols="12" lg="8">
          <div class="flex flex-col justify-between">
            <div>
              <div>
                <span class="block text-[12px]">Expositor </span>
                <span class="block font-bold">
                  {{ capacitacion.expositor }}
                </span>
              </div>

              <div class="mt-6 h-full lg:h-[350px]">
                <span class="block text-[12px]">Descripción</span>
                <span v-if="capacitacion.description"
                  class="block text-slate-400 text-[16px]"
                  v-html="capacitacion.description"
                >
                </span>

                <span v-if="!capacitacion.description" class="block text-slate-400 text-[16px]">
                    En breve se publicará la descripción de la capacitación.
                </span>
              </div>
            </div>

            <div class="mt-6 lg:mt-0 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 lg:align-end">
                <v-btn outlined small color="blue darken-1" :href="capacitacion.zoom_link" target="_blank">
                    <v-icon left>mdi-video</v-icon>
                    Ver en zoom
                </v-btn>

                <v-btn outlined small color="red darken-1" :href="capacitacion.youtube_link" target="_blank" :disabled="!capacitacion.youtube_link">
                    <v-icon left>mdi-youtube</v-icon>
                    Ver en Youtube
                </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" lg="6">
          <span class="block text-[12px]">Fecha de transmisión</span>
          <div class="flex align-center space-x-2 mt-2">
            <font-awesome-icon :icon="['fas', 'calendar-days']" style="color: #246deb; height: 20px" />
            <span class="text-slate-600">
                {{ $moment(capacitacion.broadcast_date).format("LLL") }}
            </span>
          </div>
        </v-col>
      </v-row>

      <v-row> </v-row>
    </v-col>
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
};
</script>

<style>
</style>