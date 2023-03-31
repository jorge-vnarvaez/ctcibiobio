<template>
  <div class="col-span-12">
    <v-card
      class="d-flex flex-column px-8 py-8"
      style="height: 100%"
    >
      <span class="text-h5 block">¿Qué opina la comunidad?</span>

      <span class="block mb-2 text-slate-400 text-caption-1">Revisa lo que opinan los diferentes segmentos de la comunidad agrupados ya sea por provincia o género</span>

      <v-chip-group mandatory active-class="bg-violet-900 white--text">
        <v-chip
          v-for="option in options"
          :key="'option_' + option.id"
          class="cursor-pointer"
          label
          @click="activeOption = option.id"
          >{{ option.label }}</v-chip
        >
      </v-chip-group>

      <div class="flex space-x-6 w-80">
        <v-select
          :disabled="activeOption !== 1"
          v-model="activeProvince"
          :items="provinces"
          :item-text="provinces => provinces.label"
          :item-value="provinces => provinces.key"
          menu-props="auto"
          hide-details
          prepend-icon="mdi-map"
          single-line
          class="w-40"
        ></v-select>

        <v-select
          :disabled="activeOption !== 2"
          v-model="activeGenre"
          :items="genres"
          :item-text="genres => genres.label"
          :item-value="genres => genres.key"
          menu-props="auto"
          hide-details
          prepend-icon="mdi-gender-male-female"
          single-line
          class="w-40"
        ></v-select>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { id: 1, label: "Provincia" },
        { id: 2, label: "Género" },
      ],
      provinces: [
        { id: 1, label: 'Arauco', key: 'arauco' },
        { id: 2, label: 'Biobío', key: 'biobío' },
        { id: 3, label: 'Concepción', key: 'concepción' },
      ],
      genres: [
        { id: 1, label: 'Masculino', key: 'masculino' },
        { id: 2, label: 'Femenino', key: 'femenino' },
        { id: 3, label: 'Prefiero no decirlo', key: 'prefiero-no-decirlo' },
        { id: 4, label: 'Otro', key: 'otro' },
      ],
      activeOption: 1,
      activeProvince: 'arauco',
      activeGenre: 'masculino',
    };
  },
};
</script>

<style></style>
